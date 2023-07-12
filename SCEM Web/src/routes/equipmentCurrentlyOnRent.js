import React, {useEffect, useState} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {auth, firestore} from "../firebase";
import "../css/marketplaceItem.css";
import {onAuthStateChanged} from "firebase/auth";
import "../css/equipmentCurrentlyOnRent.css";

function EquipmentCurrentlyOnRent() {
    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");

    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const marketplaceRef = collection(firestore, "marketplace");

    useEffect(() => {
        const checkAuthState = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUserID(user.uid);
                    const ref = collection(firestore, "users");
                    const q = query(ref, where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        if (!userName) {
                            setUserName(doc.data().fullname);
                        }
                    });
                }
            });
        };
        checkAuthState();
    }, [userName]);

    useEffect(() => {
        if (userID) {
            getMarketplaceData();
        }
    }, [userID]);

    async function getMarketplaceData() {
        const marketplaceQuery = query(marketplaceRef, where("onRentID", "==", userID));
        const querySnapshot = await getDocs(marketplaceQuery);

        const items = querySnapshot.docs.map(doc => {
            const data = doc.data();

            return (
                <tr key={`${doc.id}`}>
                    <td className={"equipmentCurrentlyOnRent-tableElement"}></td>
                    <td className={"equipmentCurrentlyOnRent-tableElement"}>{data.name}</td>
                    <td className={"equipmentCurrentlyOnRent-tableElement"}>{data.dailyPrice}$</td>
                    <td className={"equipmentCurrentlyOnRent-tableElement"}>{data.onRentName}</td>
                    <td className={"equipmentCurrentlyOnRent-tableElement"}>
                        <a href={`/marketplace/${doc.id}`}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to redirect user to item link."}
                                 id={"equipmentCurrentlyOnRent-tableLinkArrow"}></img>
                        </a>
                    </td>
                </tr>
            );
        });
        setMarketplaceItems(items);
    }

    useEffect(() => {
        getMarketplaceData();
        // eslint-disable-next-line
    }, []);

    return (
        <div id="equipmentCurrentlyOnRent-body">
            <div id="equipmentCurrentlyOnRent-header">
                <div id={"equipmentCurrentlyOnRent-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <h3 id={"equipmentCurrentlyOnRent-titleText"}>Equipment currently on rent</h3>
            </div>
            {marketplaceItems.length > 0 ? (
                <table className={"equipmentCurrentlyOnRent-tableElement"}
                id={"equipmentCurrentlyOnRent-table"}>
                    <tbody>
                    <tr>
                        <th className={"equipmentCurrentlyOnRent-tableHeading"}>#</th>
                        <th className={"equipmentCurrentlyOnRent-tableHeading"}>Name</th>
                        <th className={"equipmentCurrentlyOnRent-tableHeading"}>Price</th>
                        <th className={"equipmentCurrentlyOnRent-tableHeading"}>Renter</th>
                        <th className={"equipmentCurrentlyOnRent-tableHeading"}></th>
                    </tr>
                    {marketplaceItems}
                    </tbody>
                </table>
            ) : (
                <p className={"loading"}>Loading...</p>
            )}
        </div>
    );
}

export default EquipmentCurrentlyOnRent;