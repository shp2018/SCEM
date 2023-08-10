import React, {useState, useEffect} from 'react';
import '../css/userManagement.css';
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where, doc, getDoc, updateDoc} from "firebase/firestore";

const UserManagement = () => {
    const [userID, setUserID] = useState(null);
    const [usersPath, setUsersPath] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const companyRef = collection(firestore, "company");
    const [editing, setEditing] = useState([]);

    const getUserID = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) setUserID(user.uid);
        })
    }

    const getUsersPaths = async () => {
        const companyQuery = query(companyRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(companyQuery);
        await setUsersPath([]);

        querySnapshot.forEach(doc => {
            const usersArray = doc.data().users;
            usersArray.forEach(res => {
                setUsersPath(curr => [...curr,
                    res._key.path.lastSegment()]);
            });
        });
    }

    const getUsersData = async () => {
        setUsersData([]);
        let dataQueried = [];
        for (const res of usersPath) {
            const docRef = doc(firestore, "users", res);
            const docSnap = await getDoc(docRef);
            dataQueried.push(docSnap);
        }
        setUsersData(dataQueried);
    }

    useEffect(() => {
        getUserID().then(() => {
            getUsersPaths().then(() => {
                getUsersData().then(() => {
                    setEditing(Array(usersData.size).fill(false));
                    setLoaded(true);
                })
            })
        })
    }, [userID, loaded]);

    const handleEdit = idx => {
        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return true;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleSave = async (idx, id) => {
        const fullname = document.getElementById(`userManagement-${id}fullname`).innerText;
        const locked = document.getElementById(`userManagement-${id}locked`).innerText !== 'On';

        if (document.getElementById(`userManagement-${id}locked`).innerText !== 'On'
            && document.getElementById(`userManagement-${id}locked`).innerText !== 'Off') {
            alert("Please only change this to On or Off.");
            return;
        }

        await updateDoc(doc(firestore, "users", id), {
            fullname, locked
        });

        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return false;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handlePermission = () => {
        alert("This feature will be implemented later.");
    }

    return (
        <div id={"userManagement-body"}>
            <div id={"userManagement-header"}>
                <div id={"userManagement-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"userManagement-titleText"}>
                    <h3 id={"userManagement-titleText"}>User Management</h3>
                </div>
                <div id={"userManagement-addButtonDiv"}>
                    <a href={"/userManagement/createUser"} id={"userManagement-addButtonLink"}>
                        <img src={"/locationAdd.png"} id={"userManagement-addButton"}
                             alt={"Add user button"}>
                        </img>
                    </a>
                </div>
            </div>

            <div id={"userManagement-usersInfo"}>
                {loaded ?
                    <table
                        className={"userManagement-usersInfoTableElement"}
                        id={"userManagement-usersInfoTable"}>
                        <tbody>
                        <tr>
                            <th className={"userManagement-usersInfoTableHeading"}>#</th>
                            <th className={"userManagement-usersInfoTableHeading"}>Name</th>
                            <th className={"userManagement-usersInfoTableHeading"}>Email</th>
                            <th className={"userManagement-usersInfoTableHeading"}>Active</th>
                            <th className={"userManagement-usersInfoTableHeading"}></th>
                        </tr>
                        {usersData.map((docSnap, index) =>
                            <tr key={docSnap.id}>
                                <td className={"userManagement-usersInfoTableElement"}>{index + 1}</td>
                                <td className={"userManagement-usersInfoTableElement"} contentEditable={editing[index]}
                                    suppressContentEditableWarning={true}
                                    id={`userManagement-${docSnap.id}fullname`}>{docSnap.data().fullname}</td>
                                <td className={"userManagement-usersInfoTableElement"}>{docSnap.data().email}</td>
                                <td className={"userManagement-usersInfoTableElement"} contentEditable={editing[index]}
                                    suppressContentEditableWarning={true}
                                    id={`userManagement-${docSnap.id}locked`}>{docSnap.data().locked ? "Off" : "On"}</td>
                                <td className={"userManagement-usersInfoTableElement"}>
                                    <div id={"userManagement-dropdown"}>
                                        <button id={"userManagement-tableArrowButton"}>
                                            <img src={"/triangle-right.svg"}
                                                 alt={"Right arrow used to create dropdown menu."}
                                                 id={"userManagement-tableArrow"}/>
                                        </button>
                                        <div id={"userManagement-dropdownMenu"}>
                                            {!editing[index] ?
                                                <button onClick={() => handleEdit(index)}
                                                        className={"userManagement-dropdownButton"}>Edit</button>
                                                : <button onClick={() => handleSave(index, docSnap.id)}
                                                          className={"userManagement-dropdownButton"}>Save</button>}
                                            <button onClick={handlePermission}
                                                    className={"userManagement-dropdownButton"}>Permission
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    : <p className={"loading"}>Loading...</p>}
            </div>
        </div>
    );
}

export default UserManagement;