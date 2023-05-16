import React, {useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";

function Marketplace() {
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const ref = collection(firestore, "marketplace");

    async function getMarketplaceData() {
        const q = query(ref, where("name", "!=", ""));
        const querySnapshot = await getDocs(q);
        setMarketplaceItems([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setMarketplaceItems(curr => [...curr, <div> {data.name} </div>]);
        });
    }

    getMarketplaceData();

    return (
        <div>
            <center>
                <h3> Marketplace </h3>
                <div id="marketplaceItems">
                    {marketplaceItems}
                </div>
            </center>
        </div>

    );
}

export default Marketplace;