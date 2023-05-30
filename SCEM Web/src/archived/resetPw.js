import React, {useState} from "react";
import '../css/resetPw.css';
import {useLocation, useNavigate} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

function ResetPassword() {
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

    const location = useLocation();
    const navigate = useNavigate();

    let email;

    if (location.state != null) {
        email = location.state.email;
    }

    // eslint-disable-next-line
    const [userEmail, setUserEmail] = useState(email);
    // eslint-disable-next-line
    const [userPassword, setUserPassword] = useState('');

    const checkForm = e => {
        e.preventDefault();

    }

    return (
        <div id={"reset-page"}>
            <div id={"reset-backButton"}>
                <a href={"/forgotpassword"}
                   className={"arrow left"}>
                </a>
            </div>
            <div id={"reset-header"}>
                <h3 id={"reset-resetPasswordText"}> Reset Password </h3>
            </div>
            <p id={"reset-subtitle"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <form onSubmit={checkForm}>
                <div id={"reset-inputs"}>
                    <input type={"text"}
                           defaultValue={email}
                           placeholder={"Email"}
                           id={"reset-emailInput"}
                           onChange={() => setUserEmail(document.getElementById("reset-emailInput").value)}
                    />

                    <input type={"password"}
                           placeholder={"Password"}
                           id={"reset-password"}
                           onChange={() => setUserPassword(document.getElementById("reset-password").value)}
                    />

                    <input type={"password"}
                           placeholder={"Confirm Password"}
                           id={"reset-confirmPassword"}/>
                </div>
                <button type={"submit"}
                        id={"reset-button"}>
                    Reset
                </button>
            </form>
        </div>

    );
}

export default ResetPassword;