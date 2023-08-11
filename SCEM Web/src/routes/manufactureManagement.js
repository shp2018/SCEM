import React, {useEffect, useState} from 'react';
import '../css/manufactureManagement.css';
import {collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {firestore} from "../firebase";
import PageNumber from "../components/pageNumber";

const ManufactureManagement = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [name, setName] = useState("");
    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [editing, setEditing] = useState([]);
    const MAX_RESULTS = 6;

    const handleSearch = async e => {
        e.preventDefault();
        setSearchResults([]);
        let results = [];

        const ref = collection(firestore, "manufacture");
        let searchTerms = name.toLowerCase().split(" ");
        const searchQuery = query(ref, where("searchTerms", "array-contains-any", searchTerms));

        const querySnapshot = await getDocs(searchQuery);
        querySnapshot.forEach(doc => {
            results.push(doc);
        });

        setSearchResults(results);
    }

    const launchPageNumbers = () => {
        let pageNumbers = Math.ceil(searchResults.length / MAX_RESULTS);
        let res = [];
        for (let i = 0; i < pageNumbers; i++) {
            res.push(<PageNumber key={i} num={i + 1} handler={() => setCurrentPageNumber(i + 1)}/>);
        }
        setPageNumbers(res);
        setCurrentPageNumber(1);
        setEditing(Array(searchResults.length).fill(false));
    }

    useEffect(launchPageNumbers, [searchResults]);

    const decrementPageNumber = () => {
        if (currentPageNumber > 1) setCurrentPageNumber(currentPageNumber - 1);
    }

    const incrementPageNumber = () => {
        if (currentPageNumber < Math.ceil(searchResults.length / MAX_RESULTS)) setCurrentPageNumber(currentPageNumber + 1);
    }

    const handleEdit = idx => {
        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return true;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleSave = async (idx, id) => {
        // get value from editing table data value
        const mName = document.getElementById(`manufactureManagement-${id}mName`).innerText;
        const mEmail = document.getElementById(`manufactureManagement-${id}mEmail`).innerText;
        const mNumber = document.getElementById(`manufactureManagement-${id}mNumber`).innerText;
        const taxID = document.getElementById(`manufactureManagement-${id}taxID`).innerText;
        const model = document.getElementById(`manufactureManagement-${id}model`).innerText;

        // update database doc
        await updateDoc(doc(firestore, "manufacture", id), {
            mName, mEmail, mNumber, taxID, model
        });

        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return false;
            else return element;
        });
        setEditing(mutatedEditing);
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
                <button id={"manufactureManagement-createButton"} onClick={() => window.location.href = "/manufactureManagement/create"}>Create New
                    <img src={"/locationAdd.png"} id={"manufactureManagement-plusIcon"} alt={"Plus icon"}>
                    </img>
                </button>
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
                {searchResults.slice((currentPageNumber - 1) * MAX_RESULTS, currentPageNumber * MAX_RESULTS).map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"manufactureManagement-tableElement"}>{index + 1}</td>
                        <td className={"manufactureManagement-tableElement"} id={`manufactureManagement-${doc.id}mName`} contentEditable={editing[index]} suppressContentEditableWarning={true}>{doc.data().mName}</td>
                        <td className={"manufactureManagement-tableElement"} id={`manufactureManagement-${doc.id}mEmail`} contentEditable={editing[index]} suppressContentEditableWarning={true}>{doc.data().mEmail}</td>
                        <td className={"manufactureManagement-tableElement"} id={`manufactureManagement-${doc.id}mNumber`} contentEditable={editing[index]} suppressContentEditableWarning={true}>{doc.data().mNumber}</td>
                        <td className={"manufactureManagement-tableElement"} id={`manufactureManagement-${doc.id}taxID`} contentEditable={editing[index]} suppressContentEditableWarning={true}>{doc.data().taxID}</td>
                        <td className={"manufactureManagement-tableElement"} id={`manufactureManagement-${doc.id}model`} contentEditable={editing[index]} suppressContentEditableWarning={true}>{doc.data().model}</td>
                        <td className={"manufactureManagement-tableElement"}>
                            <div className={"manufactureManagement-tableButtons"}>
                                {!editing[index] ?
                                    <button onClick={() => handleEdit(index)} className={"manufactureManagement-editButton"}>Edit</button>
                                    : <button onClick={() => handleSave(index, doc.id)} className={"manufactureManagement-saveButton"}>Save</button>}
                                <p className={"manufactureManagement-divider"}>|</p>
                                <button className={"manufactureManagement-modelButton"}>Model</button>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <div id={"manufactureManagement-pageNavigation"}>
                <button onClick={decrementPageNumber} id={"manufactureManagement-prev"}>Prev</button>
                {pageNumbers}
                <button onClick={incrementPageNumber} id={"manufactureManagement-next"}>Next</button>
            </div>
        </div>
    );
}

export default ManufactureManagement;