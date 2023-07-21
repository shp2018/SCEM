import React, {useState, useEffect} from "react";
import "../css/siteAndTrackingLink.css";
import {collection, getDocs, updateDoc, doc} from "firebase/firestore";
import {firestore} from "../firebase";

const SiteAndTrackingLink = () => {
    const [allSiteAndTrackingLinks, setAllSiteAndTrackingLinks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [editing, setEditing] = useState([]);

    const getAllSiteAndTrackingLinks = async () => {
        const querySnapshot = await getDocs(collection(firestore, "siteAndTrackingLink"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllSiteAndTrackingLinks(dataQueried);
        setEditing(Array(querySnapshot.size).fill(false));
    }

    useEffect(() => {
        getAllSiteAndTrackingLinks().then(() => {
            setLoaded(true);
        });
    }, []);

    const handleSave = async (idx, id) => {
        const equipmentType = document.getElementById(`siteAndTrackingLink-${id}equipmentType`).innerText;
        const site = document.getElementById(`siteAndTrackingLink-${id}site`).innerText;
        const tracker = document.getElementById(`siteAndTrackingLink-${id}tracker`).innerText;

        await updateDoc(doc(firestore, "siteAndTrackingLink", id), {
            equipmentType, site, tracker
        });

        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return false;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    const handleEdit = idx => {
        const mutatedEditing = editing.map((element, index) => {
            if (index === idx) return true;
            else return element;
        });
        setEditing(mutatedEditing);
    }

    //TODO
    const handlePreview = () => {
        alert("This feature will be implemented later.")
    }

    return (
        <div id={"siteAndTrackingLink-page"}>
            <div id={"siteAndTrackingLink-header"}>
                <div id={"siteAndTrackingLink-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={"siteAndTrackingLink-titleText"}>Site and Tracking link</h3>
                <a href={"/siteAndTrackingLink/create"}>
                    <img src={"/locationAdd.png"} id={"siteAndTrackingLink-addButton"}
                         alt={"Create site and tracking link button"}>
                    </img>
                </a>
            </div>
            {loaded ?
                <table id={"siteAndTrackingLink-table"} className={"siteAndTrackingLink-tableElement"}>
                    <tbody>
                    <tr>
                        <th className={"siteAndTrackingLink-tableHeading"}>#</th>
                        <th className={"siteAndTrackingLink-tableHeading"}>Equipment</th>
                        <th className={"siteAndTrackingLink-tableHeading"}>Site</th>
                        <th className={"siteAndTrackingLink-tableHeading"}>Tracker</th>
                        <th className={"siteAndTrackingLink-tableHeading"}></th>
                    </tr>
                    {allSiteAndTrackingLinks.map((doc, index) =>
                        <tr key={doc.id}>
                            <td className={"siteAndTrackingLink-tableElement"}>{index + 1}</td>
                            <td className={"siteAndTrackingLink-tableElement"} contentEditable={editing[index]}
                                suppressContentEditableWarning={true} id={`siteAndTrackingLink-${doc.id}equipmentType`}>{doc.data().equipmentType}</td>
                            <td className={"siteAndTrackingLink-tableElement"} contentEditable={editing[index]}
                                suppressContentEditableWarning={true} id={`siteAndTrackingLink-${doc.id}site`}>{doc.data().site}</td>
                            <td className={"siteAndTrackingLink-tableElement"} contentEditable={editing[index]}
                                suppressContentEditableWarning={true} id={`siteAndTrackingLink-${doc.id}tracker`}>{doc.data().tracker}</td>
                            <td className={"siteAndTrackingLink-tableElement"}>
                                <div id={"siteAndTrackingLink-dropdown"}>
                                    <button id={"siteAndTrackingLink-tableArrowButton"}
                                            onClick={() => null}>
                                        <img src={"/triangle-right.svg"}
                                             alt={"Right arrow used to display dropdown menu."}
                                             id={"siteAndTrackingLink-tableArrow"}/>
                                    </button>
                                    <div id={"siteAndTrackingLink-dropdownMenu"}>
                                        {editing[index] ? <button onClick={() => handleSave(index, doc.id)}
                                                                  className={"siteAndTrackingLink-dropdownButton"}>
                                            Save
                                        </button> : <button onClick={() => handleEdit(index)}
                                                            className={"siteAndTrackingLink-dropdownButton"}>
                                            Edit
                                        </button>}
                                        <button onClick={handlePreview} className={"siteAndTrackingLink-dropdownButton"}>
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                : <p className={"loading"}>Loading...</p>}
        </div>
    );
}

export default SiteAndTrackingLink;