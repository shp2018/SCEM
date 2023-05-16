import React, {useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";
import '../css/marketplace.css';

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
            <div id={"marketplace-header"}>
                <img src={"logoWithBackground.jpg"}
                     id={"marketplace-SCEMLogo"}
                     alt={"SCEM Logo"}>
                </img>

                <a href={"/marketplace/search"}
                   id={"marketplace-searchButton"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </a>
            </div>

            <div id="marketplace-marketplaceItems">
                {marketplaceItems}
            </div>

        </div>

    );
}

export default Marketplace;