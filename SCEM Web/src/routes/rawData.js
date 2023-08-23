import React, {useEffect, useState} from 'react';
import '../css/rawData.css';
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";
import PageNumber from "../components/pageNumber";

const RawData = () => {
    const [type, setType] = useState("All");
    const [site, setSite] = useState("");
    const [service, setService] = useState("");
    const [ID, setID] = useState("");

    const [allSites, setAllSites] = useState([]);
    const [allServices, setAllServices] = useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const MAX_RESULTS = 6;

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
    }

    useEffect(launchPageNumbers, [searchResults]);

    const decrementPageNumber = () => {
        if (currentPageNumber > 1) setCurrentPageNumber(currentPageNumber - 1);
    }

    const incrementPageNumber = () => {
        if (currentPageNumber < Math.ceil(searchResults.length / MAX_RESULTS)) setCurrentPageNumber(currentPageNumber + 1);
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

    return (
        <>
            {loaded ?
                <div id={"rawData-page"}>
                    <div id={"rawData-header"}>
                        <div id={"rawData-backButtonDiv"}>
                            <a href={"/"} className={"arrow left"}></a>
                        </div>
                        <h3 id={"rawData-titleText"}>Raw Data</h3>
                    </div>
                    <form id={"rawData-form"} onSubmit={handleSearch}>
                        <div id={"rawData-inputDivsUpper"}>
                            <div id={"rawData-inputDivType"}>
                                <label className={"rawData-formLabel"}>Type</label>
                                <br></br>
                                <select className={"rawData-input"} onChange={e => setType(e.target.value)}>
                                    <option value={"All"}>All</option>
                                    <option value={"Tracker"}>Tracker</option>
                                    <option value={"Sensor"}>Sensor</option>
                                </select>
                            </div>
                            <div id={"rawData-inputDivSite"}>
                                <label className={"rawData-formLabel"}>Site</label>
                                <br></br>
                                <select className={"rawData-input"} onChange={e => setSite(e.target.value)}>
                                    <option>Select from below...</option>
                                    {allSites.map(doc => <option key={doc.id}
                                                                 value={doc.data().siteName}>{doc.data().siteName}</option>)}
                                </select>
                            </div>
                        </div>
                        <div id={"rawData-inputDivsLower"}>
                            <div id={"rawData-inputDivService"}>
                                <label className={"rawData-formLabel"}>Service</label>
                                <br></br>
                                <select className={"rawData-input"} onChange={e => setService(e.target.value)}>
                                    <option>Select from below...</option>
                                    {allServices.map(doc => <option key={doc.id}
                                                                    value={doc.data().name}>{doc.data().name}</option>)}
                                </select>
                            </div>
                            <div id={"rawData-inputDivID"}>
                                <label className={"rawData-formLabel"}>ID</label>
                                <br></br>
                                <input className={"rawData-input"} onChange={e => setID(e.target.value)}/>
                            </div>
                        </div>
                        <button id={"rawData-searchButton"} type={"submit"}>Search</button>
                    </form>
                    <table id={"rawData-table"} className={"rawData-tableElement"}>
                        <tbody>
                        <tr>
                            <th className={"rawData-tableHeading"}></th>
                            <th className={"rawData-tableHeading"}>Type</th>
                            <th className={"rawData-tableHeading"}>Site</th>
                            <th className={"rawData-tableHeading"}>Lat</th>
                            <th className={"rawData-tableHeading"}>Lon</th>
                            <th className={"rawData-tableHeading"}>ID</th>
                        </tr>
                        {searchResults.slice((currentPageNumber - 1) * MAX_RESULTS, currentPageNumber * MAX_RESULTS).map((doc, index) =>
                            <tr key={doc.id}>
                                <td className={"rawData-tableElement"}>{index + 1}</td>
                                <td className={"rawData-tableElement"}>{doc.data().type}</td>
                                <td className={"rawData-tableElement"}>{doc.data().site}</td>
                                <td className={"rawData-tableElement"}>{doc.data().lat}</td>
                                <td className={"rawData-tableElement"}>{doc.data().lon}</td>
                                <td className={"rawData-tableElement"}>{doc.data().ID}</td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div id={"rawData-pageNavigation"}>
                        <button onClick={decrementPageNumber} id={"rawData-prev"}>Prev</button>
                        {pageNumbers}
                        <button onClick={incrementPageNumber} id={"rawData-next"}>Next</button>
                    </div>
                </div>
                : <p id={"rawData-loading"}>Loading...</p>}
        </>
    );
}

export default RawData;