import React, {useEffect, useState} from "react";
import '../css/profile.css';
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";
import {useLocation} from "react-router-dom";

function Profile() {
    const [userPastRentals, setUserPastRentals] = useState([]);
    const [userName, setUserName] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const marketplaceRef = collection(firestore, "marketplace");
    const userID = useLocation().pathname.slice(9);

    async function getUserPastRentals() {
        const marketplaceQuery = query(marketplaceRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(marketplaceQuery);
        setUserPastRentals([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();

            setUserName(data.userCreated);
            setUserPastRentals(curr => [...curr,
                <div id={"profile-profileItem"}
                     key={`${doc.id}`}>
                    <div id={"profile-profileItemTitle"}>
                        <a href={`/marketplace/${doc.id}`}
                           id={"profile-marketplaceItemLink"}>
                            {data.name} </a>
                    </div>
                    <div id={"profile-profileItemDescription"}>
                        {data.description}
                    </div>
                    <div id={"profile-profileItemUserCreated"}>
                        <a href={`/profile/${data.userID}`}
                           id={"profile-profileItemUserCreatedLink"}> {data.userCreated} </a>
                    </div>
                    <div id={"profile-profileItemDateAndTimeCreated"}>
                        {data.dateCreated}
                        {" "}
                        {data.timeCreated}
                    </div>
                    <div id={"profile-profileItemImageDiv"}>
                        <img src={data.images}
                             alt={"Profile Item"}
                             id={"profile-profileItemImage"}></img>
                    </div>
                </div>]);
        });
    }


    useEffect(() => {
        getUserPastRentals().then(() => {
            setLoaded(true);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div id={"profile"}>
            <div id={"profile-header"}>
                <img src={"logoWithBackground.jpg"}
                     id={"profile-headerImage"}
                     alt={"SCEM Logo"}>
                </img>
                <div id={"profile-userName"}>
                    {userName ? userName : null}
                </div>
            </div>

            <div id={"profile-totalItems"}>
                <div id={"profile-totalText"}> Total</div>
                <div id={"profile-totalNumber"}> {loaded ? userPastRentals.length : null} </div>
            </div>

            <div id={"profile-userPastRentals"}>
                {loaded ? userPastRentals : <p> Loading... </p>}
            </div>
        </div>
    );
}

export default Profile;