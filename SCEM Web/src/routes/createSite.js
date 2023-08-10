import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
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
import {onAuthStateChanged} from "firebase/auth";
import {GoogleMap, MarkerF, LoadScript} from "@react-google-maps/api";

const CreateSite = () => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [Name, setName] = useState("");
    const [Address, setAdd] = useState("");
    const [Number, setNum] = useState("");
    const [locationGrp, setLGrp] = useState("");
    const [mapCenter, setMapCenter] = useState({lat: 49.2827, lng: -123.1207});
    const [markerPosition, setMarkerPosition] = useState({
        lat: 49.2827,
        lng: -123.1207,
    });

    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const locationref = collection(firestore, "location");
            const locationQuery = query(locationref, where("name", "!=", ""));

            const querySnapshot = await getDocs(locationQuery);
            const options = [];

            querySnapshot.forEach((doc) => {
                options.push(doc.data().name);
            });

            setDropdownOptions(options);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const checkAuthState = async () => {
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
        };

        checkAuthState();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        const locationGroup = doc(firestore, "site location", Name);
        const locationData = await getDoc(locationGroup);
        console.log(mapCenter);
        let data = {
            siteName: Name,
            siteAddress: Address,
            siteNumber: Number,
            locationGroup: locationGrp,
            userCreated: userName,
            userID: userID,
            lat: mapCenter.lat,
            lon: mapCenter.lng,
        };

        if (locationData.exists()) {
            await updateDoc(locationGroup, data);
            alert("Existing location data has been updated");
        } else {
            await setDoc(locationGroup, data);
            alert("New location data has been created");
        }
    };

    const handleLocationChange = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address: Address}, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
                const latitude = results[0].geometry.location.lat();
                const longitude = results[0].geometry.location.lng();
                setMapCenter({lat: latitude, lng: longitude});
                setMarkerPosition({lat: latitude, lng: longitude});
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    const renderMap = () => {
        return (
            <GoogleMap
                center={mapCenter}
                zoom={12}
                scrollWheelZoom={false}
                mapContainerStyle={{
                    width: "500px",
                    height: "300px",
                    marginBottom: "10px",
                }}
            >
                <MarkerF position={markerPosition}/>
            </GoogleMap>
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
                        <h3> Create Site </h3>
                    </div>
                </div>
                <br/>
                <form id="createLocationGroup-form" onSubmit={handleSave}>
                    <div>
                        <div id={"createLocationGroup-inputBoxes"}>
                            <label id="createLocationGroup-Label">Site Name</label>
                            <input
                                id="createLocationGroup-Input"
                                type="text"
                                placeholder="site name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <br/>

                            <label id="createLocationGroup-Label">Site Address</label>
                            <input
                                id="createLocationGroup-Input"
                                type="text"
                                value={Address}
                                placeholder="site address"
                                onChange={(e) => {
                                    setAdd(e.target.value);
                                }}
                            />
                            <br/>

                            <label id="createLocationGroup-Label">Site Phone Number</label>
                            <input
                                id="createLocationGroup-Input"
                                type="text"
                                placeholder="site phone number"
                                onChange={(e) => {
                                    setNum(e.target.value);
                                }}
                            />
                            <br/>

                            <LoadScript
                                googleMapsApiKey="AIzaSyAXQAd8SIPs1Ikz4j8xjV1ZWc62S6cgjrM"
                                libraries={["places"]}
                            >
                                {renderMap()}
                            </LoadScript>
                            <button
                                id="createLocationGroup-locationChangeButton"
                                type="button"
                                onClick={handleLocationChange}
                            >
                                Update Map
                            </button>
                            <label id="createLocationGroup-Label">Location Group</label>
                            <select
                                id="createLocationGroup-Input"
                                onChange={(e) => {
                                    setLGrp(e.target.value);
                                }}
                            >
                                <option value={""}>Choose a location group...</option>
                                {dropdownOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            id="createLocationGroup-createLocationGroupbutton"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSite;