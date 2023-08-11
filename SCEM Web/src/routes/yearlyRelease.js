import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { query, where } from "firebase/firestore";
import '../css/locationGroup.css';

function YearlyRelease() {
   
    const [name, setName] = useState([]);
    const [model, setModel] = useState([]);
    const [yearly, setYearly] = useState([]);
    const [filteredYearly, setFilteredYearly] = useState([]);
    const yearlyref = collection(firestore, "yearlyRelease");

    async function getYearlyData() {
        const yearlyQuery = query(yearlyref, where("name", "!=", ""));
        const querySnapshot = await getDocs(yearlyQuery);
        var table = document.getElementById("myTable");
        setYearly([]);
        const newData = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            newData.push(
                <tr key={doc.id}>
                    <td></td>
                    <td>{data.model}</td>
                    <td>{data.name}</td>
                    <td>{data.year}</td>
                    <td>{data.modelCode}</td>
                </tr>
            );
            setYearly(newData);
        });
    }
    async function filterData() {
        let filteredyearlyQuery = yearlyref;

        if (name !== "") {
            filteredyearlyQuery = query(filteredyearlyQuery, where("name", "==", name));
        }
        if (model !== "") {
            filteredyearlyQuery = query(filteredyearlyQuery, where("model", "==", model));
        }

        const fquerySnapshot = await getDocs(filteredyearlyQuery);
        const filteredData = [];
        fquerySnapshot.forEach((doc) => {
            let data = doc.data();
            filteredData.push(
                <tr key={doc.id}>
                    <td></td>
                    <td>{data.model}</td>
                    <td>{data.name}</td>
                    <td>{data.year}</td>
                    <td>{data.modelCode}</td>
                </tr>
            );
            setFilteredYearly(filteredData);
        });
        console.log(filteredData)
    }

    useEffect(() => {
      
        getYearlyData();
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
                    <h3> Yearly Release </h3>
                    <a href="/yearlyRelease/create">
                        +
                    </a>
                </div>
            </div>

            <br></br>

            <div id={"createLocationGroup-inputBoxes"}>
                <label id="createLocationGroup-Label">Name</label>
                <input id="createLocationGroup-Input" type="text" placeholder = "Name"onChange={(e) => {
                    setName(e.target.value)
                }}></input>
                <label id="createLocationGroup-Label">Model</label>
                <select id="createLocationGroup-Input"
                    onChange={(e) => {
                        setModel(e.target.value);
                    }}
                >
                    <option value="">Select a Model</option>
                    <option value="Model 1">Model 1</option>
                    <option value="Model 2">Model 2</option>
                    <option value="Model 3">Model 3</option>
              
                </select>
                <button id="createYearly-createYearlybutton" type="button" onClick={filterData}>
                        Search
                    </button>
             
                <br></br>
            </div>

            <table id="locations">
                <tr>
                    <th>#</th>
                    <th>Model</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Model Code</th>
                </tr>
                {filteredYearly.length > 0 ? filteredYearly : yearly}
            </table>




        </div>

    );
}

export default YearlyRelease;