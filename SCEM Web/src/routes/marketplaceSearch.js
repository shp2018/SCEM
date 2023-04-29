import React from "react";
import '../css/marketplaceSearch.css';

function MarketplaceSearch() {

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
                    <input type={"text"}/>
                </div>
                <div id={"marketplaceSearch-equipmentType"}>
                    <p id={"marketplaceSearch-subtitles"}> Equipment Type </p>
                    <select>
                        <option> All</option>
                    </select>
                </div>
                <div id={"marketplaceSearch-site"}>
                    <p id={"marketplaceSearch-subtitles"}> Site </p>
                    <select>
                        <option> All</option>
                    </select>
                </div>
                <div id={"marketplaceSearch-description"}>
                    <p id={"marketplaceSearch-subtitles"}> Description </p>
                    <input type={"text"}/>
                </div>
                <div id={"marketplaceSearch-fromDateToDate"}>
                    <div id={"marketplaceSearch-fromDate"}>
                        <p id={"marketplaceSearch-subtitles"}> From Date </p>
                        <input type={"date"}/>
                    </div>
                    <div id={"marketplaceSearch-toDate"}>
                        <p id={"marketplaceSearch-subtitles"}> To Date </p>
                        <input type={"date"}/>
                    </div>
                </div>
                <div id={"marketplaceSearch-search"}>
                    <button type={"submit"} id={"marketplaceSearch-searchButton"}> Search</button>
                </div>
            </form>
        </div>
    );
}

export default MarketplaceSearch;