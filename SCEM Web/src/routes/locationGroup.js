import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";
import '../css/locationGroup.css';

function LocationGroup() {
    const [locations, setLocations] = useState([]);
    const locationref = collection(firestore, "location");

    async function getLocationData() {
        const locationQuery = query(locationref, where("name", "!=", ""));
        const querySnapshot = await getDocs(locationQuery);
        var table = document.getElementById("myTable");
        setLocations([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setLocations(curr => [...curr,

                <tr 
                     key={`${doc.id}`}>
                     <td >
                        {data.name}
                    </td>
                    <td >
                        {data.description}
                    </td>
                
                 
                </tr>]);
        });
    }

    useEffect(() => {
        getLocationData();
        // eslint-disable-next-line
    }, []);

    return (
        <div id={"locationGroup-page"}>
        <div id={"locationGroup-header"}>
            <div id={"locationGroup-backButton"}>
                <a href={"/"}
                   className={"arrow left"}>
                </a>
            </div>
            <div id={"locationGroup-locationGroupText"}>
                <h3> Company Locations </h3>
            </div>
        </div>
        <br></br>
        <a href="/locationGroup/create">
            <img src="/locationAdd.png" id="location-addButton" alt="add location button">
              
            </img>
            </a>

            <table id = "locations">
            <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
                {locations}
            </table>
        

      

        </div>

    );
}

export default LocationGroup;