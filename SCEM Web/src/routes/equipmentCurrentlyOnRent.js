import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";
import "../css/marketplaceItem.css";
import { onAuthStateChanged } from "firebase/auth";
import "../css/equipmentCurrentlyOnRent.css";

function EquipmentCurrentlyOnRent() {
  const location = useLocation();
  const [itemData, setItemData] = useState(null);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [authState, setAuthState] = useState(false);

  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const marketplaceRef = collection(firestore, "marketplace");

  useEffect(() => {
    const checkAuthState = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserID(user.uid);
          setAuthState(true);
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
    };

    checkAuthState();
  }, [userName]);

  useEffect(() => {
    if (userID) {
      getMarketplaceData();
    }
  }, [userID]);

  async function getMarketplaceData() {
    const marketplaceQuery = query(marketplaceRef, where("onRentID", "==", userID));
    const querySnapshot = await getDocs(marketplaceQuery);
    
    const items = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
  
      return (
        <tr key={doc.id}>
          <td></td>
          <td>{data.name}</td>
          <td>{data.dailyPrice}$</td>
          <td>{data.onRentName}</td>
          <td>
            <button
              className="triangle-button"
              onClick={() => handleRedirectToDetails(doc.id)}
            >
            </button>
          </td>
        </tr>
      );
    });
  
    setMarketplaceItems(items);
  }
  
  
  
  

  useEffect(() => {
    getMarketplaceData();
    // eslint-disable-next-line
  }, []);

  const handleRedirectToDetails = (docId) => {
    const url = `http://localhost:3000/marketplace/${docId}`;
    window.location.href = url;
  };

  return (
    <body id="equipmentCurrentlyOnRent-body">
      <div id="blueBox">
        <h1>Equipment currently on rent</h1>
      </div>
      {marketplaceItems.length > 0 ? (
        <table id="marketplaceTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Renter</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{marketplaceItems}</tbody>
        </table>
      ) : (
        <p>No items currently on rent.</p>
      )}
    </body>
  );
}

export default EquipmentCurrentlyOnRent;
