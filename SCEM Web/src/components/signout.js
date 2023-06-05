import React from "react";
import {auth} from "../firebase";
import '../css/signout.css';

function SignOut() {
    const removeAuthentication = (e) => {
        e.preventDefault();

        auth.signOut().then(() => {
            window.location.reload();
        })
    }

    return (
        <div id={"signOut"}>
            <button onClick={removeAuthentication}
                    id={"signOut-signOutButton"}> Sign Out
            </button>
        </div>
    );

}

export default SignOut;