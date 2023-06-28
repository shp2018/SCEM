import React, {useState} from "react";
import '../css/forgot.css';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebase";

function ForgotPassword() {
    // Handle continue URL after successful password change
    const actionCodeSettings = {
        url: "http://localhost:3000/login",
        handleCodeInApp: false
    };

    //Initialize email's state
    const [email, setEmail] = useState("");

    const sendEmail = e => {
        e.preventDefault();

        sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(() => {
                alert("Success! Check your email.");
            })
            .catch((error => {
                console.log(error.code);
                console.log(error.message);
            }))
    };

    return (
        <div id={"forgot-page"}>
            <div id={"forgot-header"}>
                <div id={"forgot-backButton"}>
                    <a href={"/login"}
                       className={"arrow left"}>
                    </a>
                </div>

                <div id={"forgot-forgotPasswordText"}>
                    <h3> Forgot password </h3>
                </div>
            </div>

            <p id = "forgot-subtitle">Enter the account's email address below.</p>

            <div id={"forgot-emailAndSubmit"}>

                <form onSubmit={sendEmail}>
                    <div>
                        <input type={"email"}
                               placeholder={"Email"}
                               id={"forgot-emailInput"}
                        />
                    </div>

                    <button onClick={() => setEmail(document.getElementById("forgot-emailInput").value)}
                            type={"submit"}
                            id={"forgot-submit"}>
                        Forgot
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;