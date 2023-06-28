import React, {useState, useEffect} from 'react';
import '../css/userManagement.css';
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where, doc, getDoc} from "firebase/firestore";

const UserManagement = () => {
    const [userID, setUserID] = useState(null);
    const [usersPath, setUsersPath] = useState([]);
    const [usersData, setUsersData] = useState([])
    const [loaded, setLoaded] = useState(false);
    const companyRef = collection(firestore, "company");

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

            usersArray.forEach((res) => {
                setUsersPath(curr => [...curr,
                    res._key.path.lastSegment()]);
            });
        });
    }

    const dropdown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = (event) => {
        if (event.target.matches('.userManagement-dropdownButton')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i].classList.contains('show')) {
                    dropdowns[i].classList.remove('show');
                }
            }
        }
    }

    const getUsersData = async () => {
        setUsersData([]);
        for (const res of usersPath) {
            const docRef = doc(firestore, "users", res);
            const docSnap = await getDoc(docRef);
            let data = docSnap.data();

            setUsersData(curr => [...curr,
                <tr key={`${docSnap.id}`}>
                    <td className={"userManagement-usersInfoTableElement"}>{}</td>
                    <td className={"userManagement-usersInfoTableElement"}>{data.fullname}</td>
                    <td className={"userManagement-usersInfoTableElement"}>{data.email}</td>
                    <td className={"userManagement-usersInfoTableElement"}>{data.locked ? "Off" : "On"}</td>
                    <td className={"userManagement-usersInfoTableElement"}>
                        <div className={"userManagement-dropdownDiv"}>
                            <button onClick={dropdown} className={"userManagement-dropdownButton"}
                                    id={"userManagement-dropDownButtonID"}><img
                                src={"/triangle-right.svg"}
                                alt={"Right arrow used to redirect user to item link."}
                                id={"userManagement-tableLinkArrow"}>
                            </img></button>
                            <div id={"myDropdown"} className={"dropdown-content"}>
                                <a href={`/userManagement`} className={"userManagement-dropdownButton"}>Edit</a>
                                <a href={`/userManagement`} className={"userManagement-dropdownButton"}>Permission</a>
                                <button className={"userManagement-dropdownButton"}
                                        id={"userManagement-dropdownCancel"}>Cancel
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>]);
        }
    }

    useEffect(() => {
        getUserID().then(() => {
            getUsersPaths().then(() => {
                getUsersData().then(() => {
                    setLoaded(true);
                })
            })
        })
    }, [userID, loaded]);

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
                    <div>
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
                            {usersData}
                            </tbody>
                        </table>
                    </div>
                    : <p className={"loading"}>Loading...</p>}
            </div>
        </div>
    );
}

export default UserManagement;