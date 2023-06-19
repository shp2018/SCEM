import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
import {doc, setDoc, collection, getDocs, query, where, getDoc, updateDoc} from "firebase/firestore";
import '../css/createLocationGroup.css';
import {onAuthStateChanged} from "firebase/auth";

function CreateLocationGroup() {
    const [Name, setName] = useState("");
    const [Description, setD] = useState("");
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(null);


    async function checkAuthState() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserID(user.uid);
                setAuthState(true);
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

        // if (!authState) {
        //     alert("Please login first.");
        //     return;
        // }

        const locationGroup = doc(firestore, "location", Name);
        const locationData = await getDoc(locationGroup);

        let data = {
            name: Name,
            description: Description,
            userCreated: userName,
            userID: userID,
        };

        if (locationData.exists()) {
            await updateDoc(locationGroup, data);
            alert("existing location data has been updated");
        } else {
            await setDoc(locationGroup, data)
            alert("new location data has been created");
        }
    }

    return (<body>
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
                        <input id="createLocationGroup-Input" type="text" placeholder="name" onChange={(e) => {
                            setName(e.target.value)
                        }}></input><br></br>

                        <label id="createLocationGroup-Label">Description</label>
                        <input id="createLocationGroup-Input" type="text" placeholder="description"
                               onChange={(e) => {
                                   setD(e.target.value)
                               }}></input><br></br>

                    </div>

                    <button id="createLocationGroup-createLocationGroupbutton" type="submit">Update</button>
                </div>
            </form>
        </div>
        </body>)
}

export default CreateLocationGroup;