import React, { useState, useEffect } from 'react';
import '../css/createModel.css';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const CreateModel = () => {
    const [modName, setModName] = useState("");
    const [modEquipmentType, setModEquipmentType] = useState("");
    const [modModel, setModModel] = useState("");
    const [modDescription, setModDescription] = useState("");
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const fetchManufacturers = async () => {
            const manufacturersCollection = collection(firestore, "manufacture");
            const manufacturersSnapshot = await getDocs(manufacturersCollection);
            const manufacturerNames = manufacturersSnapshot.docs.map(doc => doc.data().mName);
            setManufacturers(manufacturerNames);
        };

        fetchManufacturers();
    }, []);


    const [equipmentTypes, setEquipmentTypes] = useState([]);

    useEffect(() => {
        // Fetch equipment types from Firestore and update state
        const fetchEquipmentTypes = async () => {
            const equipmentTypesCollection = collection(firestore, "equipmentTypes");
            const equipmentTypesSnapshot = await getDocs(equipmentTypesCollection);
            const equipmentTypeNames = equipmentTypesSnapshot.docs.map(doc => doc.data().name);
            setEquipmentTypes(equipmentTypeNames);
        };

        fetchEquipmentTypes();
    }, []);


    const handleFormSubmit = async e => {
        e.preventDefault();

        let searchTerms = modModel.toLowerCase().split(" ");
        searchTerms.push("");

        await addDoc(collection(firestore, "model"), {
            modName, modEquipmentType, modModel, modDescription, searchTerms
        }).then(() => {
            alert("New model added.");
        });
    }

    return (
        <div id={"createModel-page"}>
            <div id={"createModel-header"}>
                <div id={"createModel-backButtonDiv"}>
                    <a href={"/modelManagement"} className={"arrow left"}></a>
                </div>
                <h3 id={"createModel-titleText"}>Manufacture model</h3>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={"createModel-inputBox"}>
                    <label>Manufacture name</label>
                    <br />
                    <select className={"createModel-input"} onChange={e => setModName(e.target.value)}>
                        <option value="" disabled selected>Select a manufacturer</option>
                        {manufacturers.map((manufacturer, index) => (
                            <option key={index} value={manufacturer}>{manufacturer}</option>
                        ))}
                    </select>
                </div>
                <div className={"createModel-inputBox"}>
                <label>Equipment type</label>
                <br />
                <select className={"createModel-input"} onChange={e => setModEquipmentType(e.target.value)}>
                    <option value="" disabled selected>Select an equipment type</option>
                    {equipmentTypes.map((equipmentType, index) => (
                        <option key={index} value={equipmentType}>{equipmentType}</option>
                    ))}
                </select>
            </div>
                <div className={"createModel-inputBox"}>
                    <label>Model</label>
                    <br />
                    <input className={"createModel-input"} onChange={e => setModModel(e.target.value)} />
                </div>
                <div className={"createModel-inputBox"}>
                    <label>Description</label>
                    <br />
                    <input className={"createModel-input"} onChange={e => setModDescription(e.target.value)} />
                </div>
                <button type={"submit"} id={"createModel-submitButton"}>Create</button>
            </form>
        </div>
    );
}

export default CreateModel;
