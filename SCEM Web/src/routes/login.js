import React from "react";
import Glogin from "../components/googleLogin.js";
import FbLogin from "../components/facebookLogin.js";
import {useEffect} from 'react';
import {useState} from 'react';
import {gapi} from 'gapi-script'
import '../css/login.css';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

const clientId = "1020057730481-3iflk45qqttk0v8pg48bjk4j0nmi6qm2.apps.googleusercontent.com"

function Login() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start)
    })
    const [email, Email] = useState('');
    const [password, Password] = useState('');
    // eslint-disable-next-line
    const [givenEmail, setEmail] = useState(email);
    // eslint-disable-next-line
    const [givenPassword, setPassword] = useState(password);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        Email(event.target.value);
    };

    const handlePasswordChange = (event) => {
        Password(event.target.value);
    };

    const handleClick = () => {
        setEmail(email);
        setPassword(password);

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Success!");
            navigate("/");
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
            alert("Invalid login. Try again.")
        })
    };

    return (
        <body>

        <div>
            <img id="logo" src='logoTemp.jpg' alt={"SCEM logo"}></img>
            <a href="/" id="back" className="arrow left"></a>
        </div>

        <div className="loginMain">
            <h1 id="loginTitle">Login</h1>
            <p id="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <input id="Email" type="text" placeholder="Email" name="email"
                   onChange={handleEmailChange}></input><br></br>
            <input id="Password" type="password" placeholder="Password" name="password"
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

        </body>
    );
}

export default Login;