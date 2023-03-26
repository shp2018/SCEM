import React from "react";
import '../css/homeWithoutLogin.css';

function HomeWithoutLogin() {
    return (
        <div>
            <div id={"homeWithoutLogin-header"}>
                <img id="homeWithoutLogin-logo" src='logoTemp.jpg' alt={"SCEM logo"}></img>

                <form action={"/login"}>
                    <button id={"homeWithoutLogin-button-login"}> Login </button>
                </form>

                <form action={"/signup"}>
                    <button id={"homeWithoutLogin-button-signup"}> Signup </button>
                </form>
            </div>

            <div id={"homeWithoutLogin-suggestions"}>
                <p> AI Suggestions: Equipment A needs urgent maintenance to avoid future breakdown. </p>
            </div>

            <div id={"homeWithoutLogin-imageBar"}>
                <a href={"/"}><img src={'company.png'}
                     id={"homeWithoutLogin-icons"}
                     alt={"Generic Company Logo"}></img></a>
                <a href={"/"}><img src={'equipment.png'}
                     id={"homeWithoutLogin-icons"}
                     alt={"Generic Equipment Logo"}></img></a>
                <a href={"/"}><img src={'rent.png'}
                     id={"homeWithoutLogin-icons"}
                     alt={"Generic Rent Logo"}></img></a>
                <a href={"/"}><img src={'marketplace.png'}
                     id={"homeWithoutLogin-icons"}
                     alt={"Generic Company Logo"}></img></a>
            </div>

            <div id={"homeWithoutLogin-navbar"}>
                <ul id={"homeWithoutLogin-links"}>
                    <li> <a href={"/"}> Company </a></li>
                    <li> <a href={"/"}> Equipment </a>  </li>
                    <li> <a href={"/"}> For Rent </a>  </li>
                    <li> <a href={"/"}> Marketplace </a> </li>
                </ul>
            </div>

            <div id={"homeWithoutLogin-rent"}>
                <a href={"/"}> Rent my equipment </a>
            </div>
            <div id={"homeWithoutLogin-rent"}>
                <a href={"/"}> Equipment for rent </a>
            </div>


        </div>
    );
}

export default HomeWithoutLogin;