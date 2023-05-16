import React from "react";
import '../css/homeWithoutLogin.css';

function HomeWithoutLogin() {
    return (
        <div>
            <div id={"homeWithoutLogin-header"}>
                <img id="homeWithoutLogin-logo" src='logoTemp.jpg' alt={"SCEM logo"}></img>

                <form action={"/login"}>
                    <button id={"homeWithoutLogin-button-login"}> Login</button>
                </form>

                <form action={"/signup"}>
                    <button id={"homeWithoutLogin-button-signup"}> Signup</button>
                </form>
            </div>

            <div id={"homeWithoutLogin-suggestions"}>
                <p> AI Suggestions: Equipment A needs urgent maintenance to avoid future breakdown. </p>
            </div>

            <nav id={"homeWithoutLogin-navbar"}>
                <ul id={"homeWithoutLogin-iconBar"}>
                    <img src={'company.png'}
                         id={"homeWithoutLogin-icons"}
                         alt={"Generic Company Logo"}></img>
                    <img src={'equipment.png'}
                         id={"homeWithoutLogin-icons"}
                         alt={"Generic Equipment Logo"}></img>
                    <img src={'rent.png'}
                         id={"homeWithoutLogin-icons"}
                         alt={"Generic Rent Logo"}></img>
                    <img src={'marketplace.png'}
                         id={"homeWithoutLogin-icons"}
                         alt={"Generic Company Logo"}></img>
                </ul>

                <ul id={"homeWithoutLogin-links"}>
                    <li><a href={"/"}> Company </a>
                        </li>
                    <li><a href={"/"}> Equipment </a>
                        </li>
                    <li><a href={"/"}> For Rent </a> </li>
                    <li><a href={"/marketplace"}> Marketplace </a> </li>
                </ul>

            </nav>

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