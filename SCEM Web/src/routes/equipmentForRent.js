import React, {useEffect, useState} from 'react';
import '../css/equipmentForRent.css';
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";

function EquipmentForRent() {
    const [equipmentForRent, setEquipmentForRent] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const marketplaceRef = collection(firestore, "marketplace");

    async function getEquipmentData() {
        const marketplaceQuery = query(marketplaceRef, where("onRent", "==", false));
        const querySnapshot = await getDocs(marketplaceQuery);
        setEquipmentForRent([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setEquipmentForRent(curr => [...curr,
                <div id={"equipmentForRent-marketplaceItem"}
                     key={`${doc.id}`}>
                    <div id={"equipmentForRent-marketplaceItemTitle"}>
                        <a href={`/marketplace/${doc.id}`}
                           id={"equipmentForRent-marketplaceItemLink"}>
                            {data.name} </a>
                    </div>
                    <div id={"equipmentForRent-marketplaceItemDescription"}>
                        {data.description}
                    </div>
                    <div id={"equipmentForRent-marketplaceItemDailyPrice"}>
                        <p> Daily Price: ${data.dailyPrice} </p>
                    </div>
                    <div id={"equipmentForRent-marketplaceItemUserCreated"}>
                        <a href={`/profile/${data.userID}`}
                           id={"equipmentForRent-marketplaceItemUserCreatedLink"}> {data.userCreated} </a>
                    </div>
                    <div id={"equipmentForRent-marketplaceItemDateAndTimeCreated"}>
                        {data.dateCreated}
                        {" "}
                        {data.timeCreated}
                    </div>
                    <div id={"equipmentForRent-marketplaceItemImageDiv"}>
                        <img src={data.images}
                             alt={"Marketplace Item"}
                             id={"equipmentForRent-marketplaceItemImage"}></img>
                    </div>
                </div>]);
        });
    }

    useEffect(() => {
        getEquipmentData().then(() => {
            setLoaded(true);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <body id={"equipmentForRent-body"}>

        <div id={"equipmentForRent-header"}>
            <div id={"equipmentForRent-backButton"}>
                <a href={"/login"}
                   className={"arrow left"}>
                </a>
            </div>

            <div id={"equipmentForRent-titleText"}>
                <h3> Equipment For Rent </h3>
            </div>
        </div>
        <div id={"equipmentForRent-items"}>
            {loaded ? equipmentForRent : <p className={"loaded"}> Loading... </p>}
        </div>

        </body>
    );
}

export default EquipmentForRent;