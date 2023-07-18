import React, {useEffect} from 'react';
import {browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup} from "firebase/auth";
import {firestore} from "../firebase";
import {doc, setDoc, getDoc} from "firebase/firestore";

const GoogleLogin = ({text}) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        auth.useDeviceLanguage();
    }, []);

    const signIn = async () => {
        await auth.signOut();
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithPopup(auth, provider).then(async res => {
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
                console.error(err.code, err.message);
                console.error(err.customData.email);
                console.error(GoogleAuthProvider.credentialFromError(err));
            })
        })
    }

    return (
        <>
            <button onClick={signIn} id={"signup-google"}>{text}</button>
        </>

    );
}

export default GoogleLogin;