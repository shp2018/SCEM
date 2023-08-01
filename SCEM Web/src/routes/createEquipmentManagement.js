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
import "../css/createEquipmentManagement.css";
import { onAuthStateChanged } from "firebase/auth";

function CreateEquipmentManagement() {
  const [equipmentName, setEquipmentName] = useState("");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState(null);
  const [imei, setImei] = useState("");
  const [imeiExists, setImeiExists] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [equipmentModel, setEquipmentModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [plateDate, setPlateDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [weight, setWeight] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipmentGroup, setEquipmentGroup] = useState("");
  const [equipmentGroupNames, setEquipmentGroupNames] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [site, setSite] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [EquipTypeDrop, setEqipTypeOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const locationref = collection(firestore, "location");
        const locationQuery = query(locationref, where("name", "!=", ""));

        const equipref = collection(firestore, "equipmentTypes");
        const equiptypeQuery = query(equipref, where("name", "!=", ""));


        const querySnapshot = await getDocs(locationQuery);
        const equipQuery =  await getDocs(equiptypeQuery);
        const options = [];
        const equipmentTypes = []

        querySnapshot.forEach((doc) => {
            options.push(doc.data().name);
        });

        equipQuery.forEach((equip)=>{
          equipmentTypes.push(equip.data().name);
        })

        setDropdownOptions(options);
        setEqipTypeOptions(equipmentTypes)
    };

    fetchData();
    checkAuthState();
    fetchEquipmentGroupNames();
}, []);

  async function checkAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserID(user.uid);
        const ref = collection(firestore, "users");
        const q = query(ref, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (!userName) {
            setUserName(doc.data().fullname);
          }
        });
      }
    });
  }

 

  const fetchEquipmentGroupNames = async () => {
    const equipmentGroupsRef = collection(firestore, "equipmentGroups");
    const querySnapshot = await getDocs(equipmentGroupsRef);
    const names = querySnapshot.docs.map((doc) => doc.id);
    setEquipmentGroupNames(names);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const equipmentManagementDoc = doc(firestore, "equipmentManagement", equipmentName);
    const equipmentManagementData = await getDoc(equipmentManagementDoc);

    let data = {
      equipmentName: equipmentName,
      description: description,
      userCreated: userName,
      userID: userID,
      imei: imei,
      secretCode: secretCode,
      equipmentModel: equipmentModel,
      manufacturer: manufacturer,
      chassisNumber: chassisNumber,
      plateNumber: plateNumber,
      plateDate: plateDate,
      purchasePrice: purchasePrice,
      equipmentType: equipmentType,
      weight: weight,
      capacity: capacity,
      equipmentGroup :equipmentGroup,
      latitude : latitude,
      longitude : longitude,
      site : site,
    };

    if (equipmentManagementData.exists()) {
      await updateDoc(equipmentManagementDoc, data);
      alert("Existing equipment management data has been updated.");
    } else {
      await setDoc(equipmentManagementDoc, data);
      alert("New equipment management data has been created.");
    }

    window.location.replace("/equipmentManagement");
  };

  const handleCheckImei = async (e) => {
    e.preventDefault();

    const equipmentManagementRef = collection(firestore, "equipmentManagement");
    const q = query(equipmentManagementRef, where("imei", "==", imei));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setImeiExists(true);
      alert("This IMEI already exists. Please choose a new one.");
    } else {
      setImeiExists(false);
      alert("IMEI does not exist. You can create a new one for this IMEI.");
    }
  };

  return (
    <div id={"createEquipmentManagement-page"}>
      <div id={"createEquipmentManagement-header"}>
        <div id={"createEquipmentManagement-backButton"}>
          <a href={"/equipmentManagement"} className={"arrow left"}></a>
        </div>
        <div id={"createEquipmentManagement-createEquipmentManagementText"}>
          <h3>Claim ownership by IMEI</h3>
        </div>
      </div>
      <br />
      <form id="createEquipmentManagement-form" onSubmit={handleSave}>
        <div>
          <div id={"createEquipmentManagement-inputBoxes"}>
            <label id="createEquipmentManagement-Label">Description</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">IMEI</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setImei(e.target.value);
              }}
            ></input>
            <button
              id="createEquipmentManagement-CheckImeiButton"
              onClick={handleCheckImei}
            >
              Check
            </button>
            <br />

            <label id="createEquipmentManagement-Label">Secret code</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setSecretCode(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Equipment name</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setEquipmentName(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Equipment model</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setEquipmentModel(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Manufacturer</label>
            <select
              id="createEquipmentManagement-Input"
              style={{ width: "330px" }}
              onChange={(e) => {
                setManufacturer(e.target.value);
              }}
            >
              <option value="">Select manufacturer</option>
              <option value="Manufacturer 1">Manufacturer 1</option>
              <option value="Manufacturer 2">Manufacturer 2</option>
              <option value="Manufacturer 3">Manufacturer 3</option>
              {/* Add more options as needed */}
            </select>
            <br />

            <label id="createEquipmentManagement-Label">Chassis number</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setChassisNumber(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Plate number</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setPlateNumber(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Plate date</label>
            <input
              id="createEquipmentManagement-Input"
              type="date"
              onChange={(e) => {
                setPlateDate(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Purchase price</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setPurchasePrice(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Equipment type</label>
          
           
            <select
                id="createEquipmentManagement-Input"
                  onChange={(e) => {
                    setEquipmentType(e.target.value);
                  }}>
                <option value={""}>Choose a Equipment Type...</option>
                    {EquipTypeDrop.map((option) => (
                    <option key={option} value={option}>
                      {option}
                </option>
                                ))}
              </select>
              <br />
            <label id="createEquipmentManagement-Label">Weight</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Capacity</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Equipment group</label>
            <select
              id="createEquipmentManagement-Input"
              style={{ width: "330px" }}
              onChange={(e) => {
                setEquipmentGroup(e.target.value);
              }}
            >
              <option value="">Select equipment group</option>
              {equipmentGroupNames.map((groupName) => (
                <option key={groupName} value={groupName}>
                  {groupName}
                </option>
              ))}
            </select>
            <br />

            <label id="createEquipmentManagement-Label">Latitude</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setLatitude(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Longitude</label>
            <input
              id="createEquipmentManagement-Input"
              type="text"
              onChange={(e) => {
                setLongitude(e.target.value);
              }}
            ></input>
            <br />

            <label id="createEquipmentManagement-Label">Site</label>
            <select
                id="createEquipmentManagement-Input"
                  onChange={(e) => {
                      setSite(e.target.value);
                  }}>
                <option value={""}>Choose a Site...</option>
                    {dropdownOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                </option>
                                ))}
              </select>
            <br />
          </div>
        </div>
     
        <button
          id="createEquipmentManagement-createEquipmentManagementbutton"
          type="submit"
          onClick={handleSave}
          disabled={imeiExists}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateEquipmentManagement;
