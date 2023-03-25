// eslint-disable-next-line
import React , { useState } from "react";
import '../css/signup.css';

function Signup(){

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
    <div>
        <input id="signup-Input" type="fullname" placeholder="Full Name" ></input><br></br>
        <input id="signup-Input" type="email" placeholder="Email" ></input><br></br>
        <input id="signup-Input" type="password" placeholder="Password" ></input><br></br>
        <input id="signup-Input" type="password" placeholder="Confirm Password" ></input><br></br>

        <div class="tacbox">
          <input id="checkbox" type="checkbox" />
          <label for="checkbox"> I agree to the <a href="/">Terms and Conditions</a> of SCEM.</label>
        </div>

        <button id="signup-signupbutton" type="submit">Sign Up</button>

        <hr></hr>
        <button id="signup-facebook">Sign Up with Facebook</button> 
        <button id="signup-google">Sign Up with Google</button> 
    </div>

    </div>
    </body>


  );

}
export default Signup;