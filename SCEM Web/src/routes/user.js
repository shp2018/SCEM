import React, {useState, useEffect} from 'react';
import '../css/user.css';
import {auth, firestore} from "../firebase";
import {doc, getDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import SignOut from "../components/signout";

const LinkDiv = ({text, link, id}) => {
    if (id === "firstItem") {
        return (
            <div className={"user-linkDivs"} id={"user-firstItem"}>
                <img src={"/blue-circle.png"} className={"user-blueCircle"} alt={"Blue circle"}></img>
                <a href={link} id={"user-linkText"}>{text}</a>
                <a href={link}><img src={"/right-arrow.png"} id={"user-linkArrow"}
                                    alt={"Right arrow with embed link to redirect to site."}></img></a>
            </div>
        );
    } else {
        return (
            <div className={"user-linkDivs"}>
                <img src={"/blue-circle.png"} className={"user-blueCircle"} alt={"Blue circle"}></img>
                <a href={link} id={"user-linkText"}>{text}</a>
                <a href={link}><img src={"/right-arrow.png"} id={"user-linkArrow"}
                                    alt={"Right arrow with embed link to redirect to site."}></img></a>
            </div>
        );
    }
}

const User = () => {
    const [loaded, setLoaded] = useState(false);
    const [authState, setAuthState] = useState(false);
    const [userData, setUserData] = useState({});

    const checkAuthState = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (auth) {
                const ref = doc(firestore, "users", auth.currentUser.uid);
                const docSnap = await getDoc(ref);

                auth.currentUser.photoURL = docSnap.data().profilePicture;
                auth.currentUser.displayName = docSnap.data().fullname;

                setAuthState(true);
                setUserData(user);
            }
        });
    }

    useEffect(() => {
        checkAuthState().then(() => {
            if (userData) {
                setLoaded(true);
            }
        })
    }, [authState]);

    return (
        <>
            {loaded && userData.photoURL && userData.displayName ?
                <div id={"user-page"}>
                    <div id={"user-header"}>
                        <div id={"user-backButtonDiv"}>
                            <a href={"/"} className={"arrow left"}></a>
                        </div>
                        <img id={"user-profilePicture"} src={userData.photoURL} alt={"User profile picture"}></img>
                        <p id={"user-displayName"}>{userData.displayName}</p>
                    </div>

                    <LinkDiv text={"Rent my equipment"} link={"/marketplace/addItem"} id={"firstItem"}/>
                    <LinkDiv text={"Manage Rent"} link={"/myRentalManagement"}/>
                    <LinkDiv text={"Notification"} link={"/user/notification"}/>
                    <LinkDiv text={"Change Profile"} link={"/user/changeProfile"}/>
                    <LinkDiv text={"Change Password"} link={"/user/changePassword"}/>

                    <h3 className={"user-headings"}>Company Management</h3>
                    <LinkDiv text={"Company Profile"} link={"/companyProfile"}/>
                    <LinkDiv text={"User Group"} link={"/userGroup"}/>
                    <LinkDiv text={"User Management"} link={"/userManagement"}/>

                    <h3 className={"user-headings"}>Equipment Management</h3>
                    <LinkDiv text={"Equipment Group"} link={"/equipmentGroup"}/>
                    <LinkDiv text={"Equipment Management"} link={"/equipmentManagement"}/>
                    <LinkDiv text={"Site and Tracking link"} link={"/siteAndTrackingLink"}/>

                    <div id={"user-signOut"}>
                        <SignOut id={"user-signOutButton"} text={"Log Out"} redirect={true}/>
                    </div>
                </div> : <p id={"user-loadingText"}>Loading...</p>}

        </>
    );
}

export default User;