import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
import {doc, setDoc, collection, getDocs, query, where, getDoc, updateDoc} from "firebase/firestore";
import '../css/createEquipmentGroup.css';
import {onAuthStateChanged} from "firebase/auth";

function CreateEquipmentGroup() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(null);

    async function checkAuthState() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserID(user.uid);
                const ref = collection(firestore, "users");
                const q = query(ref, where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (!userName) {
                        setUserName(doc.data().fullname);
                    }
                });
            }
        })
    }

    useEffect(() => {
        checkAuthState();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        const equipmentGroup = doc(firestore, "equipmentGroups", name);
        const equipmentData = await getDoc(equipmentGroup);

        let data = {
            name: name, description: description, userCreated: userName, userID: userID,
        };

        if (equipmentData.exists()) {
            await updateDoc(equipmentGroup, data);
            alert("Existing equipment group data has been updated.");
        } else {
            await setDoc(equipmentGroup, data);
            alert("New equipment group data has been created.");
        }

        window.location.replace("/equipmentGroup");
    }

    return (
        <div id={"createEquipmentGroup-page"}>
            <div id={"createEquipmentGroup-header"}>
                <div id={"createEquipmentGroup-backButton"}>
                    <a href={"/equipmentGroup"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"createEquipmentGroup-createEquipmentGroupText"}>
                    <h3> Create Equipment Group </h3>
                </div>
            </div>
            <br></br>
            <form id="createEquipmentGroup-form" onSubmit={handleSave}>
                <div>
                    <div id={"createEquipmentGroup-inputBoxes"}>
                        <label id="createEquipmentGroup-Label">Name</label>
                        <br></br>
                        <input id="createEquipmentGroup-Input" type="text" onChange={(e) => {
                            setName(e.target.value)
                        }}></input>
                        <br></br>
                        <br></br>
                        <label id="createEquipmentGroup-Label">Description</label>
                        <br></br>
                        <input id="createEquipmentGroup-Input" type="text"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}></input>
                    </div>

                    <button id="createEquipmentGroup-createEquipmentGroupbutton" type="submit">Update</button>
                </div>
            </form>
        </div>
    );
}

export default CreateEquipmentGroup;