import "../css/toolEquipmentCount.css";
import React, {useEffect, useState} from 'react';
import {firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

const ToolEquipmentCount = () => {
    const [equipmentType, setEquipmentType] = useState("All");
    const [site, setSite] = useState("All");
    const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
    const [allSites, setAllSites] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const getAllEquipmentTypes = async () => {
        const querySnapshot = await getDocs(collection(firestore, "equipmentTypes"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllEquipmentTypes(dataQueried);
    }

    const getAllSites = async () => {
        const querySnapshot = await getDocs(collection(firestore, "site location"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllSites(dataQueried);
    }

    useEffect(() => {
        getAllEquipmentTypes();
    }, []);

    useEffect(() => {
        getAllSites();
    }, []);

    const getEquipmentQueried = async e => {
        e.preventDefault();

        const marketplaceRef = collection(firestore, "marketplace");
        let results = []
        let searchQuery;
        setSearchResults([]);

        if (equipmentType === "All" && site === "All") {
            searchQuery = query(marketplaceRef);
        } else if (equipmentType === "All") {
            searchQuery = query(marketplaceRef,
                where("site", "==", site));
        } else if (site === "All") {
            searchQuery = query(marketplaceRef,
                where("equipmentType", "==", equipmentType));
        } else {
            searchQuery = query(marketplaceRef,
                where("equipmentType", "==", equipmentType),
                where("site", "==", site));
        }

        let querySnapshot = await getDocs(searchQuery);
        querySnapshot.forEach(doc => {
            results.push(doc);
        });
        setSearchResults(results);
    }

    const redirectToEquipmentPage = doc => {
        window.location.href = `/marketplace/${doc._key.path.lastSegment()}`;
    }

    return (
        <div id={"toolEquipmentCount-page"}>
            <div id={"toolEquipmentCount-header"}>
                <div id={"toolEquipmentCount-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={"toolEquipmentCount-titleText"}>Equipment Count</h3>
            </div>
            <form id={"toolEquipmentCount-form"} onSubmit={getEquipmentQueried}>
                <div className={"toolEquipmentCount-formDivs"}>
                    <label className={"toolEquipmentCount-labels"}>Equipment type</label>
                    <br></br>
                    <select className={"toolEquipmentCount-inputs"} onChange={e => setEquipmentType(e.target.value)}>
                        <option value={"All"}>All</option>
                        {allEquipmentTypes.map(doc =>
                            <option value={doc.data().name} key={doc.id}>{doc.data().name}</option>)}
                    </select>
                </div>
                <div className={"toolEquipmentCount-formDivs"}>
                    <label className={"toolEquipmentCount-labels"}>Site</label>
                    <br></br>
                    <select className={"toolEquipmentCount-inputs"} onChange={e => setSite(e.target.value)}>
                        <option value={"All"}>All</option>
                        {allSites.map(doc =>
                            <option value={doc.data().siteName} key={doc.id}>{doc.data().siteName}</option>)}
                    </select>
                </div>
                <div className={"toolEquipmentCount-formDivs"}>
                    <label className={"toolEquipmentCount-labels"}>Total</label>
                    <div id={"toolEquipmentCount-results"}><p
                        id={"toolEquipmentCount-resultsCount"}>{searchResults.length}</p></div>
                </div>
                <button id={"toolEquipmentCount-button"} type={"submit"}>Count</button>
            </form>
            {searchResults.length > 0 ?
                <table id={"toolEquipmentCount-table"} className={"toolEquipmentCount-tableElement"}>
                    <tbody>
                    <tr>
                        <th className={"toolEquipmentCount-tableHeading"}>#</th>
                        <th className={"toolEquipmentCount-tableHeading"}>Name</th>
                        <th className={"toolEquipmentCount-tableHeading"}>Equipment Type</th>
                        <th className={"toolEquipmentCount-tableHeading"}>Site</th>
                        <th className={"toolEquipmentCount-tableHeading"}></th>
                    </tr>
                    {searchResults.map((doc, index) =>
                        <tr key={doc.id}>
                            <td className={"toolEquipmentCount-tableElement"}>{index + 1}</td>
                            <td className={"toolEquipmentCount-tableElement"}>{doc.data().name}</td>
                            <td className={"toolEquipmentCount-tableElement"}>{doc.data().equipmentType}</td>
                            <td className={"toolEquipmentCount-tableElement"}>{doc.data().site}</td>
                            <td className={"toolEquipmentCount-tableElement"}>
                                <button id={"toolEquipmentCount-tableArrowButton"}
                                        onClick={() => redirectToEquipmentPage(doc)}>
                                    <img src={"/triangle-right.svg"}
                                         alt={"Right arrow used to redirect to equipment page."}
                                         id={"equipmentType-tableArrow"}/>
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table> :
                <p>No data matches the search query.</p>}

        </div>
    );
}

export default ToolEquipmentCount;