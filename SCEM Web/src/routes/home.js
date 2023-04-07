import React from "react";
import HomeWithoutLogin from "../components/homeWithoutLogin";
import HomeWithLogin from "../components/homeWithLogin";
import {user} from "./login";

function displayHomePage() {
    if (user) {
        return (
            <HomeWithLogin> </HomeWithLogin>
        );
    } else {
        return (
            <HomeWithoutLogin> </HomeWithoutLogin>
        );
    }
}

function Home() {
    return (
        displayHomePage()
    );
}

export default Home;