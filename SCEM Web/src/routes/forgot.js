import React, {useState} from "react";
import '../css/forgot.css';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

function ForgotPassword() {
    // Handle continue URL after successful password change
    const actionCodeSettings = {
        url: "http://localhost:3000/login",
        handleCodeInApp: false
    };

    //Initialize email's state
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState(null);

    async function getUserData() {
        const ref = collection(firestore, "users");

        const q = query(ref, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        await querySnapshot.forEach((doc) => {
            if (!userData) setUserData(doc.data());
        });
    }

    const sendEmail = async e => {
        //TODO: If email provided is locked, do not send reset email.
        // Testing
        e.preventDefault();

        await getUserData().then(() => {
            console.log(userData);
            sendPasswordResetEmail(auth, email, actionCodeSettings)
                .then(() => {
                    alert("Success! Check your email.");
                })
                .catch((error => {
                    console.log(error.code);
                    switch (error.code) {
                        case ("auth/invalid-email"):
                            alert("Account does not exist, please check your inputted email.");
                            break;
                        case ("auth/missing-email"):
                            alert("Please provide an email.");
                            break;
                        default:
                            break;
                    }
                }))
        });
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

            <p id="forgot-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

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