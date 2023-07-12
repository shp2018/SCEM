import React, {useState} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import "../css/equipmentType-create.css";
import {firestore} from "../firebase";

const EquipmentTypeCreate = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createEquipmentType = async e => {
        e.preventDefault();

        await addDoc(collection(firestore, "equipmentTypes"), {
            name: name,
            description: description,
        }).then(() => {
            alert("Equipment type added.");
            window.location.href = "/equipmentType";
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <div id={"equipmentTypeCreate-body"}>
            <div id={"equipmentTypeCreate-header"}>
                <div id={"equipmentTypeCreate-backButtonDiv"}>
                    <a href={"/equipmentType"} className={"arrow left"}></a>
                </div>
                <h3 id={"equipmentTypeCreate-titleText"}>Create Equipment Type</h3>
            </div>

            <form id={"equipmentTypeCreate-form"} onSubmit={createEquipmentType}>
                <div className={"equipmentTypeCreate-formInputDiv"}>
                    <label>Name</label>
                    <br></br>
                    <input type={"text"} className={"equipmentTypeCreate-formInput"} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={"equipmentTypeCreate-formInputDiv"}>
                    <label>Description</label>
                    <br></br>
                    <input type={"text"} className={"equipmentTypeCreate-formInput"} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className={"equipmentTypeCreate-formInputDiv"}>
                    <button type={"submit"} id={"equipmentTypeCreate-formSubmitButton"}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default EquipmentTypeCreate;