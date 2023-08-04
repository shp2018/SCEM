import React, {useEffect, useState} from 'react';
import '../css/trackerManagement.css';
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {firestore} from "../firebase";
import PageNumber from "../components/pageNumber";

const TrackerManagement = () => {
    const [type, setType] = useState("All");
    const [site, setSite] = useState("");
    const [service, setService] = useState("");
    const [ID, setID] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [editing, setEditing] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const MAX_RESULTS = 6;

    const [allSites, setAllSites] = useState([]);
    const [allServices, setAllServices] = useState([]);

    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);

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

    const handleSearch = async e => {
        e.preventDefault();
        let ref;
        let results = [];
        let searchQuery;
        setSearchResults([]);

        if (type === "All") {
            ref = collection(firestore, "trackers");
            if (ID === "") {
                searchQuery = query(ref,
                    where("site", "==", site),
                    where("service", "==", service)
                );
            } else {
                searchQuery = query(ref,
                    where("ID", "==", ID),
                    where("site", "==", site),
                    where("service", "==", service)
                );
            }

            let querySnapshot = await getDocs(searchQuery);
            querySnapshot.forEach(doc => {
                results.push(doc);
            });

            ref = collection(firestore, "sensors");
            if (ID === "") {
                searchQuery = query(ref,
                    where("site", "==", site),
                    where("service", "==", service)
                );
            } else {
                searchQuery = query(ref,
                    where("ID", "==", ID),
                    where("site", "==", site),
                    where("service", "==", service)
                );
            }
            querySnapshot = await getDocs(searchQuery);
            querySnapshot.forEach(doc => {
                results.push(doc);
            });
        } else if (type === "Tracker") {
            ref = collection(firestore, "trackers");
            if (ID === "") {
                searchQuery = query(ref,
                    where("site", "==", site),
                    where("service", "==", service),
                    where("type", "==", "tracker")
                );
            } else {
                searchQuery = query(ref,
                    where("ID", "==", ID),
                    where("site", "==", site),
                    where("service", "==", service),
                    where("type", "==", "tracker")
                );
            }
            const querySnapshot = await getDocs(searchQuery);
            querySnapshot.forEach(doc => {
                results.push(doc);
            });

        } else if (type === "Sensor") {
            ref = collection(firestore, "sensors");
            if (ID === "") {
                searchQuery = query(ref,
                    where("site", "==", site),
                    where("service", "==", service),
                    where("type", "==", "sensor")
                );
            } else {
                searchQuery = query(ref,
                    where("ID", "==", ID),
                    where("site", "==", site),
                    where("service", "==", service),
                    where("type", "==", "sensor")
                );
            }
            const querySnapshot = await getDocs(searchQuery);
            querySnapshot.forEach(doc => {
                results.push(doc);
            });
        }
        setSearchResults(results);
    }

    const getAllSites = async () => {
        const querySnapshot = await getDocs(collection(firestore, "site location"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllSites(dataQueried);
    }

    const getAllServices = async () => {
        const querySnapshot = await getDocs(collection(firestore, "service"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllServices(dataQueried);
    }

    useEffect(() => {
        getAllSites().then(() => {
            getAllServices().then(() => {
                setLoaded(true);
            });
        });
    }, []);

    // useEffect(() => {
    //     getAllServices();
    // }, []);

    const handleEdit = idx => {
        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return true;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleSave = async (idx, id) => {
        // get value from editing table data value
        const service = document.getElementById(`trackerManagement-${id}service`).innerText;
        const type = document.getElementById(`trackerManagement-${id}type`).innerText;
        const site = document.getElementById(`trackerManagement-${id}site`).innerText;
        const ID = document.getElementById(`trackerManagement-${id}ID`).innerText;
        const APIKEY = document.getElementById(`trackerManagement-${id}APIKEY`).innerText;

        let duplicate = false;

        let querySnapshot = await getDocs(collection(firestore, "trackers"));
        querySnapshot.forEach(doc => {
            let docID = doc.data().ID;
            if (ID === docID) {
                alert("ID already exists, please check again.");
                duplicate = true;
            }
        });

        if (duplicate) return;

        querySnapshot = await getDocs(collection(firestore, "sensors"));
        querySnapshot.forEach(doc => {
            let docID = doc.data().ID;
            if (ID === docID) {
                alert("ID already exists, please check again.");
                duplicate = true;
            }
        });

        if (duplicate) return;

        // update database doc
        await updateDoc(doc(firestore, `${type}s`, id), {
            service, type, site, ID, APIKEY
        });

        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return false;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    return (
        <>
            {loaded ? <div id={"trackerManagement-page"}>
                <div id={"trackerManagement-header"}>
                    <div id={"trackerManagement-backButtonDiv"}>
                        <a href={"/"} className={"arrow left"}></a>
                    </div>
                    <h3 id={"trackerManagement-titleText"}>Tracker Management</h3>
                </div>
                <form id={"trackerManagement-form"} onSubmit={handleSearch}>
                    <div id={"trackerManagement-inputDivs"}>
                        <div id={"trackerManagement-inputDivType"}>
                            <label className={"trackerManagement-formLabel"}>Type</label>
                            <br></br>
                            <select className={"trackerManagement-input"} onChange={e => setType(e.target.value)}>
                                <option value={"All"}>All</option>
                                <option value={"Tracker"}>Tracker</option>
                                <option value={"Sensor"}>Sensor</option>
                            </select>
                        </div>
                        <div id={"trackerManagement-inputDivSite"}>
                            <label className={"trackerManagement-formLabel"}>Site</label>
                            <br></br>
                            <select className={"trackerManagement-input"} onChange={e => setSite(e.target.value)}>
                                {allSites.map(doc => <option key={doc.id}
                                                             value={doc.data().siteName}>{doc.data().siteName}</option>)}
                            </select>
                        </div>
                        <div id={"trackerManagement-inputDivService"}>
                            <label className={"trackerManagement-formLabel"}>Service</label>
                            <br></br>
                            <select className={"trackerManagement-input"} onChange={e => setService(e.target.value)}>
                                {allServices.map(doc => <option key={doc.id}
                                                                value={doc.data().name}>{doc.data().name}</option>)}
                            </select>
                        </div>
                        <div id={"trackerManagement-inputDivID"}>
                            <label className={"trackerManagement-formLabel"}>ID</label>
                            <br></br>
                            <input id={"trackerManagement-inputID"} onChange={e => setID(e.target.value)}/>
                        </div>
                    </div>
                    <button id={"trackerManagement-searchButton"} type={"submit"}>Search</button>
                </form>
                <div id={"trackerManagement-createButtonDiv"}>
                    <button id={"trackerManagement-createButton"}
                            onClick={() => window.location.href = "/trackerManagement/create"}>Create New
                        <img src={"/locationAdd.png"} id={"trackerManagement-plusIcon"} alt={"Plus icon"}>
                        </img>
                    </button>
                </div>
                <table id={"trackerManagement-table"} className={"trackerManagement-tableElement"}>
                    <tbody>
                    <tr>
                        <th className={"trackerManagement-tableHeading"}>#</th>
                        <th className={"trackerManagement-tableHeading"}>Service</th>
                        <th className={"trackerManagement-tableHeading"}>Type</th>
                        <th className={"trackerManagement-tableHeading"}>Site</th>
                        <th className={"trackerManagement-tableHeading"}>ID</th>
                        <th className={"trackerManagement-tableHeading"}>API KEY</th>
                        <th className={"trackerManagement-tableHeading"}></th>
                    </tr>
                    {searchResults.slice((currentPageNumber - 1) * MAX_RESULTS, currentPageNumber * MAX_RESULTS).map((doc, index) =>
                        <tr key={doc.id}>
                            <td className={"trackerManagement-tableElement"}>{index + 1}</td>
                            <td className={"trackerManagement-tableElement"} id={`trackerManagement-${doc.id}service`}
                                contentEditable={editing[index]}
                                suppressContentEditableWarning={true}>{doc.data().service}</td>
                            <td className={"trackerManagement-tableElement"} id={`trackerManagement-${doc.id}type`}
                                contentEditable={editing[index]}
                                suppressContentEditableWarning={true}>{doc.data().type}</td>
                            <td className={"trackerManagement-tableElement"} id={`trackerManagement-${doc.id}site`}
                                contentEditable={editing[index]}
                                suppressContentEditableWarning={true}>{doc.data().site}</td>
                            <td className={"trackerManagement-tableElement"} id={`trackerManagement-${doc.id}ID`}
                                contentEditable={editing[index]}
                                suppressContentEditableWarning={true}>{doc.data().ID}</td>
                            <td className={"trackerManagement-tableElement"} id={`trackerManagement-${doc.id}APIKEY`}
                                contentEditable={editing[index]}
                                suppressContentEditableWarning={true}>{doc.data().APIKEY}</td>
                            <td className={"trackerManagement-tableElement"}>
                                <div className={"trackerManagement-tableButtons"}>
                                    {!editing[index] ?
                                        <button onClick={() => handleEdit(index)}
                                                className={"trackerManagement-editButton"}>Edit</button>
                                        : <button onClick={() => handleSave(index, doc.id)}
                                                  className={"trackerManagement-saveButton"}>Save</button>}
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <div id={"trackerManagement-pageNavigation"}>
                    <button onClick={decrementPageNumber} id={"trackerManagement-prev"}>Prev</button>
                    {pageNumbers}
                    <button onClick={incrementPageNumber} id={"trackerManagement-next"}>Next</button>
                </div>
            </div> : <p id={"trackerManagement-loading"}>Loading...</p>}
        </>
    );
}

export default TrackerManagement;