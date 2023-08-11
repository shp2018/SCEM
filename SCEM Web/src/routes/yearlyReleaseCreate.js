import React, { useEffect, useState } from "react";
import {firestore } from "../firebase";
import { doc, addDoc, collection, getDocs, query, where, getDoc, updateDoc } from "firebase/firestore";
import '../css/createYearly.css';

function YearlyReleaseCreate() {
    const [model, setModel] = useState("")
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [mCode, setMCode] = useState("");
    const [suffix, setSuffix] = useState("");
    const [capcity, setCapacity] = useState("");
    const [engine, setEngine] = useState("");
    const [document, setDocument] = useState("");
    const [warranty, setWarranty] = useState("");



    useEffect(() => {

    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        const yearlyRelease = collection(firestore, "yearlyRelease");

        let data = {
            name: name, model: model, year: year, modelCode: mCode, suffix: suffix, capacity:capcity, engine:engine,documentation:document,warranty:warranty

        };
            await addDoc(yearlyRelease, data);
            alert("New Yearly Release data has been created.");
        

        window.location.replace("/yearlyRelease");
    }

    return (
        <div id={"createYearly-page"}>
            <div id={"createYearly-header"}>
                <div id={"createYearly-backButton"}>
                    <a href={"/"}
                        className={"arrow left"}>
                    </a>
                </div>
                <div id={"createYearly-createYearlyText"}>
                    <h3> Create Yearly Release </h3>
                </div>
            </div>
            <br></br>
            <form id="createYearly-form" onSubmit={handleSave}>

                <label id="createYearly-label">Model</label>
                <select name="Model" id="createYearly-select" onChange={(e) => {
                                setModel(e.target.value)
                            }}>
                    <option value="">Select a Model</option>
                    <option value="Model 1">Model 1</option>
                    <option value="Model 2">Model 2</option>
                    <option value="Model 3">Model 3</option>

                </select>
                <div>

                        <label id="createYearly-Label">Name</label>
                        <input id="createYearly-Input" type="text" onChange={(e) => {
                            setName(e.target.value)
                        }}></input>



                        <label id="createYearly-Label">Year</label>
                        <input id="createYearly-Input" type="text"
                            onChange={(e) => {
                                setYear(e.target.value)
                            }}></input>
                        <label id="createYearly-Label">Model Code</label>
                        <input id="createYearly-Input" type="text"
                            onChange={(e) => {
                                setMCode(e.target.value)
                            }}></input>
                    <br></br>
                  
                        <label id="createYearly-Label">Suffix</label>
                        <input id="createYearly-Input" type="text"
                            onChange={(e) => {
                                setSuffix(e.target.value)
                            }}></input>
                        <label id="createYearly-Label">Capacity</label>
                        <input id="createYearly-Input" type="text"
                            onChange={(e) => {
                                setCapacity(e.target.value)
                            }}></input>
                        <label id="createYearly-Label">Engine</label>
                        <input id="createYearly-Input" type="text"
                            onChange={(e) => {
                                setEngine(e.target.value)
                            }}></input>
                    </div>
                    <div>
                    <label id="createYearly-Label">Avaliable colors</label>
                    <br></br>
                    <input type="checkbox" name = "white" value="White"></input>
                    <label for="white"> White</label><br></br>
                    <input type="checkbox" name = "red" value="Red"></input>
                    <label for="white"> Red</label><br></br>
                    <input type="checkbox" name = "blue" value="Blue"></input>
                    <label for="white"> Blue</label><br></br>
                    </div>

                    <div>
                    <label id="createYearly-Label">Documentation</label>
                    <br></br>
                    <input id="createYearly-Textbox" type="text"
                            onChange={(e) => {
                                setDocument(e.target.value)
                            }}></input>
                    </div>

                    <div>
                    <label id="createYearly-Label">Warranty Policy</label>
                    <br></br>
                    <input id="createYearly-Textbox" type="text"
                            onChange={(e) => {
                                setWarranty(e.target.value)
                            }}></input>
                    </div>
                    <div>
                    <label id="createYearly-Label">Picture</label>
                    <br></br>
                    <input type="file"
                            accept="image/png, image/jpeg"></input>
                    </div>

                    <div>
                        <button id="createYearly-createYearlybutton" type="submit">Update</button>
               
                </div>

            </form>
        </div>
    );
}

export default YearlyReleaseCreate;