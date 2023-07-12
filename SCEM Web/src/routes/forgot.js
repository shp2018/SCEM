import React, {useState} from "react";
import '../css/forgot.css';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, query, where} from "firebase/firestore";
import {getDocs} from "firebase/firestore";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    // Handle continue URL after successful password change
    const actionCodeSettings = {
        url: "http://localhost:3000/login",
        handleCodeInApp: false,
    };

    const sendEmail = async e => {
        e.preventDefault();

        const emailQuery = query(collection(firestore, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(emailQuery);

        if (querySnapshot.size === 0) {
            alert("Account does not exist. Please review.");
            return;
        }

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            if (data.locked) {
                alert("Account has been locked, please contact email scemsmartconstruction@gmail.com.");
            } else {
                sendPasswordResetEmail(auth, email, actionCodeSettings)
                    .then(() => {
                        alert("Success! Check your email.");
                        window.location.href = "/login";
                    })
                    .catch((error => {
                        console.error(error.code, error.message);
                    }))
            }
        })
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

            <p id="forgot-subtitle">Enter the account's email address below.</p>

            <div id={"forgot-emailAndSubmit"}>
                <form onSubmit={sendEmail}>
                    <div>
                        <input type={"email"}
                               placeholder={"Email"}
                               id={"forgot-emailInput"}
                               onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <button
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