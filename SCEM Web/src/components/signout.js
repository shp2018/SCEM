import React from "react";
import {auth} from "../firebase";
import '../css/signout.css';

const SignOut = ({id, text, redirect}) => {
    const removeAuthentication = (e) => {
        e.preventDefault();

        auth.signOut().then(() => {
            if (redirect) {
                window.location.href = "/login";
            } else {
                window.location.reload();
            }
        })
    }

    return (
        <div id={"signOut"}>
            <button onClick={removeAuthentication}
                    id={id}> {text}
            </button>
        </div>
    );

}

export default SignOut;