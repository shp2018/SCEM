import React, {useState, useEffect} from 'react';
import {getDocs, query, collection} from "firebase/firestore";
import '../css/equipmentType.css';
import {firestore} from "../firebase";

const EquipmentType = () => {
    const [equipmentTypesData, setEquipmentTypesData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const dropdown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    window.onclick = (event) => {
        if (event.target.matches('.equipmentType-dropdownButton')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i].classList.contains('show')) {
                    dropdowns[i].classList.remove('show');
                }
            }
        }
    }

    // TODO: these 2 functions
    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    const getEquipmentTypesData = async () => {
        const equipmentTypesCollection = collection(firestore, "equipmentTypes");
        const equipmentTypesQuery = query(equipmentTypesCollection);
        const querySnapshot = await getDocs(equipmentTypesQuery);
        setEquipmentTypesData([]);

        querySnapshot.forEach( doc => {
            let data = doc.data();
            setEquipmentTypesData(curr => [...curr, <tr key={doc.id}>
                <td className={"equipmentType-tableElement"}>{}</td>
                <td className={"equipmentType-tableElement"}>{data.name}</td>
                <td className={"equipmentType-tableElement"}>{data.description}</td>
                <td className={"equipmentType-tableElement"}>
                    <div className={"equipmentType-dropdownDiv"}>
                        <button onClick={dropdown} className={"equipmentType-dropdownButton"}
                                id={"equipmentType-dropdownButtonID"}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to create dropdown menu."}
                                 id={"equipmentType-tableLinkArrow"}>
                            </img>
                        </button>
                        <div id={"myDropdown"} className={"dropdown-content"}>
                            <a className={"equipmentType-dropdownButton"} onClick={handleEdit}>Edit</a>
                            <a className={"equipmentType-dropdownButton"} onClick={handleDelete}>Delete</a>
                            <button className={"equipmentType-dropdownButton"}
                                    id={"equipmentType-dropdownCancel"}>Cancel
                            </button>
                        </div>
                    </div>
                </td>
            </tr>]);
        });
    }

    useEffect(() => {
        getEquipmentTypesData().then(() => {
            setLoaded(true);
        });
        // eslint-disable-next-line
    }, []);

    return (<div id={"equipmentType-body"}>
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

        {loaded ? <div id={"equipmentType-data"}>
            <table className={"equipmentType-tableElement"} id={"equipmentType-table"}>
                <tbody>
                <tr>
                    <th className={"equipmentType-tableHeading"}>#</th>
                    <th className={"equipmentType-tableHeading"}>Name</th>
                    <th className={"equipmentType-tableHeading"}>Description</th>
                    <th className={"equipmentType-tableHeading"}></th>
                </tr>
                {equipmentTypesData}
                </tbody>
            </table>
        </div> : <p className={"loading"}>Loading...</p>}
    </div>);
}

export default EquipmentType;