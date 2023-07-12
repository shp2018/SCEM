import React, { useState } from "react";
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../css/viewEquipmentList.css";

function ViewEquipmentList() {
  const [equipmentType, setEquipmentType] = useState("");
  const [imei, setImei] = useState("");
  const [site, setSite] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [showNoMatchingEquipments, setShowNoMatchingEquipments] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    // Query the Firestore collection based on equipmentType, imei, and site
    const q = query(
      collection(firestore, "equipmentManagement"),
      where("equipmentType", "==", equipmentType),
      where("imei", "==", imei),
      where("site", "==", site)
    );

    const querySnapshot = await getDocs(q);
    const matchingDocuments = [];
    querySnapshot.forEach((doc) => {
      // Add each matching document to the array
      matchingDocuments.push(doc.data());
    });

    // Update the state with the matching documents
    setEquipmentList(matchingDocuments);
    setShowNoMatchingEquipments(matchingDocuments.length === 0);
  };

  return (
    <div id={"createEquipmentManagement-page"}>
      <div id={"createEquipmentManagement-header"}>
        <div id={"createEquipmentManagement-backButton"}>
          <a href={"/"} className={"arrow left"}></a>
        </div>
        <div id={"createEquipmentManagement-createEquipmentManagementText"}>
          <h3>View Equipment List</h3>
        </div>
      </div>
      <br />
      <form id="createEquipmentManagement-form" onSubmit={handleSave}>
        <div>
          <div id={"createEquipmentManagement-inputBoxes"}>
            <label id="createEquipmentManagement-Label">Equipment type</label>
            <select
              id="createEquipmentManagement-Input"
              style={{ width: "330px" }}
              onChange={(e) => {
                setEquipmentType(e.target.value);
              }}
            >
              <option value="">Select equipment type</option>
              <option value="Bulldozer">Bulldozer</option>
              <option value="Type 2">Type 2</option>
              <option value="GPS">GPS</option>
              <option value="Crane">Crane</option>
              {/* Add more options as needed */}
            </select>
            <br />

            <label id="createEquipmentManagement-Label">IMEI</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setImei(e.target.value);
              }}
            />
            <br />

            <label id="createEquipmentManagement-Label">Site</label>
            <select
              id="createEquipmentManagement-Input"
              style={{ width: "330px" }}
              onChange={(e) => {
                setSite(e.target.value);
              }}
            >
              <option value="">Select site</option>
              <option value="NY">NY</option>
              <option value="Site 2">Site 2</option>
              <option value="Site 3">Site 3</option>
              {/* Add more options as needed */}
            </select>
            <br />

            <button id="createEquipmentManagement-createEquipmentManagementbutton" type="submit">View</button>
          </div>
        </div>
      </form>

      {showNoMatchingEquipments && (
        <div className="system-message">No matching equipments found. Please check the inputs again.</div>
      )}

      {equipmentList.length > 0 && (
        <div>
          <h4>Matching Equipment List</h4>
          <table id={"viewEquipmentList-table"}>
            <thead>
              <tr>
                <th className={"viewEquipmentList-tableHeading"}>#</th>
                <th className={"viewEquipmentList-tableHeading"}>Site</th>
                <th className={"viewEquipmentList-tableHeading"}>Lat</th>
                <th className={"viewEquipmentList-tableHeading"}>Lon</th>
                <th className={"viewEquipmentList-tableHeading"}>Date</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((equipment, index) => (
                <tr key={equipment.id}>
                  <td className={"viewEquipmentList-tableData"}>{index + 1}</td>
                  <td className={"viewEquipmentList-tableData"}>{equipment.site}</td>
                  <td className={"viewEquipmentList-tableData"}>{equipment.latitude}</td>
                  <td className={"viewEquipmentList-tableData"}>{equipment.longitude}</td>
                  <td className={"viewEquipmentList-tableData"}>{equipment.plateDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewEquipmentList;