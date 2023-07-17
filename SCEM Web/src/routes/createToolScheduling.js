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
import "../css/createToolScheduling.css";
import { onAuthStateChanged } from "firebase/auth";

function CreateToolScheduling() {
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

    const toolSchedulingDoc = doc(firestore, "toolScheduling", name);
    const toolSchedulingData = await getDoc(toolSchedulingDoc);

    let data = {
      name: name,
      description: description,
      equipment : equipment,
      toDate : toDate,
      fromDate : fromDate,
    };

    if (toolSchedulingData.exists()) {
      await updateDoc(toolSchedulingDoc, data);
      alert("Existing tool scheduling data has been updated.");
    } else {
      await setDoc(toolSchedulingDoc, data);
      alert("New tool scheduling has been created.");
    }

    window.location.replace("/toolScheduling");
  };

  

  return (
    <div id={"createToolScheduling-page"}>
      <div id={"createToolScheduling-header"}>
        <div id={"createToolScheduling-backButton"}>
          <a href={"/toolScheduling"} className={"arrow left"}></a>
        </div>
        <div id={"createToolScheduling-createToolSchedulingText"}>
          <h3>Create schedule</h3>
        </div>
      </div>
      <br />
      <form id="createToolScheduling-form" onSubmit={handleSave}>
        <div>
          <div id={"createToolScheduling-inputBoxes"}>
            <label id="createToolScheduling-Label">Equipment</label>
            <select
  id="createToolScheduling-Input"
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

            <label id="createToolSchedulingLabel">Name</label>
            <input
              id="createToolScheduling-Input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />

            <label id="createToolScheduling-Label">Description</label>
            <input
              id="createToolScheduling-Input"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br/>

            <label id="createToolScheduling-Label">From Date</label>
            <input
              id="createToolScheduling-Input"
              type="date"
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
            <br />

            <label id="createToolScheduling-Label">To Date</label>
            <input
              id="createToolScheduling-Input"
              type="date"
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
            <br />
           
            

          </div>
        </div>
        <button id="createToolScheduling-createToolSchedulingbutton" type="submit" onClick={handleSave}>
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateToolScheduling;

