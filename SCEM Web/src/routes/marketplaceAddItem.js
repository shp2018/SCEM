import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import '../css/marketplaceAddItem.css';
import {onAuthStateChanged} from "firebase/auth";

function MarketplaceAddItem() {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");

    const month = () => {
        const monthOutput = new Date().getMonth() + 1
        if (monthOutput < 10) {
            return "" + 0 + monthOutput;
        } else {
            return monthOutput;
        }
    }

    const time = () => {
        const hoursOutput = new Date().getHours();
        const minutesOutput = new Date().getMinutes();
        if (hoursOutput < 10) {
            if (minutesOutput < 10) {
                return "" + "0" + hoursOutput + ":" + "0" + minutesOutput;
            } else {
                return "" + "0" + hoursOutput + ":" + minutesOutput;
            }
        } else {
            if (minutesOutput < 10) {
                return "" + hoursOutput + ":" + "0" + minutesOutput;
            } else {
                return "" + hoursOutput + ":" + minutesOutput;
            }
        }
    }

    const date = "" + (new Date().getFullYear()) + "-" + month() + "-" + (new Date().getDate());

    useEffect(() => {
        checkAuthState();
    }, []);

    async function checkAuthState() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthState(true);
                const ref = collection(firestore, "users");
                const q = query(ref, where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (!userName) setUserName(doc.data().fullname);
                });
            }
        })
    }

    const handleSave = async (e) => {
        e.preventDefault();

        if (!authState) {
            alert("Please login first.");
            return;
        }

        const ref = collection(firestore, "marketplace");

        let data = {
            name: name,
            equipmentType: equipmentType,
            site: site,
            description: description,
            fromDate: fromDate,
            toDate: toDate,
            userCreated: userName,
            dateCreated: date,
            timeCreated: time(),
        };
        try {
            await addDoc(ref, data);
            alert("Success!");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <body>
        <div id={"marketplaceAddItem-page"}>
            <div id={"marketplaceAddItem-header"}>
                <div id={"marketplaceAddItem-backButton"}>
                    <a href={"/marketplace"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"marketplaceAddItem-marketplaceAddItemText"}>
                    <h3> Add Item </h3>
                </div>
            </div>
            <br></br>
            <form id="marketplaceAddItem-form" onSubmit={handleSave}>
                <div>
                    <div id={"marketplaceAddItem-inputBoxes"}>
                        <label id="marketplaceAddItem-LabelName">Name</label>
                        <input id="marketplaceAddItem-InputName" type="text" placeholder="Name" onChange={(e) => {
                            setName(e.target.value)
                        }}></input><br></br>
                        <label id="marketplaceAddItem-LabelEquipmentType">Equipment type</label>
                        <input id="marketplaceAddItem-InputEquipmentType" type="text" placeholder="Equipment type"
                               onChange={(e) => {
                                   setEquipmentType(e.target.value)
                               }}></input><br></br>
                        <label id="marketplaceAddItem-LabelSite">Site</label>
                        <input id="marketplaceAddItem-InputSite" type="text" placeholder="Site" onChange={(e) => {
                            setSite(e.target.value)
                        }}></input><br></br>
                        <label id="marketplaceAddItem-LabelDescription">Description</label>
                        <input id="marketplaceAddItem-InputDescription" type="text" placeholder="Description"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}></input><br></br>
                        <label id="marketplaceAddItem-LabelFromDate">From Date</label><br></br>
                        <input id="marketplaceAddItem-InputFromDate" type="date" placeholder="From date"
                               onChange={(e) => {
                                   setFromDate(e.target.value)
                               }}></input><br></br>
                        <br></br>
                        <label id="marketplaceAddItem-LabelToDate">To Date</label><br></br>
                        <input id="marketplaceAddItem-InputToDate" type="date" placeholder="To date" onChange={(e) => {
                            setToDate(e.target.value)
                        }}></input><br></br>
                    </div>
                    <button id="marketplaceAddItem-marketplaceAddItembutton" type="submit">Add Item</button>
                </div>
            </form>
        </div>
        </body>
    );
}

export default MarketplaceAddItem;