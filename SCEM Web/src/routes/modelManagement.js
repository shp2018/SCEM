import React, {useEffect, useState} from 'react';
import '../css/modelManagement.css';
import {collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {firestore} from "../firebase";
import PageNumber from "../components/pageNumber";

const ModelManagement = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [model, setModel] = useState("");
    const [manufacture, setManufacture] = useState("");
    const [manufactureNames, setManufactureNames] = useState([]);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [editing, setEditing] = useState([]);
    const [editedModels, setEditedModels] = useState({});
    const MAX_RESULTS = 6;

    useEffect(() => {
        async function fetchManufactureNames() {
            const manufactureRef = collection(firestore, "manufacture");
            const querySnapshot = await getDocs(manufactureRef);
            const names = querySnapshot.docs.map(doc => doc.data().mName);
            setManufactureNames(names);
        }

        fetchManufactureNames();
    }, []);

    const handleSearch = async e => {
        e.preventDefault();
        setSearchResults([]);
        let results = [];

        const ref = collection(firestore, "model");
        let searchTerms = model.toLowerCase().split(" ");
        let searchQuery = query(ref, where("searchTerms", "array-contains-any", searchTerms));

        if (manufacture) {
            searchQuery = query(searchQuery, where("modName", "==", manufacture));
        }

        const querySnapshot = await getDocs(searchQuery);
        querySnapshot.forEach(doc => {
            results.push(doc);
        });

        setSearchResults(results);
    }

    const launchPageNumbers = () => {
        let pageNumbers = Math.ceil(searchResults.length / MAX_RESULTS);
        let res = [];
        for (let i = 0; i < pageNumbers; i++) {
            res.push(<PageNumber key={i} num={i + 1} handler={() => setCurrentPageNumber(i + 1)}/>);
        }
        setPageNumbers(res);
        setCurrentPageNumber(1);
        setEditing(Array(searchResults.length).fill(false));
        setEditedModels({});
    }

    useEffect(launchPageNumbers, [searchResults]);

    const decrementPageNumber = () => {
        if (currentPageNumber > 1) setCurrentPageNumber(currentPageNumber - 1);
    }

    const incrementPageNumber = () => {
        if (currentPageNumber < Math.ceil(searchResults.length / MAX_RESULTS)) setCurrentPageNumber(currentPageNumber + 1);
    }

    const handleEdit = idx => {
        setEditing(prevEditing => {
            const mutatedEditing = [...prevEditing];
            mutatedEditing[idx] = true;
            return mutatedEditing;
        });

        if (!editedModels[idx]) {
            setEditedModels(prevEditedModels => ({
                ...prevEditedModels,
                [idx]: {...searchResults[idx].data()},
            }));
        }
    }

    const handleSave = async (idx, id) => {
        const updatedModel = editedModels[idx];
        if (updatedModel) {
            await updateDoc(doc(firestore, "model", id), updatedModel);

            setEditedModels(prevEditedModels => {
                const editedModelCopy = {...prevEditedModels};
                delete editedModelCopy[idx];
                return editedModelCopy;
            });

            setEditing(prevEditing => {
                const mutatedEditing = [...prevEditing];
                mutatedEditing[idx] = false;
                return mutatedEditing;
            });

            window.location.reload();
        }
    }

    return (
        <div id={"modelManagement-page"}>
            <div id={"modelManagement-header"}>
                <div id={"modelManagement-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={'modelManagement-titleText'}>Model Management</h3>
            </div>
            <form id={"modelManagement-form"} onSubmit={handleSearch}>
                <div id={"modelManagement-inputDivModel"}>
                    <label htmlFor={"modelManagement-searchInput"} className={"modelManagement-label"}>Model</label>
                    <br></br>
                    <input
                        id={"modelManagement-searchInput"}
                        onChange={(e) => setModel(e.target.value)}/>
                </div>
                <div id={"modelManagement-inputDivManufacture"}>
                    <label htmlFor={"modelManagement-manufactureSelect"}
                           className={"modelManagement-label"}>Manufacture</label>
                    <br></br>
                    <select
                        id={"modelManagement-manufactureSelect"}
                        value={manufacture}
                        onChange={(e) => setManufacture(e.target.value)}>
                        <option value="">All Manufactures</option>
                        {manufactureNames.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <button id={"modelManagement-searchButton"} type={"submit"}>
                    Search
                </button>
            </form>

            <div id={"modelManagement-createButtonDiv"}>
                <button id={"modelManagement-createButton"}
                        onClick={() => window.location.href = "/modelManagement/create"}>Create New
                    <img src={"/locationAdd.png"} id={"modelManagement-plusIcon"} alt={"Plus icon"}/>
                </button>
            </div>
            <table id={"modelManagement-table"} className={"modelManagement-tableElement"}>
                <tbody>
                <tr>
                    <th className={"modelManagement-tableHeading"}>#</th>
                    <th className={"modelManagement-tableHeading"}>Model</th>
                    <th className={"modelManagement-tableHeading"}>Description</th>
                    <th className={"modelManagement-tableHeading"}>Equipment Type</th>
                    <th className={"modelManagement-tableHeading"}>Manufacture</th>
                    <th className={"modelManagement-tableHeading"}></th>
                </tr>
                </tbody>
                <tbody>
                {searchResults.slice((currentPageNumber - 1) * MAX_RESULTS, currentPageNumber * MAX_RESULTS).map((doc, index) =>
                    <tr key={doc.id}>
                        <td className={"modelManagement-tableElement"}>{index + 1}</td>
                        <td
                            className={"modelManagement-tableElement"}
                            id={`modelManagement-${doc.id}modModel`}
                            contentEditable={editing[index]}
                            suppressContentEditableWarning={true}
                            onBlur={e => {
                                const editedModelCopy = {...editedModels};
                                editedModelCopy[index] = {...editedModelCopy[index], modModel: e.target.innerText};
                                setEditedModels(editedModelCopy);
                            }}>
                            {editedModels[index]?.modModel || doc.data().modModel}
                        </td>
                        <td
                            className={"modelManagement-tableElement"}
                            id={`modelManagement-${doc.id}modDescription`}
                            contentEditable={editing[index]}
                            suppressContentEditableWarning={true}
                            onBlur={e => {
                                const editedModelCopy = {...editedModels};
                                editedModelCopy[index] = {
                                    ...editedModelCopy[index],
                                    modDescription: e.target.innerText
                                };
                                setEditedModels(editedModelCopy);
                            }}>
                            {editedModels[index]?.modDescription || doc.data().modDescription}
                        </td>
                        <td
                            className={"modelManagement-tableElement"}
                            id={`modelManagement-${doc.id}modEquipmentType`}
                            contentEditable={editing[index]}
                            suppressContentEditableWarning={true}
                            onBlur={e => {
                                const editedModelCopy = {...editedModels};
                                editedModelCopy[index] = {
                                    ...editedModelCopy[index],
                                    modEquipmentType: e.target.innerText
                                };
                                setEditedModels(editedModelCopy);
                            }}>
                            {editedModels[index]?.modEquipmentType || doc.data().modEquipmentType}
                        </td>
                        <td className={"modelManagement-tableElement"} id={`modelManagement-${doc.id}modName`}>
                            {editedModels[index]?.modName || doc.data().modName}
                        </td>
                        <td className={"modelManagement-tableElement"}>
                            <div className="modelManagement-tableButtonContainer">
                                {!editing[index] ?
                                    <button onClick={() => handleEdit(index)}
                                            className={"modelManagement-editButton"}>Edit</button>
                                    : <button onClick={() => handleSave(index, doc.id)}
                                              className={"modelManagement-saveButton"}>Save</button>}
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div id={"modelManagement-pageNavigation"}>
                <button onClick={decrementPageNumber} id={"modelManagement-prev"}>Prev</button>
                {pageNumbers}
                <button onClick={incrementPageNumber} id={"modelManagement-next"}>Next</button>
            </div>
        </div>
    );
}

export default ModelManagement;