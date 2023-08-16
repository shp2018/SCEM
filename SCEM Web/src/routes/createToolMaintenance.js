import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import "../css/createToolMaintenance.css";

const CreateToolMaintenance = () => {
    const [equipment, setEquipment] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    // Fetch equipment names from Firestore collection
    const fetchEquipmentNames = async () => {
      const equipmentCollection = collection(firestore, "equipmentManagement");
      const equipmentQuery = query(equipmentCollection);
      const equipmentSnapshot = await getDocs(equipmentQuery);
      const names = equipmentSnapshot.docs.map((doc) => doc.data().equipmentName);
      setEquipmentNames(names);
    };

    fetchEquipmentNames();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const toolAlertsDoc = doc(firestore, "toolMaintenance", name);
    const toolAlertsData = await getDoc(toolAlertsDoc);

    let data = {
      name: name,
      description: description,
      equipment : equipment,
      toDate : toDate,
      fromDate : fromDate,
    };

    if (toolAlertsData.exists()) {
      await updateDoc(toolAlertsDoc, data);
      alert("Existing tool maintenance data has been updated.");
    } else {
      await setDoc(toolAlertsDoc, data);
      alert("New tool maintenance data has been created.");
    }

    window.location.replace("/tool/maintenance");
  };

  

  return (
    <div id={"createToolMaintenance-page"}>
      <div id={"createToolMaintenance-header"}>
        <div id={"createToolMaintenance-backButton"}>
          <a href={"/tool/maintenance"} className={"arrow left"}></a>
        </div>
        <div id={"createToolMaintenance-createToolMaintenanceText"}>
          <h3>Create maintenance schedule</h3>
        </div>
      </div>
      <br />
      <form id="createToolMaintenance-form" onSubmit={handleSave}>
        <div>
          <div id={"createToolMaintenance-inputBoxes"}>
            <label id="createToolMaintenance-Label">Equipment</label>
            <select
  id="createToolMaintenance-Input"
  style={{ width: "330px" }}
  value={equipment} // Bind equipment state variable here
  onChange={(e) => {
    setEquipment(e.target.value);
  }}
>
  <option value="">Select equipment name</option>
  {equipmentNames.map((equipmentName, index) => (
    <option key={index} value={equipmentName}>
      {equipmentName}
    </option>
  ))}
</select>

            <br />

            <label id="createToolMaintenanceLabel">Name</label>
            <input
              id="createToolMaintenance-Input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />

            <label id="createToolMaintenance-Label">Description</label>
            <input
              id="createToolMaintenance-Input"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br/>

            <label id="createToolMaintenance-Label">From Date</label>
            <input
              id="createToolMaintenance-Input"
              type="date"
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
            <br />

            <label id="createToolMaintenance-Label">To Date</label>
            <input
              id="createToolMaintenance-Input"
              type="date"
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
            <br />
           
            

          </div>
        </div>
        <button id="createToolMaintenance-createToolMaintenancebutton" type="submit" onClick={handleSave}>
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateToolMaintenance;