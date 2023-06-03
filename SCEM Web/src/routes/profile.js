import React, {useEffect, useState} from "react";
import '../css/profile.css';
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";
import {useLocation} from "react-router-dom";

function Profile() {
    const [userPastRentals, setUserPastRentals] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const marketplaceRef = collection(firestore, "marketplace");
    const userID = useLocation().pathname.slice(9);

    async function getUserPastRentals() {
        const marketplaceQuery = query(marketplaceRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(marketplaceQuery);
        setUserPastRentals([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            console.log(data);

            setUserPastRentals(curr => [...curr,
            <div> {data.name} </div>]);
        });
    }

    useEffect(() => {
        getUserPastRentals().then(() => {
            setLoaded(true);
        });
    }, []);

    return (
        <div id={"profile"}>
            <div id={"profile-header"}>
                <img src={"logoWithBackground.jpg"}
                     id={"profile-headerImage"}
                     alt={"SCEM Logo"}></img>
            </div>

            <div id={"profile-totalItems"}>
                <div id={"profile-totalText"}> Total </div>
                <div id={"profile-totalNumber"}> {loaded ? userPastRentals.length : null} </div>
            </div>
            <div id={"profile-userPastRentals"}>
                {loaded ? userPastRentals : <p> Loading... </p>}
            </div>
        </div>
    );
}

export default Profile;