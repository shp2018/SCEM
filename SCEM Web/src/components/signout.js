import React from "react";
import {auth} from "../firebase";

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
        <div>
            <button onClick={removeAuthentication}
                    id={id}> {text}
            </button>
        </div>
    );

}

export default SignOut;