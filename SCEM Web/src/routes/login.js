import React from "react";
import GoogleLogin from "../components/googleLogin.js";
import FacebookLogin from "../components/facebookLogin.js";
import {useEffect} from 'react';
import {useState} from 'react';
import {gapi} from 'gapi-script'
import '../css/login.css';
import {setPersistence, browserSessionPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

export let user;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: clientId,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    })

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClick = () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password).then(() => {
                alert("Authentication success! You will now be redirected to the home page.")
                user = auth.currentUser;
                const previousURL = sessionStorage.getItem('previousURL');
                if (previousURL) window.location.href = previousURL;
                else window.location.href = '/';
            }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
                alert("Invalid login. Try again.")
            })
        })
    };

    return (
        <div id={"login-body"}>
            <div>
                <img id="login-logo" src='/logoWithBackground.jpg' alt={"SCEM logo"}></img>
                <a href="/" id="back" className="arrow left"></a>
            </div>

            <div className="loginMain">
                <h1 id="loginTitle">Login</h1>
                <p id="subtitle">Safeguard your assets with advanced equipment management technology.</p>
                <input className="login-input" type="text" placeholder="Email" name="email"
                       onChange={handleEmailChange}></input><br></br>
                <input className="login-input" type="password" placeholder="Password" name="password"
                       onChange={handlePasswordChange}></input><br></br>
                <br></br>
                <div id={"forgotPasswordTextDiv"}>
                    <a href={"/forgotPassword"} id={"login-forgotPassword"}>Forgot password?</a>
                </div>

                <button id="signin" onClick={handleClick}>
                    Sign in
                </button>
                <br></br>

                <div className="separator">
                    OR
                </div>

                <div id={"loginButtons"}>
                    <FacebookLogin text={"Sign In with Facebook"}/>
                    <GoogleLogin text={"Sign In with Google"}/>
                </div>

                <div>
                    <p id="signup">Don't have an account? <a href="/signup"> Sign up </a></p>
                </div>

            </div>
        </div>
    );
}

export default Login;