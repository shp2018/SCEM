import React from "react";
import HomeWithoutLogin from "../components/homeWithoutLogin";
import HomeWithLogin from "../components/homeWithLogin";

function checkLoginStatus() {
    // TODO: add function in condition to check if user is logged in or not
    if (false) {
        return (
            <HomeWithoutLogin> </HomeWithoutLogin>
        );
    } else {
        return (
            <HomeWithLogin> </HomeWithLogin>
        );
    }
}

function Home() {
    return (
        checkLoginStatus()
    );
}

export default Home;