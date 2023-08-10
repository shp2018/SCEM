import React, {useState, useEffect} from 'react';
import "../css/userGroup.css";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {auth, firestore} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";

const UserGroup = () => {
    const [userGroupIDs, setUserGroupIDs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [editing, setEditing] = useState([]);

    const getCurrentUserID = () => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUserID(user.uid);
        })
    }

    const getUserGroupsData = async () => {
        const userGroupsRef = collection(firestore, "userGroups");
        const userGroupsQuery = query(userGroupsRef, where("userCreatedID", "==", currentUserID));
        const querySnapshot = await getDocs(userGroupsQuery);
        setUserGroupIDs([]);
        let queriedData = [];

        querySnapshot.forEach(doc => {
            queriedData.push(doc);
        });
        setUserGroupIDs(queriedData);
    }

    useEffect(() => {
        getCurrentUserID();
        getUserGroupsData().then(() => {
            setEditing(Array(userGroupIDs.size).fill(false));
            setLoaded(true);
        })
    }, [currentUserID]);

    const handleEdit = idx => {
        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return true;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleSave = async (idx, id) => {
        const name = document.getElementById(`userGroups-${id}name`).innerText;
        const active = document.getElementById(`userGroups-${id}active`).innerText === 'On';

        if (document.getElementById(`userGroups-${id}active`).innerText !== 'On'
        && document.getElementById(`userGroups-${id}active`).innerText !== 'Off') {
            alert("Please only change this to On or Off");
            return;
        }

        await updateDoc(doc(firestore, "userGroups", id), {
            name, active
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
        <div id={"userGroups-body"}>
            <div id={"userGroups-header"}>
                <div id={"userGroups-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"userGroups-titleText"}>
                    <h3 id={"userGroups-titleText"}>User Group</h3>
                </div>
                <div id={"userGroups-addButtonDiv"}>
                    <a href={"/userGroup/create"}>
                        <img src={"/locationAdd.png"} id={"userGroups-addButton"}
                             alt={"Add user group button"}>
                        </img>
                    </a>
                </div>
            </div>

            <div id={"userGroups-tableDiv"}>
                {loaded ?
                    <table
                        className={"userGroups-tableElement"}
                        id={"userGroups-table"}>
                        <tbody>
                        <tr>
                            <th className={"userGroups-tableHeading"}>#</th>
                            <th className={"userGroups-tableHeading"}>Name</th>
                            <th className={"userGroups-tableHeading"}>Active</th>
                            <th className={"userGroups-tableHeading"}></th>
                        </tr>
                        {userGroupIDs.map((doc, index) =>
                            <tr key={doc.id}>
                                <td className={"userGroups-tableElement"}>{index + 1}</td>
                                <td className={"userGroups-tableElement"}
                                contentEditable={editing[index]}
                                suppressContentEditableWarning={true}
                                id={`userGroups-${doc.id}name`}>{doc.data().name}</td>
                                <td className={"userGroups-tableElement"}
                                    contentEditable={editing[index]}
                                    suppressContentEditableWarning={true}
                                    id={`userGroups-${doc.id}active`}>{doc.data().active ? "On" : "Off"}</td>
                                <td className={"userGroups-tableElement"}>
                                    <div id={"userGroups-dropdown"}>
                                        <button id={"userGroups-tableArrowButton"}>
                                            <img src={"/triangle-right.svg"}
                                                 alt={"Right arrow used to create dropdown menu."}
                                                 id={"userGroups-tableArrow"}/>
                                        </button>
                                        <div id={"userGroups-dropdownMenu"}>
                                            {!editing[index] ?
                                                <button onClick={() => handleEdit(index)}
                                                        className={"userGroups-dropdownButton"}>Edit</button> :
                                                <button onClick={() => handleSave(index, doc.id)}
                                                        className={"userGroups-dropdownButton"}>Save</button>}
                                            <button onClick={handlePermission}
                                                    className={"userGroups-dropdownButton"}>Permission</button>
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

export default UserGroup;