import React from "react";
import Glogin from "../components/googleLogin.js";
import FbLogin from "../components/facebookLogin.js";
import {useEffect} from 'react';
import {useState} from 'react';
import {gapi} from 'gapi-script'
import '../css/login.css';
import {setPersistence, browserSessionPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

export let user;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                alert("Success!")
                user = auth.currentUser;
                navigate("/");
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
            <a id="forgot" href="/forgotPassword">Forgot Password</a>
            <br></br>
            <button id="signin" onClick={handleClick}>
                Sign in
            </button>
            <br></br>

            <div className="separator">
                OR
            </div>

            <div id={"loginButtons"}>
                <Glogin/>
                <FbLogin/>
            </div>

            <div>
                <p id="signup">Don't have an account? <a href="/signup"> Signup </a></p>
            </div>

        </div>

        </div>
    );
}

export default Login;