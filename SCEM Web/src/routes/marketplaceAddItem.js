import React, { useRef,useState} from "react";
import {firestore} from "../firebase";
import { doc, setDoc , addDoc , collection } from "@firebase/firestore";
import {query, where} from "firebase/firestore";
import '../css/marketplaceAddItem.css';

function MarketplaceAddItem() {
  const [name, setName] = useState("");
  const [equipmenttype, setEquipmentType] = useState("");
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  
  



  
  const handleSave = async(e) => {
    e.preventDefault();
      const ref = collection(firestore,"marketplace");
      let data = {
        name:name,
        equipmenttype:equipmenttype,
        site:site,
        description:description,
        fromdate:fromdate,
        todate:todate
      }
      try {
        addDoc(ref,data)
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
        <form id = "marketplaceAddItem-form" onSubmit = {handleSave}>
            <div>
            <div id={"marketplaceAddItem-inputBoxes"}>
            <label id= "marketplaceAddItem-LabelName">Name</label>
            <input id="marketplaceAddItem-InputName" type="text" placeholder="Name" onChange = {(e) => {setName(e.target.value)}} ></input><br></br>
            <label id= "marketplaceAddItem-LabelEquipmentType">Equipment type</label>
            <input id="marketplaceAddItem-InputEquipmentType" type="text" placeholder="Equipment type" onChange = {(e) => {setEquipmentType(e.target.value)}}></input><br></br>
            <label id= "marketplaceAddItem-LabelSite">Site</label>
            <input id="marketplaceAddItem-InputSite" type="text" placeholder="Site" onChange = {(e) => {setSite(e.target.value)}} ></input><br></br>
            <label id= "marketplaceAddItem-LabelDescription">Description</label>
            <input id="marketplaceAddItem-InputDescription" type="text" placeholder="Description" onChange = {(e) => {setDescription(e.target.value)}} ></input><br></br>
            <label id= "marketplaceAddItem-LabelFromDate">From Date</label><br></br>
            <input id="marketplaceAddItem-InputFromDate" type="date" placeholder="From date" onChange = {(e) => {setFromDate(e.target.value)}}></input><br></br>
            <br></br>
            <label id= "marketplaceAddItem-LabelToDate">To Date</label><br></br>
            <input id="marketplaceAddItem-InputToDate" type="date" placeholder="To date" onChange = {(e) => {setToDate(e.target.value)}} ></input><br></br>
            
            </div>
            <button id="marketplaceAddItem-marketplaceAddItembutton" type="submit">Add Item</button>
           
            </div>


        </form>
        </div>
        </body>

    );

}
export default MarketplaceAddItem;