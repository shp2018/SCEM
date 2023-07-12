import React, {useEffect} from 'react';
import {getAuth, signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {firestore} from "../firebase";

const FacebookLogin = ({text}) => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();

    useEffect(() => {
        auth.useDeviceLanguage();
    }, []);

    const signIn = () => {
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

        }).catch((err) => {
            console.error(err.code, err.message);
            console.error(err.customData.email);
            console.error(FacebookAuthProvider.credentialFromError(err));
            if (err.code === "auth/operation-not-allowed") alert("This feature will be enabled once app is deployed.");
        })
    }

    return (
      <button id={"signup-facebook"} onClick={signIn}>{text}</button>
    );
}
export default FacebookLogin;