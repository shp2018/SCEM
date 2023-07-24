import React, {useState} from 'react';
import '../css/report.css';

const Report = () => {
    const [tableData, setTableData] = useState(null);
    return (
        <div id={"report-page"}>
            <div id={"report-header"}>
                <div id={"report-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={"report-titleText"}>Report</h3>
            </div>
            <div id={"report-selectDiv"}>
                <select id={"report-select"}>
                    <option value={"AI Suggestions"}>AI Suggestions</option>
                    <option value={"AI Suggestions"}>Equipment List</option>
                    <option value={"AI Suggestions"}>Equipment Utilization Report</option>
                    <option value={"AI Suggestions"}>Location List</option>
                    <option value={"AI Suggestions"}>Tracker List</option>
                    <option value={"AI Suggestions"}>Sensor List</option>
                </select>
            </div>
            <div id={"report-pictures"}>
                <h3>Pictures</h3>
            </div>
            <div id={"report-logLocation"}>
                <h3>Log Location</h3>
            </div>
        </div>
    );
}

export default Report;