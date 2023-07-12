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
                <tr key={doc.id}>
                    <td className={"equipmentForRent-tableElement"}></td>
                    <td className={"equipmentForRent-tableElement"}>{data.name}</td>
                    <td className={"equipmentForRent-tableElement"}>{data.dailyPrice}$</td>
                    <td className={"equipmentForRent-tableElement"}>{data.toDate}</td>
                    <td className={"equipmentForRent-tableElement"}>
                        <a href={`/marketplace/${doc._key.path.lastSegment()}`}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to redirect user to item link."}
                                 id={"equipmentForRent-tableArrow"}></img>
                        </a>
                    </td>
                </tr>]);
        });
    }

    useEffect(() => {
        getEquipmentData().then(() => {
            setLoaded(true);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div id={"equipmentForRent-body"}>
            <div id={"equipmentForRent-header"}>
                <div id={"equipmentForRent-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>

                <div id={"equipmentForRent-titleText"}>
                    <h3> Equipment For Rent </h3>
                </div>
            </div>
            <div id={"equipmentForRent-items"}>
                {loaded ?
                    <table className={"equipmentForRent-tableElement"}
                           id={"equipmentForRent-table"}>
                        <tbody id={"equipmentForRent-tableBody"}>
                        <tr>
                            <th className={"equipmentForRent-tableHeading"}>#</th>
                            <th className={"equipmentForRent-tableHeading"}>Title</th>
                            <th className={"equipmentForRent-tableHeading"}>Price</th>
                            <th className={"equipmentForRent-tableHeading"}>Expired</th>
                            <th className={"equipmentForRent-tableHeading"}></th>
                        </tr>
                        {equipmentForRent}
                        </tbody>
                    </table>
                    : <p className={"loaded"}> Loading... </p>}
            </div>
        </div>
    );
}

export default EquipmentForRent;