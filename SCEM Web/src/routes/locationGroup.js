import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";
import '../css/locationGroup.css';

function LocationGroup() {
    const [locations, setLocations] = useState([]);
    const locationRef = collection(firestore, "location");

    async function getLocationData() {
        const locationQuery = query(locationRef, where("name", "!=", ""));
        const querySnapshot = await getDocs(locationQuery);
        setLocations([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setLocations(curr => [...curr,
                <tr key={`${doc.id}`}>
                    <td>
                        {}
                    </td>
                    <td>
                        {data.name}
                    </td>
                    <td>
                        {data.description}
                    </td>
                    <td id={"locationGroup-linkArrowBox"}>
                        <a href={`/`}>
                            <img src={"/triangle-right.svg"} alt={"Right arrow used to redirect user to item link."}
                                 id={"locationGroup-tableLinkArrow"}></img>
                        </a>
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
                <a href="/locationGroup/create">
                    <img src="/locationAdd.png" id="location-addButton" alt="add location button">
                    </img>
                </a>
            </div>
            <br></br>
            <table id="locations">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                {locations}
            </table>
        </div>
    );
}

export default LocationGroup;