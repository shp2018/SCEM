import React, {useEffect, useState} from "react";
import HomeWithoutLogin from "../components/homeWithoutLogin";
import HomeWithLogin from "../components/homeWithLogin";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

function Home() {
    const [authState, setAuthState] = useState(null);

    function checkAuthState() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState(true);
            } else {
                setAuthState(false);
            }
        })
    }

    useEffect(() => {
        checkAuthState();
        // eslint-disable-next-line
    }, []);

    if (authState === true) {
        return (
            <HomeWithLogin> </HomeWithLogin>
        );
    } else if (authState === false) {
        return (
            <HomeWithoutLogin> </HomeWithoutLogin>
        );
    } else if (authState === null) {
        return (
          <div> Loading... </div>
        );
    }

}

export default Home;