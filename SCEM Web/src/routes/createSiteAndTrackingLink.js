import React, {useEffect, useState} from 'react';
import "../css/createSiteAndTrackingLink.css";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {firestore} from "../firebase";

const CreateSiteAndTrackingLink = () => {
    const [equipmentType, setEquipmentType] = useState(null);
    const [site, setSite] = useState(null);
    const [tracker, setTracker] = useState(null);
    const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
    const [allSites, setAllSites] = useState([]);
    const [allTrackers, setAllTrackers] = useState([]);

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

    const getAllTrackers = async () => {
        const querySnapshot = await getDocs(collection(firestore, "trackers"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllTrackers(dataQueried);
    }

    useEffect(() => {
        getAllEquipmentTypes();
    }, []);

    useEffect(() => {
        getAllSites();
    }, []);

    useEffect(() => {
        getAllTrackers();
    }, []);

    const handleCreateAndSendDocument = async e => {
        e.preventDefault();

        if (!equipmentType || !site || !tracker) {
            alert("One of the parameters isn't selected. Please try again after doing so.");
            return;
        }

        await addDoc(collection(firestore, "siteAndTrackingLink"), {
            equipmentType: equipmentType,
            site: site,
            tracker: tracker,
        }).then(() => {
            alert("Success!");
            window.location.href = "/siteAndTrackingLink";
        })
    }

    return (
        <div id={"createSiteAndTrackingLink-page"}>
            <div id={"createSiteAndTrackingLink-header"}>
                <div id={"createSiteAndTrackingLink-backButtonDiv"}>
                    <a href={"/siteAndTrackingLink"} className={"arrow left"}></a>
                </div>
                <h3 id={"createSiteAndTrackingLink-titleText"}>Create Site and Tracking link</h3>
            </div>
            <form id={"createSiteAndTrackingLink-form"} onSubmit={handleCreateAndSendDocument}>
                <div className={"createSiteAndTrackingLink-formDivs"}>
                    <label className={"createSiteAndTrackingLink-labels"}>Equipment type</label>
                    <br></br>
                    <select className={"createSiteAndTrackingLink-inputs"} onChange={e => setEquipmentType(e.target.value)}>
                        <option value={null}>Please select from below...</option>
                        {allEquipmentTypes.map(doc =>
                            <option key={doc.id} value={doc.data().name}>{doc.data().name}</option>)}
                    </select>
                </div>
                <div className={"createSiteAndTrackingLink-formDivs"}>
                    <label className={"createSiteAndTrackingLink-labels"}>Site</label>
                    <br></br>
                    <select className={"createSiteAndTrackingLink-inputs"} onChange={e => setSite(e.target.value)}>
                        <option value={null}>Please select from below...</option>
                        {allSites.map(doc =>
                            <option key={doc.id} value={doc.data().siteName}>{doc.data().siteName}</option>)}
                    </select>
                </div>
                <div className={"createSiteAndTrackingLink-formDivs"}>
                    <label className={"createSiteAndTrackingLink-labels"}>Tracker</label>
                    <br></br>
                    <select className={"createSiteAndTrackingLink-inputs"} onChange={e => setTracker(e.target.value)}>
                        <option value={null}>Please select from below...</option>
                        {allTrackers.map(doc =>
                            <option key={doc.id} value={doc.data().name}>{doc.data().name}</option>)}
                    </select>
                </div>
                <button type={"submit"} id={"createSiteAndTrackingLink-button"}>Create</button>
            </form>
        </div>
    );
}

export default CreateSiteAndTrackingLink;