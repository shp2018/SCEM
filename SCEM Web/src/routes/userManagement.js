import React, {useState, useEffect} from 'react';
import '../css/userManagement.css';
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

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
        setUsersPath([]);

        querySnapshot.forEach(doc => {
            let data = doc.data();
            console.log(data.users);
            data.users.forEach((res) => {
                console.log(res.path);
            });
        });
    }

    const getUsersData = async () => {

    }

    useEffect(() => {
        getUserID().then(() => {
            getUsersPaths().then(() => {
                getUsersData().then(() => {
                    setLoaded(true);
                })
            })
        })
    }, [userID]);

    return (
        <div id={"userManagement-body"}>
            {loaded
                ?
                <div>
                    <div id={"userManagement-header"}>
                        <div id={"userManagement-backButton"}>
                            <a href={"/"}
                               className={"arrow left"}>
                            </a>
                        </div>
                        <div id={"userManagement-titleText"}>
                            <h3 id={"userManagement-titleText"}>User Management</h3>
                        </div>
                    </div>

                    <div id={"userManagement-usersInfo"}>
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
                            {usersPath}
                            </tbody>
                        </table>
                    </div>

                </div>
                :
                <p className={"loading"}>Loading...</p>}
        </div>
    );
}

export default UserManagement;