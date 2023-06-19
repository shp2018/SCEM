import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
import {doc, setDoc, collection, getDocs, query, where, getDoc, updateDoc} from "firebase/firestore";
import '../css/createLocationGroup.css';
import {onAuthStateChanged} from "firebase/auth";

function CreateLocationGroup() {
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

        const locationGroup = doc(firestore, "location", name);
        const locationData = await getDoc(locationGroup);

        let data = {
            name: name, description: description, userCreated: userName, userID: userID,
        };

        if (locationData.exists()) {
            await updateDoc(locationGroup, data);
            alert("Existing location data has been updated.");
        } else {
            await setDoc(locationGroup, data);
            alert("New location data has been created.");
        }

        window.location.replace("/locationGroup");
    }

    return (
        <div id={"createLocationGroup-page"}>
            <div id={"createLocationGroup-header"}>
                <div id={"createLocationGroup-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"createLocationGroup-createLocationGroupText"}>
                    <h3> Create Location Group </h3>
                </div>
            </div>
            <br></br>
            <form id="createLocationGroup-form" onSubmit={handleSave}>
                <div>
                    <div id={"createLocationGroup-inputBoxes"}>
                        <label id="createLocationGroup-Label">Name</label>
                        <input id="createLocationGroup-Input" type="text" onChange={(e) => {
                            setName(e.target.value)
                        }}></input><br></br>

                        <label id="createLocationGroup-Label">Description</label>
                        <input id="createLocationGroup-Input" type="text"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}></input><br></br>
                    </div>

                    <button id="createLocationGroup-createLocationGroupbutton" type="submit">Update</button>
                </div>
            </form>
        </div>
    );
}

export default CreateLocationGroup;