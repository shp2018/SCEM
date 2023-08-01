import React, {useState, useEffect} from 'react';
import '../css/manufactureManagement.css';
import {collection, query, where, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";

const ManufactureManagement = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [name, setName] = useState("");

    const handleSearch = async e => {
        e.preventDefault();
        setSearchResults([]);
        let results = [];

        const ref = collection(firestore, "manufacture");
        const searchTerms = name.toLowerCase().split(" ");
        const searchQuery = query(ref, where("searchTerms", "array-contains-any", searchTerms));

        const querySnapshot = await getDocs(searchQuery);
        querySnapshot.forEach(doc => {
            results.push(doc);
        });

        setSearchResults(results);
    }

    const redirectToCreate = () => {
        window.location.href = "/manufactureManagement/create"
    }

    return (
        <div id={"manufactureManagement-page"}>
            <div id={"manufactureManagement-header"}>
                <div id={"manufactureManagement-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={'manufactureManagement-titleText'}>Manufacture Management</h3>
            </div>
            <form id={"manufactureManagement-form"} onSubmit={handleSearch}>
                <label id={"manufactureManagement-formName"}>Name</label>
                <br></br>
                <input id={"manufactureManagement-searchInput"} onChange={(e) => setName(e.target.value)}/>
                <br></br>
                <button id={"manufactureManagement-searchButton"} type={"submit"}>Search</button>
            </form>
            <div id={"manufactureManagement-createButtonDiv"}>
                <button id={"manufactureManagement-createButton"} onClick={redirectToCreate}>Create New
                </button>
                <img src={"/locationAdd.png"} id={"manufactureManagement-plusIcon"} alt={"Plus icon"}>
                </img>
            </div>
            <table id={"manufactureManagement-table"} className={"manufactureManagement-tableElement"}>
                <tbody>
                <tr>
                    <th className={"manufactureManagement-tableHeading"}>#</th>
                    <th className={"manufactureManagement-tableHeading"}>Name</th>
                    <th className={"manufactureManagement-tableHeading"}>Email</th>
                    <th className={"manufactureManagement-tableHeading"}>Phone</th>
                    <th className={"manufactureManagement-tableHeading"}>Tax ID</th>
                    <th className={"manufactureManagement-tableHeading"}>Model</th>
                    <th className={"manufactureManagement-tableHeading"}></th>
                </tr>
                {searchResults.map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"manufactureManagement-tableElement"}>{index + 1}</td>
                        <td className={"manufactureManagement-tableElement"}>{doc.data().name}</td>
                        <td className={"manufactureManagement-tableElement"}>{doc.data().email}</td>
                        <td className={"manufactureManagement-tableElement"}>{doc.data().phone}</td>
                        <td className={"manufactureManagement-tableElement"}>{doc.data().taxID}</td>
                        <td className={"manufactureManagement-tableElement"}>{doc.data().model}</td>
                        <td className={"manufactureManagement-tableElement"}></td>
                    </tr>)}
                </tbody>
            </table>
            <div id={"manufactureManagement-pageNavigation"}>
                <button onClick={() => null}>Prev</button>
                <button onClick={() => null}>Next</button>
            </div>
        </div>
    );
}

export default ManufactureManagement;