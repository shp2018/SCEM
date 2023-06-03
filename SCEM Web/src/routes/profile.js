import React, {useState} from "react";
import {user} from "./login";
import '../css/profile.css';
import {query, where} from "firebase/firestore";
import {collection, getDocs} from "@firebase/firestore";
import {firestore} from "../firebase";

function Profile() {
    const [userPastRentals, setUserPastRentals] = useState([]);
    const ref = collection(firestore, "marketplace");

    async function getUserPastRentals() {
        // TODO: query for items that match user fullname
        const q = query(ref, where("name", "!=", ""));
        const querySnapshot = await getDocs(q);
        setUserPastRentals([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            console.log(data);
            setUserPastRentals(curr => [...curr,
                // TODO: change structure
                <div id={"profile-userPastRentalItem"}>
                    <div> {data.name} </div>
                    <div> {data.description} </div>
                </div>]);
        });
    }

    getUserPastRentals()

    return (
        <div>
            <div id={"profile-header"}>
                <img src={"logoWithBackground.jpg"}
                     id={"profile-headerImage"}></img>
                {/*{user}*/}
            </div>

            <div id={"profile-userPastRentals"}>
                {userPastRentals}
            </div>
        </div>
    );
}

export default Profile;