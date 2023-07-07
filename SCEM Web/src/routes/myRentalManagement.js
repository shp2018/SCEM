import React, {useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import '../css/myRentalManagement.css';

function MyRentalManagement() {
    const [userID, setUserID] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [myRentals, setMyRentals] = useState([]);
    const marketplaceRef = collection(firestore, "marketplace");

    async function getMyRentals() {
        onAuthStateChanged(auth, async (user) => {
            if (user) setUserID(user.uid);
        })
        const marketplaceQuery = query(marketplaceRef, where("onRent", "==", true), where("onRentID", "==", userID));
        const querySnapshot = await getDocs(marketplaceQuery);
        setMyRentals([]);
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setMyRentals(curr => [...curr,
                <tr key={doc.id}>
                    <td className={"myRentalManagement-myRentalsTableElement"}> {} </td>
                    <td className={"myRentalManagement-myRentalsTableElement"}> {data.name} </td>
                    <td className={"myRentalManagement-myRentalsTableElement"}> {data.fromDate} </td>
                    <td className={"myRentalManagement-myRentalsTableElement"}> {data.toDate} </td>
                    <td className={"myRentalManagement-myRentalsTableElement"}> {data.onRentName} </td>
                    <td className={"myRentalManagement-myRentalsTableElement"}>
                        <a href={`/marketplace/${doc._key.path.lastSegment()}`}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to redirect user to item link."}
                                 id={"myRentalManagement-myRentalsTableLinkArrow"}></img>
                        </a>
                    </td>
                </tr>])
        })
    }

    useEffect(() => {
        getMyRentals().then(() => {
            setLoaded(true);
        })
    }, [userID]);

    return (
        <div id={"myRentalManagement-body"}>
            <div id={"myRentalManagement-header"}>
                <div id={"myRentalManagement-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id="myRentalManagement-titleText">
                    <h3 id={"myRentalManagement-titleText"}> My Rental Management </h3>
                </div>
            </div>

            <div id={"myRentalManagement-myRentals"}>
                {loaded ?
                    <table className={"myRentalManagement-myRentalsTableElement"}
                           id={"myRentalManagement-myRentalsTable"}>
                        <tbody>
                        <tr>
                            <th className={"myRentalManagement-myRentalsTableHeading"}> #</th>
                            <th className={"myRentalManagement-myRentalsTableHeading"}> Title</th>
                            <th className={"myRentalManagement-myRentalsTableHeading"}> From Date</th>
                            <th className={"myRentalManagement-myRentalsTableHeading"}> To Date</th>
                            <th className={"myRentalManagement-myRentalsTableHeading"}> Renter</th>
                            <th className={"myRentalManagement-myRentalsTableHeading"}></th>
                        </tr>
                        {myRentals}
                        </tbody>
                    </table>
                    : <p className={"loading"}> Loading... </p>}
            </div>
        </div>
    );
}

export default MyRentalManagement;