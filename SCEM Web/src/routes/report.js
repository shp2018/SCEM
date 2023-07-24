import React, {useState, useEffect} from 'react';
import '../css/report.css';
import {getDocs, collection} from 'firebase/firestore';
import {firestore} from "../firebase";

const Report = () => {
    const [optionSelected, setOptionSelected] = useState(null);
    const [tableHeading, setTableHeading] = useState(null);
    const [tableData, setTableData] = useState(null);

    const handleOptionSelected = async () => {
        let queriedData = [];
        let querySnapshot = null;
        setTableHeading(null);
        setTableData(null);

        switch (optionSelected) {
            case ("AI Suggestions"):
                querySnapshot = await getDocs(collection(firestore, "suggestions"));
                querySnapshot.forEach(doc => {
                    queriedData.push(doc);
                });
                setTableHeading(
                    <tr>
                        <th className={"report-tableHeading"}>#</th>
                        <th className={"report-tableHeading"}>Name</th>
                    </tr>);
                setTableData(queriedData.map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"report-tableElement"}>{index + 1}</td>
                        <td className={"report-tableElement"}>{doc.data().name}</td>
                    </tr>
                ));
                break;
            case ("Equipment List"):
                querySnapshot = await getDocs(collection(firestore, "marketplace"));
                querySnapshot.forEach(doc => {
                    queriedData.push(doc);
                });
                setTableHeading(
                    <tr>
                        <th className={"report-tableHeading"}>#</th>
                        <th className={"report-tableHeading"}>Name</th>
                        <th className={"report-tableHeading"}>Daily Price</th>
                        <th className={"report-tableHeading"}>Site</th>
                        <th className={"report-tableHeading"}></th>
                    </tr>);
                setTableData(queriedData.map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"report-tableElement"}>{index + 1}</td>
                        <td className={"report-tableElement"}>{doc.data().name}</td>
                        <td className={"report-tableElement"}>${doc.data().dailyPrice}</td>
                        <td className={"report-tableElement"}>{doc.data().site}</td>
                        <td className={"report-tableElement"}>
                            <a href={`/marketplace/${doc._key.path.lastSegment()}`}>
                                <img src={"/triangle-right.svg"}
                                     alt={"Right arrow used to redirect to equipment link."}
                                     id={"report-tableArrow"}/>
                            </a>
                        </td>
                    </tr>
                ));
                break;
            case ("Equipment Utilization Report"):
                setTableData(<tr>
                    <td className={"report-tableElement"}>
                        To be added later
                    </td>
                </tr>)
                break;
            case ("Location List"):
                querySnapshot = await getDocs(collection(firestore, "site location"));
                querySnapshot.forEach(doc => {
                    queriedData.push(doc);
                });
                setTableHeading(
                    <tr>
                        <th className={"report-tableHeading"}>#</th>
                        <th className={"report-tableHeading"}>Name</th>
                        <th className={"report-tableHeading"}>Address</th>
                        <th className={"report-tableHeading"}>Number</th>
                    </tr>);
                setTableData(queriedData.map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"report-tableElement"}>{index + 1}</td>
                        <td className={"report-tableElement"}>{doc.data().siteName}</td>
                        <td className={"report-tableElement"}>{doc.data().siteAddress}</td>
                        <td className={"report-tableElement"}>{doc.data().siteNumber}</td>
                    </tr>
                ));
                break;
            case ("Tracker List"):
                querySnapshot = await getDocs(collection(firestore, "trackers"));
                querySnapshot.forEach(doc => {
                    queriedData.push(doc);
                });
                setTableHeading(
                    <tr>
                        <th className={"report-tableHeading"}>#</th>
                        <th className={"report-tableHeading"}>Name</th>
                    </tr>);
                setTableData(queriedData.map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"report-tableElement"}>{index + 1}</td>
                        <td className={"report-tableElement"}>{doc.data().name}</td>
                    </tr>
                ));
                break;
            case ("Sensor List"):
                querySnapshot = await getDocs(collection(firestore, "sensors"));
                querySnapshot.forEach(doc => {
                    queriedData.push(doc);
                });
                setTableHeading(
                    <tr>
                        <th className={"report-tableHeading"}>#</th>
                        <th className={"report-tableHeading"}>Name</th>
                    </tr>);
                setTableData(queriedData.map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"report-tableElement"}>{index + 1}</td>
                        <td className={"report-tableElement"}>{doc.data().name}</td>
                    </tr>
                ));
                break;
        }
    }

    useEffect(() => {
        handleOptionSelected().then();
    }, [optionSelected]);

    return (
        <div id={"report-page"}>
            <div id={"report-header"}>
                <div id={"report-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={"report-titleText"}>Report</h3>
            </div>
            <div id={"report-selectDiv"}>
                <select id={"report-select"} onChange={e => setOptionSelected(e.target.value)}>
                    <option>Please select from below...</option>
                    <option value={"AI Suggestions"}>AI Suggestions</option>
                    <option value={"Equipment List"}>Equipment List</option>
                    <option value={"Equipment Utilization Report"}>Equipment Utilization Report</option>
                    <option value={"Location List"}>Location List</option>
                    <option value={"Tracker List"}>Tracker List</option>
                    <option value={"Sensor List"}>Sensor List</option>
                </select>
            </div>
            <div id={"report-data"}>
                <h3>Data</h3>
                {tableData ?
                    <table id={"report-table"} className={"report-tableElement"}>
                        <tbody>
                        {tableHeading}
                        {tableData}
                        </tbody>
                    </table>
                    : null}
            </div>
        </div>
    );
}

export default Report;