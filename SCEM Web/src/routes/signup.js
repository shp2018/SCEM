import React, { useRef } from "react";
import '../css/signup.css';
import { firestore } from "../firebase";
import { addDoc,collection } from "@firebase/firestore";

function Signup() {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const ref = collection(firestore,"users");
  
  const handleSave = async(e) => {
    e.preventDefault();
    console.log(fullnameRef.current.value);
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);

    let data = {
        fullname:fullnameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
}

    try {
        addDoc(ref,data)
    } catch (e) {
      console.log(e);
    }
  }

  const signUp = () => {
    // Handle form submission logic here
  };

  return (
    <div id="signup-page">
      <div id="signup-header">
        <div id="signup-backButton">
          <a href="/login" className="arrow left"></a>
        </div>
        <div id="signup-signupText">
          <h3>Sign Up</h3>
        </div>
      </div>

      <p id="signup-subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>

      <div>
        <form onSubmit = {handleSave}>
          <input
            id="signup-Input"
            type="name"
            placeholder="Full Name"
            ref={fullnameRef}
          />
          <br />
          <input
            id="signup-Input"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <br />
          <input
            id="signup-Input"
            type="name"
            placeholder="Password"
            ref={passwordRef}
          />
          <br />
          <input
            id="signup-Input"
            type="name"
            placeholder="Confirm Password"
          />
          <br />

          <div className="tacbox">
            <input id="signup-checkbox" type="checkbox" />
            <label htmlFor="signup-checkbox">
              I agree to the <a href="#">Terms and Conditions</a> of SCEM.
            </label>
          </div>

          <button
            onClick={signUp}
            id="signup-signupbutton"
            type="submit"
          >
            Sign Up
          </button>

          <hr />
          <button id="signup-facebook">Sign Up with Facebook</button>
          <button id="signup-google">Sign Up with Google</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
