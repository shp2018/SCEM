import React, {useState, useEffect} from 'react';
import '../css/changePassword.css';
import {auth} from "../firebase";
import {
    onAuthStateChanged,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState(null);
    const [authState, setAuthState] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const getAuth = () => {
        onAuthStateChanged(auth, async () => {
            if (auth) {
                setAuthState(true);
            }
        });
    }

    useEffect(getAuth, [authState]);

    const handleChangePassword = e => {
        e.preventDefault();

        if (oldPassword === newPassword) {
            setNewPasswordError(true);
            return;
        } else {
            setNewPasswordError(false);
        }

        if (newPassword !== confirmNewPassword) {
            setConfirmPasswordError(true);
            return;
        } else {
            setConfirmPasswordError(false);
        }

        const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);

        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            updatePassword(auth.currentUser, newPassword).then(() => {
                alert("Password successfully updated.");
                window.location.href = "/user";
            }).catch(error => {
                console.error(error);
            });
        }).catch(error => {
            alert("The old password is incorrect, please check again.");
            console.error(error);
        });
    }

    return (
        <>
            {authState ?
                <div id={"changePassword-page"}>
                    <div id={"changePassword-header"}>
                        <div id={"changePassword-backButtonDiv"}>
                            <a href={"/user"} className={"arrow left"}></a>
                        </div>
                        <h3 id={"changePassword-titleText"}>Change Password</h3>
                    </div>
                    <form onSubmit={handleChangePassword}>
                        <div className={"changePassword-formDivs"}>
                            <label className={"changePassword-formLabels"}>Old Password</label>
                            <br></br>
                            <input className={"changePassword-formInputs"} type={"password"}
                                   onChange={e => setOldPassword(e.target.value)}/>
                        </div>
                        <div className={"changePassword-formDivs"}>
                            <label className={"changePassword-formLabels"}>New Password</label>
                            <br></br>
                            <input className={"changePassword-formInputs"} type={"password"} minLength={8}
                                   maxLength={20}
                                   onChange={e => setNewPassword(e.target.value)}/>
                        </div>
                        <div className={"changePassword-formDivs"}>
                            <label className={"changePassword-formLabels"}>Confirm New Password</label>
                            <br></br>
                            <input className={"changePassword-formInputs"} type={"password"} minLength={8}
                                   maxLength={20}
                                   onChange={e => setConfirmNewPassword(e.target.value)}/>
                        </div>
                        <p className={"changePassword-errorMessage"}>{newPasswordError ? "Please set a new password." : null}</p>
                        <p className={"changePassword-errorMessage"}>{confirmPasswordError ? "New password and confirmation does not match." : null}</p>
                        <button type={"submit"} id={"changePassword-button"}>Update</button>
                    </form>
                </div> : <p id={"changePassword-loading"}>Loading...</p>}
        </>
    );
}

export default ChangePassword;