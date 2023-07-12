import React, {useState, useEffect} from 'react';
import {getDocs, query, collection, doc, deleteDoc, updateDoc} from "firebase/firestore";
import '../css/equipmentType.css';
import {firestore} from "../firebase";

const EquipmentType = () => {
    const [equipmentTypesData, setEquipmentTypesData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [editing, setEditing] = useState([]);

    const handleEdit = idx => {
        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return true;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleSave = async (idx, id) => {
        // get value from editing table data value
        const name = document.getElementById(`equipmentType-${id}name`).innerText;
        const description = document.getElementById(`equipmentType-${id}description`).innerText;

        // update database doc
        await updateDoc(doc(firestore, "equipmentTypes", id), {
            name: name,
            description: description,
        });

        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return false;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleDelete = async id => {
        setEquipmentTypesData(equipmentTypesData.filter(equipmentTypesData => equipmentTypesData.id !== id));
        await deleteDoc(doc(firestore, "equipmentTypes", id));
    }

    const getEquipmentTypesData = async () => {
        const equipmentTypesCollection = collection(firestore, "equipmentTypes");
        const equipmentTypesQuery = query(equipmentTypesCollection);
        const querySnapshot = await getDocs(equipmentTypesQuery);
        setEquipmentTypesData([]);
        setEditing(Array(querySnapshot.size).fill(false));

        querySnapshot.forEach(doc => {
            let data = doc.data();
            setEquipmentTypesData(curr => [...curr, {
                id: doc.id,
                name: data.name,
                description: data.description,
            }]);
        });
    }

    useEffect(() => {
        setEquipmentTypesData([]);
        getEquipmentTypesData().then(() => {
            setLoaded(true);
        });
    }, [loaded]);

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
                {equipmentTypesData.map((equipmentType, index) =>
                    <tr key={equipmentType.id}>
                        <td className={"equipmentType-tableElement"}>{index + 1}</td>
                        <td className={"equipmentType-tableElement"} contentEditable={editing[index]}
                            suppressContentEditableWarning={true}
                            id={`equipmentType-${equipmentType.id}name`}>{equipmentType.name}</td>
                        <td className={"equipmentType-tableElement"} contentEditable={editing[index]}
                            suppressContentEditableWarning={true}
                            id={`equipmentType-${equipmentType.id}description`}>{equipmentType.description}</td>
                        <td className={"equipmentType-tableElement"}>
                            <div id={"equipmentType-dropdown"}>
                                <button id={"equipmentType-tableArrowButton"}>
                                    <img src={"/triangle-right.svg"}
                                         alt={"Right arrow used to create dropdown menu."}
                                         id={"equipmentType-tableArrow"}/>
                                </button>
                                <div id={"equipmentType-dropdownMenu"}>
                                    {editing[index] ?
                                        <button onClick={() => handleSave(index, equipmentType.id)}
                                                className={"equipmentType-dropdownButton"}>Save</button>
                                        : <button onClick={() => handleEdit(index)}
                                                  className={"equipmentType-dropdownButton"}>Edit</button>}
                                    <button onClick={() => handleDelete(equipmentType.id)}
                                            className={"equipmentType-dropdownButton"}>Delete</button>
                                </div>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div> : <p className={"loading"}>Loading...</p>}
    </div>);
}

export default EquipmentType;