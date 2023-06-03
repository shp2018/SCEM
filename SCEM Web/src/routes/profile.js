import React, {useEffect, useState} from "react";
import '../css/profile.css';
import {collection} from "firebase/firestore";
import {firestore} from "../firebase";

function Profile() {
    const [userPastRentals, setUserPastRentals] = useState([]);
    const marketplaceRef = collection(firestore, "marketplace");

    async function getUserPastRentals() {

    }

    useEffect(() => {
        getUserPastRentals();
    }, []);

    return (
        <div>
            <div id={"profile-header"}>
                <img src={"logoWithBackground.jpg"}
                     id={"profile-headerImage"}
                     alt={"SCEM Logo"}></img>
            </div>
            Profile
            <div id={"profile-userPastRentals"}>
                {userPastRentals}
            </div>
        </div>
    );
}

export default Profile;