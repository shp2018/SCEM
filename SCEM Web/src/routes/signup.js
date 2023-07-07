import React, {useState} from "react";
import '../css/signup.css';
import {firestore} from "../firebase";
import {doc, setDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import GoogleLogin from "../components/googleLogin";
import FacebookLogin from "../components/facebookLogin";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setpasswordMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxMessage, setCheckboxMessage] = useState("");

    const handleSave = async (e) => {
        console.log("handleSave", password, confirmPassword);
        e.preventDefault();
        if (password !== confirmPassword) {
            setpasswordMessage("Passwords do not match");
            return;
        }
        if (!isChecked) {
            setCheckboxMessage("Accept terms");
            return;
        }
        //sign up the user
        createUserWithEmailAndPassword(auth, email, password).then(cred => {
            const ref = doc(firestore, "users", cred.user.uid);
            let data = {
                fullname: fullname,
                email: email,
                locked: false,
            }
            try {
                setDoc(ref, data).then(() => {
                    alert("Sign up success.");
                    auth.signOut();
                    window.location.href = "/login";
                })
            } catch (e) {
                console.log(e);
            }
        }).catch((e) => console.log(e))
    }

    return (
        <div id={"signup-page"}>
            <div id={"signup-header"}>
                <div id={"signup-backButton"}>
                    <a href={"/login"}
                       className={"arrow left"}>
                    </a>
                </div>

                <div id={"signup-signupText"}>
                    <h3> Sign Up </h3>
                </div>

            </div>

            <p id="signup-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <form id="signup-form" onSubmit={handleSave}>
                <div>
                    <div id={"signup-inputBoxes"}>
                        <input className="signup-inputs" id="signup-InputText" type="text" placeholder="Full Name"
                               onChange={(e) => {
                                   setFullname(e.target.value)
                               }}></input><br></br>
                        <input className="signup-inputs" id="signup-InputEmail" type="email" placeholder="Email"
                               onChange={(e) => {
                                   setEmail(e.target.value)
                               }}></input><br></br>
                        <input className="signup-inputs" id="signup-InputPassword" type="password"
                               placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value)
                        }}></input><br></br>
                        <input className="signup-inputs" id="signup-InputConfirmPassword" type="password"
                               placeholder="Confirm Password" onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setCheckboxMessage("");
                        }}></input><br></br>
                        <p id="password-error">{passwordMessage}</p>
                    </div>

                    <div id="tacbox">
                        <input id="checkbox" type="checkbox" onClick={() => setIsChecked(!isChecked)}/>
                        <label form="checkbox"> I agree to the <a href="/">Terms and Conditions</a> of SCEM.</label>
                        <p id="checkbox-error">{checkboxMessage}</p>
                    </div>

                    <button id="signup-signupbutton" type="submit">Sign Up</button>

                    <hr></hr>
                </div>
            </form>

            <div id={"signup-signupButtons"}>
                <FacebookLogin text={"Sign Up with Facebook"}/>
                <GoogleLogin text={"Sign Up with Google"}/>
            </div>

        </div>
    );
}

export default Signup;