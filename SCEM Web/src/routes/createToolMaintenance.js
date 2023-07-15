import React, { useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import "../css/createToolMaintenance.css";
import { onAuthStateChanged } from "firebase/auth";

function CreateToolMaintenance() {
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
      alert("New tool alerts maintenance has been created.");
    }

    window.location.replace("/toolMaintenance");
  };

  

  return (
    <div id={"createToolAlerts-page"}>
      <div id={"createToolAlerts-header"}>
        <div id={"createToolAlerts-backButton"}>
          <a href={"/toolMaintenance"} className={"arrow left"}></a>
        </div>
        <div id={"createToolAlerts-createToolAlertsText"}>
          <h3>Create maintenance schedule</h3>
        </div>
      </div>
      <br />
      <form id="createToolAlerts-form" onSubmit={handleSave}>
        <div>
          <div id={"createToolAlerts-inputBoxes"}>
            <label id="createToolAlerts-Label">Equipment</label>
            <select
  id="createToolAlerts-Input"
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

            <label id="createToolAlerts-Label">Name</label>
            <input
              id="createToolAlerts-Input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />

            <label id="createToolAlerts-Label">Description</label>
            <input
              id="createToolAlerts-Input"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br/>

            <label id="createToolAlerts-Label">From Date</label>
            <input
              id="createToolAlerts-Input"
              type="date"
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
            <br />

            <label id="createToolAlerts-Label">To Date</label>
            <input
              id="createToolAlerts-Input"
              type="date"
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
            <br />
           
            

          </div>
        </div>
        <button id="createToolAlerts-createToolAlertsbutton" type="submit" onClick={handleSave}>
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateToolMaintenance;

