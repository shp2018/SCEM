import React, {useState, useEffect} from 'react';
import '../css/createTracker.css';
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";

const CreateTracker = () => {
    const [type, setType] = useState("");
    const [site, setSite] = useState("");
    const [service, setService] = useState("");
    const [ID, setID] = useState("");
    const [APIKEY, setAPIKEY] = useState("");
    const [API_SECRET, setAPI_SECRET] = useState("");
    const [warrantyPolicy, setWarrantyPolicy] = useState("");

    const [allSites, setAllSites] = useState([]);
    const [allServices, setAllServices] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
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

        let lon;
        let lat;
        const siteQuerySnapshot = await getDocs(query(collection(firestore, "site location"), where("siteName", "==", site)))
        siteQuerySnapshot.forEach(doc => {
            lon = doc.data().lon;
            lat = doc.data().lat;
        });

        await addDoc(collection(firestore, `${type}s`), {
            site, service, ID, APIKEY, API_SECRET, warrantyPolicy, type, lon, lat
        }).then(() => alert("Added successfully."));
    }

    const getAllSites = async () => {
        let dataQueried = [];
        const querySnapshot = await getDocs(collection(firestore, "site location"));
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllSites(dataQueried);
    }

    useEffect(() => {
        getAllSites();
    }, []);

    const getAllServices = async () => {
        let dataQueried = [];
        const querySnapshot = await getDocs(collection(firestore, "service"));
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllServices(dataQueried);
    }

    useEffect(() => {
        getAllServices();
    }, []);

    return (
        <div id={"createTracker-page"}>
            <div id={"createTracker-header"}>
                <div id={"createTracker-backButtonDiv"}>
                    <a href={"/trackerManagement"} className={"arrow left"}></a>
                </div>
                <h3 id={"createTracker-titleText"}>Create Tracker/Sensors</h3>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>Type</label>
                    <br></br>
                    <select className={"createTracker-input"} onChange={e => setType(e.target.value)}>
                        <option>Select from below...</option>
                        <option value={"tracker"}>Tracker</option>
                        <option value={"sensor"}>Sensor</option>
                    </select>
                </div>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>Site</label>
                    <br></br>
                    <select className={"createTracker-input"} onChange={e => setSite(e.target.value)}>
                        <option>Select from below...</option>
                        {allSites.map(doc => <option key={doc.id} value={doc.data().siteName}>{doc.data().siteName}</option>)}
                    </select>
                </div>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>Service</label>
                    <br></br>
                    <select className={"createTracker-input"} onChange={e => setService(e.target.value)}>
                        <option>Select from below...</option>
                        {allServices.map(doc => <option key={doc.id} value={doc.data().name}>{doc.data().name}</option>)}
                    </select>
                </div>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>Tracker ID / Sensor ID</label>
                    <br></br>
                    <input className={"createTracker-input"} onChange={e => setID(e.target.value)}/>
                </div>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>API KEY</label>
                    <br></br>
                    <input className={"createTracker-input"} onChange={e => setAPIKEY(e.target.value)}/>
                </div>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>API SECRET</label>
                    <br></br>
                    <input className={"createTracker-input"} onChange={e => setAPI_SECRET(e.target.value)}/>
                </div>
                <div className={"createTracker-inputBox"}>
                    <label className={"createTracker-label"}>Warranty Policy</label>
                    <br></br>
                    <input className={"createTracker-input"} onChange={e => setWarrantyPolicy(e.target.value)}/>
                </div>
                <button type={"submit"} id={"createTracker-submitButton"}>Create</button>
            </form>
        </div>
    );
}

export default CreateTracker;