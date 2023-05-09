import React, {useState} from "react";
import { createElement } from 'react';
import {doc, collection,getDocs} from "@firebase/firestore";
import {firestore} from "../firebase";

const db = firestore
const colRef = collection(db, "marketplaceEquipment");





function Marketplace() {

    const getData= async ()=>{
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach(doc => {
        let data = doc.data()
      
        

})


    }


    
    return (
        
<div id="marketplace">
  
    
 
</div>
   
        
       
    );
}

export default Marketplace;