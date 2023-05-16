import React, { useRef, useState } from "react";
import '../css/signup.css';
import { firestore } from "../firebase";
import { doc, setDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setpasswordMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxMessage, setcheckboxMessage] = useState("");




  const handleSave = async(e) => {
    console.log("handleSave",password, confirmPassword);
    e.preventDefault();
    if (password !== confirmPassword) {
      setpasswordMessage("Passwords do not match");
      return;

    }
    if (!(isChecked)) {
      setcheckboxMessage("Accept terms");
      return;
    }
    //sign up the user
    console.log("in else");
    createUserWithEmailAndPassword(auth,email, password).then(cred => {
      const ref = doc(firestore,"users",cred.user.uid);
      console.log(cred);
      let data = {
        fullname:fullname,
        email:email,
        locked:false
      }
      try {
        setDoc(ref,data)
      } catch (e) {
        console.log(e);
      }
    }).catch((e) => console.log(e))
  }




  return (
    <body>
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

    <p id = "signup-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <form id = "signup-form" onSubmit = {handleSave}>
      <div>
        <div id={"signup-inputBoxes"}>
        <input id="signup-InputText" type="text" placeholder="Full Name"  onChange = {(e) => {setFullname(e.target.value)}} ></input><br></br>
        <input id="signup-InputEmail" type="text" placeholder="Email" onChange = {(e) => {setEmail(e.target.value)}} ></input><br></br>
        <input id="signup-InputPassword" type="password" placeholder="Password"  onChange = {(e) => {setPassword(e.target.value)}}></input><br></br>
        <input id="signup-InputConfirmPassword" type="password" placeholder="Confirm Password" onChange = {(e) => {setConfirmPassword(e.target.value); setcheckboxMessage("");}} ></input><br></br>
        <p id = "password-error">{passwordMessage}</p>
        </div>

        <div class="tacbox">
          <input id="checkbox" type="checkbox" onClick = {() => setIsChecked(!isChecked)}/>
          <label for="checkbox"> I agree to the <a href="/">Terms and Conditions</a> of SCEM.</label>
          <p id = "checkbox-error">{checkboxMessage}</p>
        </div>

        <button id="signup-signupbutton" type="submit">Sign Up</button>

        <hr></hr>
        <button id="signup-facebook">Sign Up with Facebook</button>
        <button id="signup-google">Sign Up with Google</button>
      </div>
    </form>

    </div>
    </body>
  );
}

export default Signup;
