import React, {useState, useEffect} from 'react';
import {getDocs, query, collection, doc, deleteDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import "../css/toolMaintenance.css";

const ToolMaintenance = () => {
    const [editing, setEditing] = useState([]);
    const [toolMaintenanceData, setToolMaintenanceData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
  
    const handleEdit = (idx, name) => {
      const mutatedEditing = editing.map((element, index) => {
        if (index === idx) return true;
        else return element;
      });
      setEditing(mutatedEditing);
  
      // Set the initial updated values for the entry being edited
      const toolMaintenance = toolMaintenanceData[idx];
      setUpdatedData({
        ...updatedData,
        [name]: {
          name: toolMaintenance.name,
          equipment: toolMaintenance.equipment,
          fromDate: toolMaintenance.fromDate,
          toDate: toolMaintenance.toDate,
        },
      });
    };
  
    const handleSave = async (idx, name) => {
      const updatedToolMaintenance = updatedData[name];
      if (updatedToolMaintenance) {
        // Update the database doc
        await updateDoc(doc(firestore, 'toolMaintenance', name), {
          name: updatedToolMaintenance.name,
          equipment: updatedToolMaintenance.equipment,
          fromDate: updatedToolMaintenance.fromDate,
          toDate: updatedToolMaintenance.toDate,
        });
  
        const mutatedEditing = editing.map((element, index) => {
          if (index === idx) return false;
          else return element;
        });
        setEditing(mutatedEditing);
      }
    };
  
    const handleDelete = async (name) => {
      setToolMaintenanceData(toolMaintenanceData.filter((toolMaintenanceData) => toolMaintenanceData.name !== name));
      await deleteDoc(doc(firestore, 'toolMaintenance', name));
    };
  
    const getToolMaintenanceData = async () => {
      const toolMaintenanceCollection = collection(firestore, 'toolMaintenance');
      const toolMaintenanceQuery = query(toolMaintenanceCollection);
      const querySnapshot = await getDocs(toolMaintenanceQuery);
      setToolMaintenanceData([]);
      setEditing(Array(querySnapshot.size).fill(false));
      setUpdatedData({});
  
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        setToolMaintenanceData((curr) => [
          ...curr,
          {
            name: doc.id,
            equipment: data.equipment,
            fromDate: data.fromDate,
            toDate: data.toDate,
          },
        ]);
      });
    };
  
    useEffect(() => {
      setToolMaintenanceData([]);
      getToolMaintenanceData().then(() => {
        setLoaded(true);
      });
    }, []);
  
    return (
      <div id={'toolMaintenance-body'}>
        <div id={'toolMaintenance-header'}>
          <div id={'toolMaintenance-backButtonDiv'}>
            <a href={'/'} className={'arrow left'}></a>
          </div>
          <h3 id={'toolMaintenance-titleText'}>Upcoming maintenance schedule</h3>
          <a href={'/toolMaintenance/create'}>
            <img src={'/locationAdd.png'} id={'toolMaintenance-addButton'} alt={'Add equipment type button'}></img>
          </a>
        </div>
        {loaded ? (
          <div id={'toolMaintenance-data'}>
            <table className={'toolMaintenance-tableElement'} id={'toolMaintenance-table'}>
              <tbody>
                <tr>
                  <th className={'toolMaintenance-tableHeading'}>#</th>
                  <th className={'toolMaintenance-tableHeading'}>Name</th>
                  <th className={'toolMaintenance-tableHeading'}>Description</th>
                  <th className={'toolMaintenance-tableHeading'}>From Date</th>
                  <th className={'toolMaintenance-tableHeading'}>To Date</th>
                  <th className={'toolMaintenance-tableHeading'}></th>
                </tr>
                {toolMaintenanceData.map((toolMaintenance, index) => (
                  <tr key={toolMaintenance.name}>
                    <td className={'toolMaintenance-tableElement'}>{index + 1}</td>
                    <td
                      className={'toolMaintenance-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolMaintenance-${toolMaintenance.name}name`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolMaintenance.name]: {
                            ...updatedData[toolMaintenance.name],
                            name: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolMaintenance.name}
                    </td>
                    <td
                      className={'toolMaintenance-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolMaintenance-${toolMaintenance.name}equipment`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolMaintenance.name]: {
                            ...updatedData[toolMaintenance.name],
                            equipment: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolMaintenance.equipment}
                    </td>
                    <td
                      className={'toolMaintenance-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolMaintenance-${toolMaintenance.name}fromDate`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolMaintenance.name]: {
                            ...updatedData[toolMaintenance.name],
                            fromDate: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolMaintenance.fromDate}
                    </td>
                    <td
                      className={'toolMaintenance-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolMaintenance-${toolMaintenance.name}toDate`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolMaintenance.name]: {
                            ...updatedData[toolMaintenance.name],
                            toDate: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolMaintenance.toDate}
                    </td>
                    <td className={'toolMaintenance-tableElement'}>
                      <div id={'toolMaintenance-dropdown'}>
                        <button id={'toolMaintenance-tableArrowButton'}>
                          <img
                            src={'/triangle-right.svg'}
                            alt={'Right arrow used to create dropdown menu.'}
                            id={'toolMaintenance-tableArrow'}
                          />
                        </button>
                        <div id={'toolMaintenance-dropdownMenu'}>
                          {editing[index] ? (
                            <button
                              onClick={() => handleSave(index, toolMaintenance.name)}
                              className={'toolMaintenance-dropdownButton'}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(index, toolMaintenance.name)}
                              className={'toolMaintenance-dropdownButton'}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(toolMaintenance.name)}
                            className={'toolMaintenance-dropdownButton'}
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
  
  export default ToolMaintenance;