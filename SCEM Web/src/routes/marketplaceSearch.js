import React, {useState} from "react";
import '../css/marketplaceSearch.css';
import Typesense from 'typesense';

function MarketplaceSearch() {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    let client = new Typesense.Client({
        'nodes': [{
            'host': '6p7hdz3ktlmosu24p-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
            'port': '443',
            'protocol': 'https'
        }],
        'apiKey': 'nzKj2vqJppoZmSDiJovnLbDbT32PBHGI',
        'connectionTimeoutSeconds': 2
    })

    function setState() {
        setName(document.getElementById("marketplaceSearch-nameInput").value);
        setEquipmentType(document.getElementById("marketplaceSearch-equipmentTypeInput").value);
        setSite(document.getElementById("marketplaceSearch-siteInput").value);
        setDescription(document.getElementById("marketplaceSearch-descriptionInput").value);
        setFromDate(document.getElementById("marketplaceSearch-fromDateInput").value);
        setToDate(document.getElementById("marketplaceSearch-toDateInput").value);
    }

    function generateSearchParams() {
        let searchParams = {};

        searchParams.q = name;
        searchParams.query_by = 'name';
        searchParams.filter_by = ``;

        if (description === "") {
            searchParams.filter_by += `description:!=''`;
        } else if (description !== "") {
            searchParams.filter_by += `description:=${description}`;
        }

        if (site !== "All") {
            searchParams.filter_by += ` && site:=${site}`;
        }

        if (equipmentType !== "All") {
            searchParams.filter_by += ` && equipmentType:=${equipmentType}`;
        }

        // if (fromDate !== "") {
        //     searchParams.filter_by += ` && fromDate:>=${fromDate}`;
        // }
        //
        // if (toDate !== "") {
        //     searchParams.filter_by += ` && toDate:<=${toDate}`;
        // }

        console.log(searchParams.filter_by);

        return searchParams;
    }

    const search = e => {
        e.preventDefault();

        // console.log(name);
        // console.log(equipmentType);
        // console.log(site);
        // console.log(description);
        // console.log(fromDate);
        // console.log(toDate);

        let searchParams = generateSearchParams();

        client.collections('marketplace')
            .documents()
            .search(searchParams)
            .then(function (searchResults) {
                console.log(searchResults);
                setSearchResults([]);
                for (let i = 0; i < searchResults.hits.length; i++) {
                    setSearchResults(curr => [...curr,
                        <div key={searchResults.hits[i].document.id}> {searchResults.hits[i].document.name} </div>]);
                }
            })
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
                        <option> All</option>
                        <option> GPS</option>
                    </select>
                </div>
                <div id={"marketplaceSearch-site"}>
                    <p id={"marketplaceSearch-subtitles"}> Site </p>
                    <select id={"marketplaceSearch-siteInput"}>
                        <option> All</option>
                        <option> Canada</option>
                        <option> Vietnam</option>
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
                    <button type={"submit"} id={"marketplaceSearch-searchButton"} onClick={setState}> Search
                    </button>
                </div>

                <div id={"marketplaceSearch-searchResults"}>
                    {searchResults}
                </div>
            </form>
        </div>
    );
}

export default MarketplaceSearch;