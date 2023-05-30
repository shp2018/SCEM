import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const MarketplaceItem = () => {
  const location = useLocation();
  const [itemData, setItemData] = useState(null); // State to store the retrieved document data

  useEffect(() => {
    const path = location.pathname;
    const getData = async () => {
      try {
        const docRef = doc(firestore, "marketplace", path.slice(12));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data);
          setItemData(data); // Update the state with the retrieved document data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    };

    getData();
  }, [location]);

  return (
    <div>
      {itemData ? (
        <>
          <h2>Name: {itemData.name}</h2>
          <p>Description: {itemData.description}</p>
          <p>Date Created: {itemData.dateCreated}</p>
          <p>Equipment Type: {itemData.equipmentType}</p>
          <p>Site: {itemData.site}</p>
          <p>Time Created: {itemData.timeCreated}</p>
          <p>To Date: {itemData.toDate}</p>
          <p>User Created: {itemData.userCreated}</p>
          {/* Render other properties as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MarketplaceItem;
