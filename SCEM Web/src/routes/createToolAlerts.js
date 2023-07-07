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
import "../css/createToolAlerts.css";
import { onAuthStateChanged } from "firebase/auth";

function CreateToolAlerts() {
  const [equipment, setEquipment] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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

    const toolAlertsDoc = doc(firestore, "toolAlerts", name);
    const toolAlertsData = await getDoc(toolAlertsDoc);

    let data = {
      name: name,
      description: description,
      equipment : equipment,
      active : isButtonClicked,
    };

    if (toolAlertsData.exists()) {
      await updateDoc(toolAlertsDoc, data);
      alert("Existing tool alerts data has been updated.");
    } else {
      await setDoc(toolAlertsDoc, data);
      alert("New tool alerts data has been created.");
    }

    window.location.replace("/toolAlerts");
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div id={"createToolAlerts-page"}>
      <div id={"createToolAlerts-header"}>
        <div id={"createToolAlerts-backButton"}>
          <a href={"/toolAlerts"} className={"arrow left"}></a>
        </div>
        <div id={"createToolAlerts-createToolAlertsText"}>
          <h3>Create Alert</h3>
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
           
            <p>Set Alert Active Status</p>
            <button
  onClick={handleButtonClick}
  className={isButtonClicked ? "activeButton" : "inactiveButton"}
>
  {isButtonClicked ? "On" : "Off"}
</button>

          </div>
        </div>
        <button id="createToolAlerts-createToolAlertsbutton" type="submit" onClick={handleSave}>
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateToolAlerts;
