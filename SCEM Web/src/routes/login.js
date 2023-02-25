import React from "react";
import Glogin from "../components/googleLogin.js";
import FbLogin from "../components/facebookLogin";
import {useEffect} from 'react';
import { useState } from 'react';
import {gapi} from 'gapi-script'
import '../css/login.css';

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

function Login() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    };
    gapi.load('client:auth2',start)
  })
  const [email, Email] = useState('');
  const [password, Password] = useState('');

  const [givenEmail, setEmail] = useState(email);
  const [givenPassword, setPassword] = useState(password);

  const handleEmailChange = (event) => {
    Email(event.target.value);
  };
  const handlePasswordChange = (event) => {
    Password(event.target.value);
  };


  const handleClick = () => {
    setEmail(email);
    setPassword(password);
  };

    return (
      <body>
  <div>
    <img id="logo" src='logoTemp.jpg'></img>
    <a href="/" id="back" className="arrow left"></a>
        
      </div>
      <div className="loginMain">
        <h1 id="loginTitle">Login</h1>
        <p id = "subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <input id="Email" type="text" placeholder="Email" name="email" onChange={handleEmailChange} ></input><br></br>
        <input id="Password" type="password" placeholder="Password" name="password" onChange={handlePasswordChange} ></input><br></br>
        <a id ="forgot" href="/forgotPassword">Forgot Password</a> 
       <br></br>
        <button id="signin" onClick={handleClick}>Sign in</button><br></br>
        <div className="separator">OR</div>
    <div style={{display: 'flex',flexWrap: 'wrap' }}>
     <Glogin/>
    <FbLogin/>
    </div>
      <div>
        <p id="signup">Don't have an account?  <a href="/signup">Signup</a></p>
      </div>
       

     

      </div>

      </body>
    );
    }

export default Login;
