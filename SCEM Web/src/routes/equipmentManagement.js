import React, {useEffect, useState} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {auth, firestore} from "../firebase";
import "../css/marketplaceItem.css";
import {onAuthStateChanged} from "firebase/auth";
import "../css/equipmentManagement.css";

function EquipmentManagement() {
    const [equipments, setEquipments] = useState([]);
    const equipmentRef = collection(firestore, "equipmentManagement");

    async function getLocationData() {
        const equipmentQuery = query(equipmentRef, where("equipmentName", "!=", ""));
        const querySnapshot = await getDocs(equipmentQuery);
        setEquipments([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setEquipments(curr => [...curr,
                <tr key={`${doc.id}`}>
                    <td>
                        {}
                    </td>
                    <td>
                        {data.equipmentName}
                    </td>
                    <td>
                        {data.description}
                    </td>
                    <td id={"equipmentManagement-linkArrowBox"}>
                        <a href={`/`}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to redirect user to item link."}
                                 id={"equipmentManagement-tableLinkArrow"}></img>
                        </a>
                    </td>
                </tr>]);
        });
    }

    useEffect(() => {
        getLocationData();
        // eslint-disable-next-line
    }, []);

    return (
        <div id={"equipmentManagement-page"}>
            <div id={"equipmentManagement-header"}>
                <div id={"equipmentManagement-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"equipmentManagement-equipmentManagementText"}>
                    <h3> Equipment Management </h3>
                </div>
                <a href="/equipmentManagement/create">
                    <img src="/locationAdd.png" id="equipmentManagement-addButton" alt="add equipment button">
                    </img>
                </a>
            </div>
            <br></br>
            <table id="equipments">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                {equipments}
            </table>
        </div>
    );

}

export default EquipmentManagement;