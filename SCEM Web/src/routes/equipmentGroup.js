import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";
import '../css/equipmentGroup.css';

function EquipmentGroup() {
    const [equipments, setEquipments] = useState([]);
    const equipmentRef = collection(firestore, "equipmentGroups");

    async function getLocationData() {
        const equipmentQuery = query(equipmentRef, where("name", "!=", ""));
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
                        {data.name}
                    </td>
                    <td>
                        {data.description}
                    </td>
                    <td id={"equipmentGroup-linkArrowBox"}>
                        <a href={`/`}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to redirect user to item link."}
                                 id={"locationGroup-tableLinkArrow"}></img>
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
        <div id={"equipmentGroup-page"}>
            <div id={"equipmentGroup-header"}>
                <div id={"equipmentGroup-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"equipmentGroup-equipmentGroupText"}>
                    <h3> Equipment Groups </h3>
                </div>
                <a href="/equipmentGroup/create">
                    <img src="/locationAdd.png" id="equipmentGroup-addButton" alt="add equipment button">
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

export default EquipmentGroup;