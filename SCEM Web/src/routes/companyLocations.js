import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";
import {query, where} from "firebase/firestore";
import '../css/locationGroup.css';

function CompanyLocations() {
    const [locations, setLocations] = useState([]);
    const locationref = collection(firestore, "site location");

    async function getLocationData() {
        const locationQuery = query(locationref, where("siteName", "!=", ""));
        const querySnapshot = await getDocs(locationQuery);
        setLocations([]);

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setLocations(curr => [...curr,
                <tr key={`${doc.id}`}>
                    <td>
                        {data.siteName}
                    </td>
                    <td>
                        {data.siteAddress}
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
                <a href="/companyLocation/create">
                    <img src="/locationAdd.png" id="location-addButton" alt="add location button">
                    </img>
                </a>
            </div>
            <br></br>
            <table id="locations">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                {locations}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyLocations;