import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import "../css/toolAlerts.css";

function ToolAlerts() {
  const [alerts, setAlerts] = useState([]);
  const alertsRef = collection(firestore, "toolAlerts");

  async function getAlertsData() {
    const alertsQuery = query(alertsRef, where("name", "!=", ""));
    const querySnapshot = await getDocs(alertsQuery);
    setAlerts([]);

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      const activeStatus = data.active ? "On" : "Off"; // Determine the active status

      setAlerts((curr) => [
        ...curr,
        <tr key={`${doc.id}`}>
          <td>{}</td>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>{activeStatus}</td> {/* Display the active status */}
          <td id={"toolAlerts-linkArrowBox"}>
            <a href={`/`}>
              <img
                src={"/triangle-right.svg"}
                alt={"Right arrow used to redirect user to item link."}
                id={"toolAlerts-tableLinkArrow"}
              ></img>
            </a>
          </td>
        </tr>,
      ]);
    });
  }

  useEffect(() => {
    getAlertsData();
    // eslint-disable-next-line
  }, []);

  return (
    <div id={"toolAlerts-page"}>
      <div id={"toolAlerts-header"}>
        <div id={"toolAlerts-backButton"}>
          <a href={"/"} className={"arrow left"}></a>
        </div>
        <div id={"toolAlerts-toolAlertsText"}>
          <h3>Alerts</h3>
        </div>
        <a href="/toolAlerts/create">
          <img
            src="/locationAdd.png"
            id="toolAlerts-addButton"
            alt="add equipment button"
          ></img>
        </a>
      </div>
      <br></br>
      <table id="alerts">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Active</th>
          <th></th>
        </tr>
        {alerts}
      </table>
    </div>
  );
}

export default ToolAlerts;
