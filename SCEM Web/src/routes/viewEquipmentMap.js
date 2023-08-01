import React, {useEffect, useState} from "react";
import {firestore} from "../firebase";
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
import "../css/createLocationGroup.css";
import {GoogleMap, MarkerF, LoadScript} from "@react-google-maps/api";

const ViewEquipmentMap = () => {
    const [selectedEquipmentType, setSelectedEquipmentType] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [locationsWithMatchingEquipment, setLocationsWithMatchingEquipment] = useState([]);
    const [EquipTypeDrop, setEqipTypeOptions] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [locationGrp, setLGrp] = useState("");
    const [mapCenter, setMapCenter] = useState({lat: 49.2827, lng: -123.1207});
    const [markerPosition, setMarkerPosition] = useState({
        lat: 49.2827,
        lng: -123.1207,
    });

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
 
    }, []);



    const handleLocationChange = async () => {
        if (!selectedEquipmentType || !selectedSite) {
          return;
        }
      
        const equipmentManagementRef = collection(firestore, "equipmentManagement");
        const equipmentQuery = query(
          equipmentManagementRef,
          where("equipmentType", "==", selectedEquipmentType),
          where("site", "==", selectedSite)
        );
      
        const equipquerySnapshot = await getDocs(equipmentQuery);
        const matchingLocations = [];
      
        equipquerySnapshot.forEach((doc) => {
          const { latitude, longitude } = doc.data();
          const parsedLatitude = parseFloat(latitude);
          const parsedLongitude = parseFloat(longitude);
          if (!isNaN(parsedLatitude) && !isNaN(parsedLongitude)) {
            matchingLocations.push({ lat: parsedLatitude, lng: parsedLongitude });
          }
        });
      
        setLocationsWithMatchingEquipment(matchingLocations);
        if (matchingLocations.length > 0) {
            const sumLat = matchingLocations.reduce((acc, location) => acc + location.lat, 0);
            const sumLng = matchingLocations.reduce((acc, location) => acc + location.lng, 0);
            const avgLat = sumLat / matchingLocations.length;
            const avgLng = sumLng / matchingLocations.length;
        
            setMapCenter({ lat: avgLat, lng: avgLng });
          } else {
            
            setMapCenter({ lat: 49.2827, lng: -123.1207 });
          }
      };

      const renderMap = () => {
        return (
            <div id="map-container">
          <GoogleMap
            key={JSON.stringify(locationsWithMatchingEquipment)} // Add this key attribute
            center={mapCenter}
            zoom={10}
            scrollWheelZoom={false}
            mapContainerStyle={{
              width: "500px",
              height: "300px",
              marginBottom: "10px",
              alignItems:"center",
              
            }}
          >
            {locationsWithMatchingEquipment.map((location, index) => (
              <MarkerF key={index} position={location} />
            ))}
          </GoogleMap>
          </div>
        );
      };
  
      
      
      
      

    return (
        <div>
            <div id={"createLocationGroup-page"}>
                <div id={"createLocationGroup-header"}>
                    <div id={"createLocationGroup-backButton"}>
                        <a href={"/"} className={"arrow left"}></a>
                    </div>
                    <div id={"createLocationGroup-createLocationGroupText"}>
                        <h3> View Equipment Map </h3>
                    </div>
                </div>
                <br/>
                <form id="createLocationGroup-form">
                    <div>
                        <div id={"createLocationGroup-inputBoxes"}>
                            <label id="createLocationGroup-Label">Equipment Type</label>
                            <select
                  id="createLocationGroup-Input"
                  onChange={(e) => setSelectedEquipmentType(e.target.value)}
                 >
                <option value={""}>Choose a Equipment Type...</option>
                    {EquipTypeDrop.map((option) => (
                    <option key={option} value={option}>
                      {option}
                </option>
                                ))}
              </select>
              <br />

                            <label id="createLocationGroup-Label">IMEI</label>
                            <input
                                id="createLocationGroup-Input"
                                type="text"
                               
                                placeholder="IMEI"
                             
                            />
                            <br/>

                           
                           
                            <label id="createLocationGroup-Label">Site</label>
                            <select
                                id="createLocationGroup-Input"
                                onChange={(e) => setSelectedSite(e.target.value)}
                               
                            >
                                <option value={""}>Choose a Site...</option>
                                {dropdownOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            id="createLocationGroup-createLocationGroupbutton"
                            type="button"
                            onClick={handleLocationChange}
                        >
                            View
                        </button>
                    </div>
                
                </form>
                <LoadScript
                                googleMapsApiKey="AIzaSyAXQAd8SIPs1Ikz4j8xjV1ZWc62S6cgjrM"
                                libraries={["places"]}
                            >
                                {renderMap()}
                            </LoadScript>
                
            </div>
        </div>
    );
}

export default ViewEquipmentMap;