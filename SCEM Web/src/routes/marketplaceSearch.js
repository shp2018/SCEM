import React, {useState} from "react";
import '../css/marketplaceSearch.css';

function MarketplaceSearch() {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    function setState() {
        setName(document.getElementById("marketplaceSearch-nameInput").value);
        setEquipmentType(document.getElementById("marketplaceSearch-equipmentTypeInput").value);
        setSite(document.getElementById("marketplaceSearch-siteInput").value);
        setDescription(document.getElementById("marketplaceSearch-descriptionInput").value);
        setFromDate(document.getElementById("marketplaceSearch-fromDateInput").value);
        setToDate(document.getElementById("marketplaceSearch-toDateInput").value);
    }

    const search = e => {
        e.preventDefault();


    }

    return (
        <div id={"marketplaceSearch-page"}>
            <div id={"marketplaceSearch-header"}>
                <a href="/marketplace" id="marketplaceSearch-backButton" className="arrow left"></a>
                <h3 id={"marketplaceSearch-title"}> Search </h3>
            </div>

            <form onSubmit={search}>
                <div id={"marketplaceSearch-inputName"}>
                    <p id={"marketplaceSearch-subtitles"}> Name </p>
                    <input type={"text"} id={"marketplaceSearch-nameInput"}/>
                </div>
                <div id={"marketplaceSearch-equipmentType"}>
                    <p id={"marketplaceSearch-subtitles"}> Equipment Type </p>
                    <select id={"marketplaceSearch-equipmentTypeInput"}>
                        <option> All </option>
                    </select>
                </div>
                <div id={"marketplaceSearch-site"}>
                    <p id={"marketplaceSearch-subtitles"}> Site </p>
                    <select id={"marketplaceSearch-siteInput"}>
                        <option> All </option>
                    </select>
                </div>
                <div id={"marketplaceSearch-description"}>
                    <p id={"marketplaceSearch-subtitles"}> Description </p>
                    <input type={"text"} id={"marketplaceSearch-descriptionInput"}/>
                </div>
                <div id={"marketplaceSearch-fromDateToDate"}>
                    <div id={"marketplaceSearch-fromDate"}>
                        <p id={"marketplaceSearch-subtitles"}> From Date </p>
                        <input type={"date"} id={"marketplaceSearch-fromDateInput"}/>
                    </div>
                    <div id={"marketplaceSearch-toDate"}>
                        <p id={"marketplaceSearch-subtitles"}> To Date </p>
                        <input type={"date"} id={"marketplaceSearch-toDateInput"}/>
                    </div>
                </div>
                <div id={"marketplaceSearch-search"}>
                    <button type={"submit"} id={"marketplaceSearch-searchButton"} onClick={setState}> Search</button>
                </div>
            </form>
        </div>
    );
}

export default MarketplaceSearch;