import React, {useState} from 'react';
import '../css/createManufacture.css';
import {addDoc, collection} from "firebase/firestore";
import {firestore} from "../firebase";

const CreateManufacture = () => {
    const [mName, setMName] = useState("");
    const [mEmail, setMEmail] = useState("");
    const [mNumber, setMNumber] = useState("");
    const [mOwner, setMOwner] = useState("");
    const [tEmail, setTEmail] = useState("");
    const [tPhone, setTPhone] = useState("");
    const [tName, setTName] = useState("");
    const [taxID, setTaxID] = useState("");
    const [mStandards, setMStandards] = useState("");
    const [mSites, setMSites] = useState("");

    const handleFormSubmit = async e => {
        e.preventDefault();

        let searchTerms = mName.toLowerCase().split(" ");
        searchTerms.push("");

        await addDoc(collection(firestore, "manufacture"), {
            mName, mEmail, mNumber, mOwner, tEmail, tPhone, tName, taxID, mStandards, mSites, searchTerms
        }).then(() => {
            alert("New manufacture added.");
        });
    }

    return (
        <div id={"createManufacture-page"}>
            <div id={"createManufacture-header"}>
                <div id={"createManufacture-backButtonDiv"}>
                    <a href={"/manufactureManagement"} className={"arrow left"}></a>
                </div>
                <h3 id={"createManufacture-titleText"}>New Manufacture</h3>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={"createManufacture-inputBox"}>
                    <label>Manufacture name</label>
                    <br></br>
                    <input className={"createManufacture-input"} onChange={e => setMName(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Manufacture email</label>
                    <br></br>
                    <input className={"createManufacture-input"} type={"email"} onChange={e => setMEmail(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Manufacture phone number</label>
                    <br></br>
                    <input className={"createManufacture-input"} type={"number"} onChange={e => setMNumber(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Manufacture owner</label>
                    <br></br>
                    <input className={"createManufacture-input"} onChange={e => setMOwner(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Technical support email</label>
                    <br></br>
                    <input className={"createManufacture-input"} type={"email"} onChange={e => setTEmail(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Technical support phone</label>
                    <br></br>
                    <input className={"createManufacture-input"} type={"number"} onChange={e => setTPhone(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Technical person name</label>
                    <br></br>
                    <input className={"createManufacture-input"} onChange={e => setTName(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Tax ID</label>
                    <br></br>
                    <input className={"createManufacture-input"} onChange={e => setTaxID(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Manufacturing standards</label>
                    <br></br>
                    <input className={"createManufacture-input"} onChange={e => setMStandards(e.target.value)}/>
                </div>
                <div className={"createManufacture-inputBox"}>
                    <label>Manufacturing sites</label>
                    <br></br>
                    <input className={"createManufacture-input"} onChange={e => setMSites(e.target.value)}/>
                </div>
                <button type={"submit"} id={"createManufacture-submitButton"}>Update</button>
            </form>
        </div>
    );
}

export default CreateManufacture;