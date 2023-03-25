import React, {useState} from "react";
import emailjs from 'emailjs-com';
import '../css/forgot.css';
import {useNavigate} from "react-router-dom";

function ForgotPassword() {
    emailjs.init('GONcF-cj5ZEW9CF6a');

    const [email, setEmail] = useState("");

    const templateParams = {
        email: email,
        OTP: Math.floor(100000 + Math.random() * 900000),
    }

    const navigate = useNavigate();

    const sendEmail = e => {
        e.preventDefault();

        if (email === "") {
            alert('Email not valid.');
            return;
        }

        emailjs.send('service_miwbqi2', 'template_5f1t95s', templateParams)
            .then((res) => {
                alert('OTP to retrieve the password sent to the email if it exists.');
                navigate('/resetPassword', {state: {email: templateParams.email, OTP: templateParams.OTP} });
            }, err => {
                console.log(err.text);
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