import React, { useState, useEffect } from 'react';
import { getDocs, query, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import "../css/toolAlerts.css";

function ToolAlerts() {
  const [editing, setEditing] = useState([]);
  const [toolAlertsData, setToolAlertsData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const handleEdit = (idx, name) => {
    const mutatedEditing = editing.map((element, index) => {
      if (index === idx) return true;
      else return element;
    });
    setEditing(mutatedEditing);

    // Set the initial updated values for the entry being edited
    const toolAlerts = toolAlertsData[idx];
    setUpdatedData({
      ...updatedData,
      [name]: {
        name: toolAlerts.name,
        equipment: toolAlerts.equipment,
        description: toolAlerts.description,
        active: toolAlerts.active,
      },
    });
  };

  const handleSave = async (idx, name) => {
    const updatedToolAlerts = updatedData[name];
    if (updatedToolAlerts) {
      // Update the database doc
      await updateDoc(doc(firestore, 'toolAlerts', name), {
        name: updatedToolAlerts.name,
        equipment: updatedToolAlerts.equipment,
        description: updatedToolAlerts.description,
        active: updatedToolAlerts.active,
      });

      const mutatedEditing = editing.map((element, index) => {
        if (index === idx) return false;
        else return element;
      });
      setEditing(mutatedEditing);
    }
  };

  const handleDelete = async (name) => {
    setToolAlertsData(toolAlertsData.filter((toolAlertsData) => toolAlertsData.name !== name));
    await deleteDoc(doc(firestore, 'toolAlerts', name));
  };

  const getToolAlertsData = async () => {
    const toolAlertsCollection = collection(firestore, 'toolAlerts');
    const toolAlertsQuery = query(toolAlertsCollection);
    const querySnapshot = await getDocs(toolAlertsQuery);
    setToolAlertsData([]);
    setEditing(Array(querySnapshot.size).fill(false));
    setUpdatedData({});

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      setToolAlertsData((curr) => [
        ...curr,
        {
          name: doc.id,
          equipment: data.equipment,
          description: data.description,
          active: data.active,
        },
      ]);
    });
  };

  useEffect(() => {
    setToolAlertsData([]);
    getToolAlertsData().then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <div id={'toolAlerts-body'}>
      <div id={'toolAlerts-header'}>
        <div id={'toolAlerts-backButtonDiv'}>
          <a href={'/'} className={'arrow left'}></a>
        </div>
        <h3 id={'toolAlerts-titleText'}>Alerts</h3>
        <a href={'/tool/alerts/create'}>
          <img src={'/locationAdd.png'} id={'toolAlerts-addButton'} alt={'Add equipment type button'}></img>
        </a>
      </div>
      {loaded ? (
        <div id={'toolAlerts-data'}>
          <table className={'toolAlerts-tableElement'} id={'toolAlerts-table'}>
            <tbody>
              <tr>
                <th className={'toolAlerts-tableHeading'}>#</th>
                <th className={'toolAlerts-tableHeading'}>Name</th>
                <th className={'toolAlerts-tableHeading'}>Description</th>
                <th className={'toolAlerts-tableHeading'}>Active</th>
                <th className={'toolAlerts-tableHeading'}></th>
              </tr>
              {toolAlertsData.map((toolAlerts, index) => (
                <tr key={toolAlerts.name}>
                  <td className={'toolAlerts-tableElement'}>{index + 1}</td>
                  <td
                    className={'toolAlerts-tableElement'}
                    contentEditable={editing[index]}
                    suppressContentEditableWarning={true}
                    id={`toolAlerts-${toolAlerts.name}name`}
                    onInput={(e) => {
                      const updatedValue = e.target.textContent;
                      setUpdatedData({
                        ...updatedData,
                        [toolAlerts.name]: {
                          ...updatedData[toolAlerts.name],
                          active: updatedValue.toLowerCase() === 'on' ? true : false,
                        },
                      });
                    }}
                  >
                    {toolAlerts.name}
                  </td>
                  <td
                    className={'toolAlerts-tableElement'}
                    contentEditable={editing[index]}
                    suppressContentEditableWarning={true}
                    id={`toolAlerts-${toolAlerts.name}description`}
                    onInput={(e) => {
                      const updatedValue = e.target.textContent;
                      setUpdatedData({
                        ...updatedData,
                        [toolAlerts.name]: {
                          ...updatedData[toolAlerts.name],
                          description: updatedValue,
                        },
                      });
                    }}
                  >
                    {toolAlerts.description}
                  </td>
                  <td
                    className={'toolAlerts-tableElement'}
                    contentEditable={editing[index]}
                    suppressContentEditableWarning={true}
                    id={`toolAlerts-${toolAlerts.name}active`}
                    onInput={(e) => {
                      const updatedValue = e.target.textContent.toLowerCase();
                      setUpdatedData({
                        ...updatedData,
                        [toolAlerts.name]: {
                          ...updatedData[toolAlerts.name],
                          active: updatedValue === 'on' ? true : false,
                        },
                      });
                    }}
                  >
                    {toolAlerts.active ? 'On' : 'Off'}
                  </td>

                  <td className={'toolAlerts-tableElement'}>
                    <div id={'toolAlerts-dropdown'}>
                      <button id={'toolAlerts-tableArrowButton'}>
                        <img
                          src={'/triangle-right.svg'}
                          alt={'Right arrow used to create dropdown menu.'}
                          id={'toolAlerts-tableArrow'}
                        />
                      </button>
                      <div id={'toolAlerts-dropdownMenu'}>
                        {editing[index] ? (
                          <button
                            onClick={() => handleSave(index, toolAlerts.name)}
                            className={'toolAlerts-dropdownButton'}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(index, toolAlerts.name)}
                            className={'toolAlerts-dropdownButton'}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(toolAlerts.name)}
                          className={'toolAlerts-dropdownButton'}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={'loading'}>Loading...</p>
      )}
    </div>
  );
}

export default ToolAlerts;
