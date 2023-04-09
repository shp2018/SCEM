import React, {useState} from "react";
import HomeWithoutLogin from "../components/homeWithoutLogin";
import HomeWithLogin from "../components/homeWithLogin";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

function Home() {
    const [authState, setAuthState] = useState(false);

    function checkAuthState() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState(true);
            }
        })
    }

    checkAuthState();

    if (authState) {
        return (
            <HomeWithLogin> </HomeWithLogin>
        );
    } else {
        return (
            <HomeWithoutLogin> </HomeWithoutLogin>
        );
    }

}

export default Home;