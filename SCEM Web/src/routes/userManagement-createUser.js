import React, {useState} from 'react';
import "../css/userManagement-createUser.css";
import {createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {doc, setDoc} from "firebase/firestore";

const UserManagementCreateUser = () => {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");

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
            }).then(() => {
                // sign out of newly created account, since signup automatically signs into created account
                auth.signOut().then(() => {
                    sendPasswordResetEmail(auth, newUserEmail).then(() => {
                        alert(`Go to the email ${newUserEmail} to set the password for the account created.`);
                        // TODO: log back in to current user OR redirect to login page, then redirect back to userManagement
                    });
                });
            });
        }).catch(err => {
            console.log(err.message);
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
                <div className={"userManagementCreateUser-formInputDiv"}>
                    <button type={"submit"} id={"userManagementCreateUser-formSubmitButton"}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default UserManagementCreateUser;