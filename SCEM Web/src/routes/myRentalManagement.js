import React, {useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

function MyRentalManagement() {
    const [userData, setUserData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [myRentals, setMyRentals] = useState([]);
    const marketplaceRef = collection(firestore, "marketplace");

    async function getUserData() {
        onAuthStateChanged(auth, async (user) => {
            const ref = collection(firestore, "users");

            const q = query(ref, where("email", "==", user.email));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                if (!userData) setUserData(doc.data());
            });
        })
    }

    async function getMyRentals() {
        console.log(userData);
        const marketplaceQuery = query(marketplaceRef, where("onRent", "==", false));
    }

    useEffect(() => {
        getUserData().then(() => {
            getMyRentals().then(() => {
                setLoaded(true);
            })
        })
    }, []);

    return (
        <div>

        <div id={"myRentalManagement-header"}>
            <a href={"/"}
               className={"arrow left"}>
            </a>
        </div>

        <div id="myRentalManagement-titleText">
            <h3> My Rental Management </h3>
        </div>

        <div>
            {/*{userData ? userData : null}*/}
        </div>
        </div>
    );
}

export default MyRentalManagement;