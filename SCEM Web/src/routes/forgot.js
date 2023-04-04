import React, {useState} from "react";
import '../css/forgot.css';
import {useNavigate} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
    //Database config
    const firebaseConfig = {
        apiKey: "AIzaSyClVMzqHeGaGmWCFLcVD0aS450TKKgRhVk",
        authDomain: "scem-1dec5.firebaseapp.com",
        projectId: "scem-1dec5",
        storageBucket: "scem-1dec5.appspot.com",
        messagingSenderId: "497821850518",
        appId: "1:497821850518:web:801b1501b984370a649bb7"
    };

    //Initialize Firebase
    const app = initializeApp(firebaseConfig);

    //Initialize Realtime Database and get a reference to the service
    const database = getDatabase(app);

    const auth = getAuth();

    //Initialize email's state
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const sendEmail = e => {
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Success!")
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

            <p id = "forgot-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

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