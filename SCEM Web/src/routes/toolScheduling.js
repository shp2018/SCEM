import React, {useState, useEffect} from 'react';
import {getDocs, query, collection, doc, deleteDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import "../css/toolScheduling.css";

function ToolScheduling() {
    const [editing, setEditing] = useState([]);
    const [toolSchedulingData, setToolSchedulingData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
  
    const handleEdit = (idx, name) => {
      const mutatedEditing = editing.map((element, index) => {
        if (index === idx) return true;
        else return element;
      });
      setEditing(mutatedEditing);
  
      // Set the initial updated values for the entry being edited
      const toolScheduling = toolSchedulingData[idx];
      setUpdatedData({
        ...updatedData,
        [name]: {
          name: toolScheduling.name,
          equipment: toolScheduling.equipment,
          fromDate: toolScheduling.fromDate,
          toDate: toolScheduling.toDate,
        },
      });
    };
  
    const handleSave = async (idx, name) => {
      const updatedToolScheduling = updatedData[name];
      if (updatedToolScheduling) {
        // Update the database doc
        await updateDoc(doc(firestore, 'toolScheduling', name), {
          name: updatedToolScheduling.name,
          equipment: updatedToolScheduling.equipment,
          fromDate: updatedToolScheduling.fromDate,
          toDate: updatedToolScheduling.toDate,
        });
  
        const mutatedEditing = editing.map((element, index) => {
          if (index === idx) return false;
          else return element;
        });
        setEditing(mutatedEditing);
      }
    };
  
    const handleDelete = async (name) => {
      setToolSchedulingData(toolSchedulingData.filter((toolSchedulingData) => toolSchedulingData.name !== name));
      await deleteDoc(doc(firestore, 'toolScheduling', name));
    };
  
    const getToolSchedulingData = async () => {
      const toolSchedulingCollection = collection(firestore, 'toolScheduling');
      const toolSchedulingQuery = query(toolSchedulingCollection);
      const querySnapshot = await getDocs(toolSchedulingQuery);
      setToolSchedulingData([]);
      setEditing(Array(querySnapshot.size).fill(false));
      setUpdatedData({});
  
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        setToolSchedulingData((curr) => [
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
      setToolSchedulingData([]);
      getToolSchedulingData().then(() => {
        setLoaded(true);
      });
    }, []);
  
    return (
      <div id={'toolScheduling-body'}>
        <div id={'toolScheduling-header'}>
          <div id={'toolScheduling-backButtonDiv'}>
            <a href={'/'} className={'arrow left'}></a>
          </div>
          <h3 id={'toolScheduling-titleText'}>Scheduling</h3>
          <a href={'/toolScheduling/create'}>
            <img src={'/locationAdd.png'} id={'toolScheduling-addButton'} alt={'Add equipment type button'}></img>
          </a>
        </div>
        {loaded ? (
          <div id={'toolScheduling-data'}>
            <table className={'toolScheduling-tableElement'} id={'toolScheduling-table'}>
              <tbody>
                <tr>
                  <th className={'toolScheduling-tableHeading'}>#</th>
                  <th className={'toolScheduling-tableHeading'}>Name</th>
                  <th className={'toolScheduling-tableHeading'}>Description</th>
                  <th className={'toolScheduling-tableHeading'}>From Date</th>
                  <th className={'toolScheduling-tableHeading'}>To Date</th>
                  <th className={'toolScheduling-tableHeading'}></th>
                </tr>
                {toolSchedulingData.map((toolScheduling, index) => (
                  <tr key={toolScheduling.name}>
                    <td className={'toolScheduling-tableElement'}>{index + 1}</td>
                    <td
                      className={'toolScheduling-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolScheduling-${toolScheduling.name}name`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolScheduling.name]: {
                            ...updatedData[toolScheduling.name],
                            name: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolScheduling.name}
                    </td>
                    <td
                      className={'toolScheduling-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolScheduling-${toolScheduling.name}equipment`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolScheduling.name]: {
                            ...updatedData[toolScheduling.name],
                            equipment: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolScheduling.equipment}
                    </td>
                    <td
                      className={'toolScheduling-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolScheduling-${toolScheduling.name}fromDate`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolScheduling.name]: {
                            ...updatedData[toolScheduling.name],
                            fromDate: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolScheduling.fromDate}
                    </td>
                    <td
                      className={'toolScheduling-tableElement'}
                      contentEditable={editing[index]}
                      suppressContentEditableWarning={true}
                      id={`toolScheduling-${toolScheduling.name}toDate`}
                      onInput={(e) => {
                        const updatedValue = e.target.textContent;
                        setUpdatedData({
                          ...updatedData,
                          [toolScheduling.name]: {
                            ...updatedData[toolScheduling.name],
                            toDate: updatedValue,
                          },
                        });
                      }}
                    >
                      {toolScheduling.toDate}
                    </td>
                    <td className={'toolScheduling-tableElement'}>
                      <div id={'toolScheduling-dropdown'}>
                        <button id={'toolScheduling-tableArrowButton'}>
                          <img
                            src={'/triangle-right.svg'}
                            alt={'Right arrow used to create dropdown menu.'}
                            id={'toolScheduling-tableArrow'}
                          />
                        </button>
                        <div id={'toolScheduling-dropdownMenu'}>
                          {editing[index] ? (
                            <button
                              onClick={() => handleSave(index, toolScheduling.name)}
                              className={'toolScheduling-dropdownButton'}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(index, toolScheduling.name)}
                              className={'toolScheduling-dropdownButton'}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(toolScheduling.name)}
                            className={'toolScheduling-dropdownButton'}
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
  
  export default ToolScheduling;

 