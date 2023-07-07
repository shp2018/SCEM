import React, {useEffect} from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {firestore} from "../firebase";
import {doc, setDoc, getDoc} from "firebase/firestore";

const GoogleLogin = ({text}) => {
    const auth = getAuth();

    useEffect(() => {
        auth.useDeviceLanguage();
    }, []);

    const signIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then(async res => {
            const user = res.user;

            const userDoc = doc(firestore, "users", user.uid);
            const userData = await getDoc(userDoc);

            if (!userData.exists()) {
                await setDoc(userDoc, {
                    fullname: user.displayName,
                    email: user.email,
                    locked: false,
                })
            }
            alert("Authentication success! You will now be redirected to the home page.");
            window.location.href = "/";

        }).catch(err => {
            console.log(err.code, err.message);
            console.log(err.customData.email);
            console.log(GoogleAuthProvider.credentialFromError(err));
        })
    }

    return (
        <>
            <button onClick={signIn} id={"signup-google"}>{text}</button>
        </>

    );
}

export default GoogleLogin;