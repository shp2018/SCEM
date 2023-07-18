import React, {useEffect, useState} from "react";
import '../css/marketplaceSearch.css';
import {collection, query, getDocs, where} from "firebase/firestore";
import {firestore} from "../firebase";

const MarketplaceSearch = () => {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("All");
    const [site, setSite] = useState("All");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
    const [allSites, setAllSites] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const getAllEquipmentTypes = async () => {
        const querySnapshot = await getDocs(collection(firestore, "equipmentTypes"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        })
        setAllEquipmentTypes(dataQueried);
    }

    const getAllSites = async () => {
        const querySnapshot = await getDocs(collection(firestore, "site location"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        })
        setAllSites(dataQueried);
    }

    useEffect(() => {
        getAllEquipmentTypes().then(() => {
        });
    }, []);

    useEffect(() => {
        getAllSites().then(() => {
        });
    }, []);

    const search = async e => {
        e.preventDefault();
        let results = [];
        let searchQuery;
        setSearchResults([]);
        const marketplaceRef = collection(firestore, "marketplace");
        let searchTerms = name.toLowerCase().split(" ");

        if (equipmentType === "All" && site === "All") {
            searchQuery = query(marketplaceRef,
                where("searchTerms", "array-contains-any", searchTerms),
                where("fromDate", ">=", fromDate));
        } else if (equipmentType === "All") {
            searchQuery = query(marketplaceRef,
                where("searchTerms", "array-contains-any", searchTerms),
                where("fromDate", ">=", fromDate),
                where("site", "==", site));
        } else if (site === "All") {
            searchQuery = query(marketplaceRef,
                where("searchTerms", "array-contains-any", searchTerms),
                where("fromDate", ">=", fromDate),
                where("equipmentType", "==", equipmentType));
        } else {
            searchQuery = query(marketplaceRef,
                where("searchTerms", "array-contains-any", searchTerms),
                where("fromDate", ">=", fromDate),
                where("site", "==", site),
                where("equipmentType", "==", equipmentType));
        }
        let querySnapshot = await getDocs(searchQuery);
        querySnapshot.forEach(doc => {
            results.push(doc);
        });

        // filter out toDate here since query can't do two inequalities with two diff fields
        if (toDate !== "") {
            results = results.filter(doc => new Date(doc.data().toDate) <= new Date(toDate));
        }
        setSearchResults(results);
    }

    return (<div id={"marketplaceSearch-page"}>
        <div id={"marketplaceSearch-header"}>
            <a href="/marketplace" id="marketplaceSearch-backButton" className="arrow left"></a>
            <h3 id={"marketplaceSearch-title"}> Search </h3>
        </div>

        <form onSubmit={search}>
            <div id={"marketplaceSearch-inputName"}>
                <label id={"marketplaceSearch-subtitles"}>Name</label>
                <br></br>
                <input type={"text"} className={"marketplaceSearch-input"} onChange={e => setName(e.target.value)}
                       defaultValue={""}/>
            </div>
            <div id={"marketplaceSearch-equipmentType"}>
                <label id={"marketplaceSearch-subtitles"}> Equipment Type </label>
                <br></br>
                <select className={"marketplaceSearch-input"} onChange={e => setEquipmentType(e.target.value)}>
                    <option value={"All"}>All</option>
                    {allEquipmentTypes.map((equipmentType, index) => <option value={equipmentType.data().name}
                                                                             key={index}>{equipmentType.data().name}</option>)}
                </select>
            </div>
            <div id={"marketplaceSearch-site"}>
                <label id={"marketplaceSearch-subtitles"}>Site</label>
                <br></br>
                <select className={"marketplaceSearch-input"} onChange={e => setSite(e.target.value)}>
                    <option value={"All"}>All</option>
                    {allSites.map((site, index) => <option value={site.data().siteName}
                                                                             key={index}>{site.data().siteName}</option>)}
                </select>
            </div>
            <div id={"marketplaceSearch-fromDateToDate"}>
                <div id={"marketplaceSearch-fromDate"}>
                    <label id={"marketplaceSearch-subtitles"}>From Date</label>
                    <br></br>
                    <input type={"date"} className={"marketplaceSearch-input"} id={"marketplaceSearch-fromDateInput"}
                           onChange={e => setFromDate(e.target.value)}/>
                </div>
                <div id={"marketplaceSearch-toDate"}>
                    <label id={"marketplaceSearch-subtitles"}>To Date</label>
                    <br></br>
                    <input type={"date"} className={"marketplaceSearch-input"} id={"marketplaceSearch-toDateInput"}
                           onChange={e => setToDate(e.target.value)}/>
                </div>
            </div>
            <div id={"marketplaceSearch-search"}>
                <button type={"submit"} id={"marketplaceSearch-searchButton"}>Search
                </button>
            </div>
        </form>
        <div id={"marketplaceSearch-searchResults"}>
            {searchResults.length > 0 ? searchResults.map((doc, index) =>
                <div id={"marketplace-marketplaceItem"}
                     key={index + 1}>
                    <div id={"marketplace-marketplaceItemTitle"}>
                        <a href={`/marketplace/${doc.id}`}
                           id={"marketplace-marketplaceItemLink"}>
                            {doc.data().name} </a>
                    </div>
                    <div id={"marketplace-marketplaceItemDescription"}>
                        {doc.data().description.length > 125 ? doc.data().description.substring(0, 125) + "..." : doc.data().description}
                    </div>
                    <div id={"marketplace-marketplaceItemUserCreated"}>
                        <a href={`/profile/${doc.data().userID}`}
                           id={"marketplace-marketplaceItemUserCreatedLink"}> {doc.data().userCreated} </a>
                    </div>
                    <div id={"marketplace-marketplaceItemDateAndTimeCreated"}>
                        {doc.data().dateCreated}
                        {" "}
                        {doc.data().timeCreated}
                    </div>
                    <div id={"marketplace-marketplaceItemImageDiv"}>
                        <img src={doc.data().images}
                             alt={"Marketplace Item"}
                             id={"marketplace-marketplaceItemImage"}></img>
                    </div>
                </div>) :
                <p>No data matches the search data.</p>}
        </div>
    </div>);
}

export default MarketplaceSearch;