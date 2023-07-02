import React, {useState, useEffect} from 'react';
import {getDocs, query, collection} from "firebase/firestore";
import '../css/equipmentType.css';
import {firestore} from "../firebase";

const EquipmentType = () => {
    const [equipmentTypesData, setEquipmentTypesData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getEquipmentTypesData = async () => {
        const equipmentTypesCollection = collection(firestore, "equipmentTypes");
        const equipmentTypesQuery = query(equipmentTypesCollection);
        const querySnapshot = getDocs(equipmentTypesQuery);
    }

    useEffect(() => {
        getEquipmentTypesData().then(() => {
            setLoaded(true);
        });
    }, []);

    return (
        <div id={"equipmentType-body"}>
            <div id={"equipmentType-header"}>
                <div id={"equipmentType-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={"equipmentType-titleText"}>Equipment Types</h3>
                <a href={"/equipmentType/create"}>
                    <img src={"/locationAdd.png"} id={"equipmentType-addButton"}
                         alt={"Add equipment type button"}>
                    </img>
                </a>
            </div>
        </div>
    );
}

export default EquipmentType;