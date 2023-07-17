import React, {useState} from "react";
import '../css/marketplaceSearch.css';
import {collection, query, getDocs, where} from "firebase/firestore";
import {firestore} from "../firebase";

const MarketplaceSearch = () => {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [site, setSite] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const search = async e => {
        e.preventDefault();

        const marketplaceRef = collection(firestore, "marketplace");
        const searchQuery = query(marketplaceRef,
            where("name", "==", name),
            where("fromDate", ">=", fromDate),
            where("equipmentType", "==", equipmentType),
            where("site", "==", site));
        let querySnapshot = await getDocs(searchQuery);
        setSearchResults([]);

        querySnapshot.forEach(doc => {
            setSearchResults(curr => [...curr, doc]);
        })

        // filter out toDate here since query can't do two inequalities with two diff fields
        setSearchResults(searchResults.filter(doc => doc.data().toDate <= toDate));
    }

    return (<div id={"marketplaceSearch-page"}>
        <div id={"marketplaceSearch-header"}>
            <a href="/marketplace" id="marketplaceSearch-backButton" className="arrow left"></a>
            <h3 id={"marketplaceSearch-title"}> Search </h3>
        </div>

        <form onSubmit={search}>
            <div id={"marketplaceSearch-inputName"}>
                <label id={"marketplaceSearch-subtitles"}>Name</label>
                <br></br>
                <input type={"text"} className={"marketplaceSearch-input"} onChange={e => setName(e.target.value)} defaultValue={""}/>
            </div>
            <div id={"marketplaceSearch-equipmentType"}>
                <label id={"marketplaceSearch-subtitles"}> Equipment Type </label>
                <br></br>
                <select className={"marketplaceSearch-input"} onChange={e => setEquipmentType(e.target.value)}>
                    <option value={"All"}>All</option>
                    <option value={"GPS"}>GPS</option>
                    <option value={"Keyboard"}>Keyboard</option>
                </select>
            </div>
            <div id={"marketplaceSearch-site"}>
                <label id={"marketplaceSearch-subtitles"}>Site</label>
                <br></br>
                <select className={"marketplaceSearch-input"} onChange={e => setSite(e.target.value)}>
                    <option value={"All"} className={"marketplaceSearch-blueInput"}>All</option>
                    <option value={"Canada"}>Canada</option>
                    <option value={"Vietnam"}>Vietnam</option>
                </select>
            </div>
            <div id={"marketplaceSearch-fromDateToDate"}>
                <div id={"marketplaceSearch-fromDate"}>
                    <label id={"marketplaceSearch-subtitles"}>From Date</label>
                    <br></br>
                    <input type={"date"} className={"marketplaceSearch-input"} id={"marketplaceSearch-fromDateInput"}
                           onChange={e => setFromDate(e.target.value)}/>
                </div>
                <div id={"marketplaceSearch-toDate"}>
                    <label id={"marketplaceSearch-subtitles"}>To Date</label>
                    <br></br>
                    <input type={"date"} className={"marketplaceSearch-input"} id={"marketplaceSearch-toDateInput"}
                           onChange={e => setToDate(e.target.value)}/>
                </div>
            </div>
            <div id={"marketplaceSearch-search"}>
                <button type={"submit"} id={"marketplaceSearch-searchButton"}>Search
                </button>
            </div>
        </form>
        <div id={"marketplaceSearch-searchResults"}>
            {searchResults.map((doc, index) =>
                <div id={"marketplace-marketplaceItem"}
                     key={index + 1}>
                    <div id={"marketplace-marketplaceItemTitle"}>
                        <a href={`/marketplace/${doc.id}`}
                           id={"marketplace-marketplaceItemLink"}>
                            {doc.data().name} </a>
                    </div>
                    <div id={"marketplace-marketplaceItemDescription"}>
                        {doc.data().description.length > 125 ? doc.data().description.substring(0, 125) + "..." : doc.data().description}
                    </div>
                    <div id={"marketplace-marketplaceItemUserCreated"}>
                        <a href={`/profile/${doc.data().userID}`}
                           id={"marketplace-marketplaceItemUserCreatedLink"}> {doc.data().userCreated} </a>
                    </div>
                    <div id={"marketplace-marketplaceItemDateAndTimeCreated"}>
                        {doc.data().dateCreated}
                        {" "}
                        {doc.data().timeCreated}
                    </div>
                    <div id={"marketplace-marketplaceItemImageDiv"}>
                        <img src={doc.data().images}
                             alt={"Marketplace Item"}
                             id={"marketplace-marketplaceItemImage"}></img>
                    </div>
                </div>)}
        </div>
    </div>);
}

export default MarketplaceSearch;