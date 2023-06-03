import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";
import '../css/marketplace.css';

function Marketplace() {
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const marketplaceRef = collection(firestore, "marketplace");

    async function getMarketplaceData() {
        const marketplaceQuery = query(marketplaceRef, where("name", "!=", ""));
        const querySnapshot = await getDocs(marketplaceQuery);
        setMarketplaceItems([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setMarketplaceItems(curr => [...curr,
                <div id={"marketplace-marketplaceItem"}
                     key={`${doc.id}`}>
                    <div id={"marketplace-marketplaceItemTitle"}>
                        <a href={`/marketplace/${doc.id}`}
                           id={"marketplace-marketplaceItemLink"}>
                            {data.name} </a>
                    </div>
                    <div id={"marketplace-marketplaceItemDescription"}>
                        {data.description}
                    </div>
                    <div id={"marketplace-marketplaceItemUserCreated"}>
                        <a href={`/profile/${data.userID}`}
                           id={"marketplace-marketplaceItemUserCreatedLink"}> {data.userCreated} </a>
                    </div>
                    <div id={"marketplace-marketplaceItemDateAndTimeCreated"}>
                        {data.dateCreated}
                        {" "}
                        {data.timeCreated}
                    </div>
                    <div id={"marketplace-marketplaceItemImageDiv"}>
                        <img src={data.images}
                             alt={"Marketplace Item"}
                             id={"marketplace-marketplaceItemImage"}></img>
                    </div>
                </div>]);
        });
    }

    useEffect(() => {
        getMarketplaceData();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div id={"marketplace-header"}>
                <a href={"/"}
                   id={"marketplace-homeIcon"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                         className="bi bi-house" viewBox="0 0 16 16">
                        <path
                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                    </svg>
                </a>

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

            <div id={"marketplace-addItem"}>
                <a href={"/marketplace/addItem"}>
                    <button> Add Item</button>
                </a>
            </div>

        </div>

    );
}

export default Marketplace;