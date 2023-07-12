import React, {useEffect, useState} from 'react';
import "../css/userManagement-createUser.css";
import {createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";

const UserManagementCreateUser = () => {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [userGroups, setUserGroups] = useState([]);
    const [userGroupsData, setUserGroupsData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // TODO: Refactor to only include userGroups associated with logged in user.
    const getUserGroups = async () => {
        const userGroupRef = collection(firestore, "userGroups");
        const userGroupsQuery = query(userGroupRef);
        const querySnapshot = await getDocs(userGroupsQuery);
        setUserGroups([]);
        setUserGroupsData([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setUserGroupsData(curr => [...curr, doc]);
            setUserGroups(curr => [...curr,
            <div key={doc.id}>
                <input type={"checkbox"} id={doc.id}/>
                <label>{data.name}</label>
            </div>]);
        })
    }

    const updateUserGroups = async (userUID) => {
        for (const userGroupData of userGroupsData) {
            if (document.getElementById(userGroupData.id).checked) {
                const targetDoc = doc(firestore, "userGroups", userGroupData.id);
                await updateDoc(targetDoc, {
                    users: arrayUnion(userUID),
                })
            }
        }
    }

    useEffect(() => {
        getUserGroups().then(() => {
            setLoaded(true);
        });
    }, []);

    const createUser = e => {
        e.preventDefault();
        // This password doesn't matter, user is prompted to reset their password via their email
        const randomPassword = Math.random().toString(36).slice(-8);

        createUserWithEmailAndPassword(auth, newUserEmail, randomPassword).then(res => {
            const userRef = doc(firestore, "users", res.user.uid);
            setDoc(userRef, {
                fullname: newUserName,
                email: newUserEmail,
                locked: false,
            }).then(async () => {
                await updateUserGroups(res.user.uid);
                // sign out of newly created account, since signup automatically signs into created account
                auth.signOut().then(() => {
                    sendPasswordResetEmail(auth, newUserEmail).then(() => {
                        alert(`Go to the email ${newUserEmail} to set the password for the account created.`);
                        alert(`Please re-login. You'll be redirected back to the User Management page after logging in.`)
                        sessionStorage.setItem('previousURL', "/userManagement");
                        window.location.href = '/login';
                    });
                });
            });
        }).catch(err => {
            console.error(err.message);
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                alert("Account already exists, please register another account.");
            }
        })
    }

    return (
        <div id={"userManagementCreateUser-body"}>
            <div id={"userManagementCreateUser-header"}>
                <div id={"userManagementCreateUser-backButton"}>
                    <a href={"/userManagement"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"userManagementCreateUser-titleText"}>
                    <h3>Create User</h3>
                </div>
            </div>

            <form id={"userManagementCreateUser-form"} onSubmit={createUser}>
                <div className={"userManagementCreateUser-formInputDiv"}>
                    <label className={"userManagementCreateUser-formLabel"}>Full Name</label>
                    <input type={"text"} className={"userManagementCreateUser-formInput"}
                           onChange={e => setNewUserName(e.target.value)}></input>
                </div>
                <div className={"userManagementCreateUser-formInputDiv"}>
                    <label className={"userManagementCreateUser-formLabel"}>Email</label>
                    <input type={"email"} className={"userManagementCreateUser-formInput"}
                           onChange={e => setNewUserEmail(e.target.value)}></input>
                </div>
                <div id={"userManagement-userGroupsDiv"}>
                    <h3>User Group</h3>
                    {loaded ? userGroups : <p className={"loading"}>Loading...</p>}
                </div>
                <div className={"userManagementCreateUser-formInputDiv"}>
                    <button type={"submit"} id={"userManagementCreateUser-formSubmitButton"}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default UserManagementCreateUser;