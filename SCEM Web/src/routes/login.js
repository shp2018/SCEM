import React from "react";
// import googleLogin from "./googleLogin";
// import {useEffect} from 'react';
// import {gapi} from 'gapi-script'

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

function Login() {

  // useEffect(()=>{
  //   function start(){
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope:""
  //     })
  //   }
  //   gapi.load('client:auth2',start)
  // })

    return (
      <body>
  <div>
    <img id="logo" src='logoTemp.jpg'></img>
    <a href="/" id="back" className="arrow left"></a>
        
      </div>
      <div className="loginMain">
        <h1 id="loginTitle">Login</h1>
        <p id = "subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <input id="Email" type="text" placeholder="Email" ></input><br></br>
        <input id="Password" type="text" placeholder="Password" ></input><br></br>
        <span><a id ="forgot" href="/forgotPassword">Forgot Password</a> 
        <a id="signup"href="/signup">Sign up</a></span><br>
        </br>
        <button id="signin">Sign in</button><br></br>
        <hr></hr>
        <button id="facebook">Sign in with Facebook</button> 
        <button id="google">Sign in with Google</button> 

     

      </div>

      </body>
    );
    }

export default Login;
