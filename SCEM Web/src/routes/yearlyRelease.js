import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";
import '../css/yearlyRelease.css';
import PageNumber from "../components/pageNumber";
import {useNavigate} from "react-router-dom";

const YearlyRelease = () => {
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [filteredYearly, setFilteredYearly] = useState([]);
    const [allModels, setAllModels] = useState([]);

    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const MAX_RESULTS = 6;

    const launchPageNumbers = () => {
        let pageNumbers = Math.ceil(filteredYearly.length / MAX_RESULTS);
        let res = [];
        for (let i = 0; i < pageNumbers; i++) {
            res.push(<PageNumber key={i} num={i + 1} handler={() => setCurrentPageNumber(i + 1)}/>);
        }
        setPageNumbers(res);
        setCurrentPageNumber(1);
    }

    useEffect(launchPageNumbers, [filteredYearly]);

    const decrementPageNumber = () => {
        if (currentPageNumber > 1) setCurrentPageNumber(currentPageNumber - 1);
    }

    const incrementPageNumber = () => {
        if (currentPageNumber < Math.ceil(filteredYearly.length / MAX_RESULTS)) {
            setCurrentPageNumber(currentPageNumber + 1);
        }
    }

    //TODO: REWORK
    const filterData = async e => {
        e.preventDefault();
        const yearlyRef = collection(firestore, "yearlyRelease");
        const filteredData = [];
        let filteredYearlyQuery;

        if (name !== "") {
            filteredYearlyQuery = query(yearlyRef, where("name", "==", name));
        } else {
            if (model !== "") {
                filteredYearlyQuery = query(yearlyRef, where("model", "==", model));
            } else {
                filteredYearlyQuery = query(yearlyRef);
            }
        }

        const fQuerySnapshot = await getDocs(filteredYearlyQuery);
        fQuerySnapshot.forEach((doc) => {
            filteredData.push(doc);
        });
        setFilteredYearly(filteredData);
    }

    const getAllModels = async () => {
        const querySnapshot = await getDocs(collection(firestore, "model"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllModels(dataQueried);
    }

    useEffect(() => {
        getAllModels().then(() => {
            setLoaded(true);
        });
    }, []);

    return (
        <>
            {loaded ? <div id={"yearlyRelease-page"}>
                    <div id={"yearlyRelease-header"}>
                        <div id={"yearlyRelease-backButtonDiv"}>
                            <a href={"/"} className={"arrow left"}></a>
                        </div>
                        <h3 id={"yearlyRelease-titleText"}>Yearly Release</h3>
                    </div>
                    <br></br>
                    <form id={"yearlyRelease-form"} onSubmit={filterData}>
                        <div id={"yearlyRelease-inputDivs"}>
                            <div id={"yearlyRelease-inputDivName"}>
                                <label className={"yearlyRelease-label"}>Name</label>
                                <br></br>
                                <input id={"yearlyRelease-inputName"} onChange={(e) => {
                                    setName(e.target.value)
                                }}/>
                            </div>
                            <div id={"yearlyRelease-inputDivModel"}>
                                <label className={"yearlyRelease-label"}>Model</label>
                                <br></br>
                                <select id={"yearlyRelease-inputModel"} onChange={(e) => {
                                    setModel(e.target.value)
                                }}>
                                    <option value="">Select a model...</option>
                                    {allModels.map(doc =>
                                        <option key={doc.id} value={doc.data().modName}>{doc.data().modName}</option>)}
                                </select>
                            </div>
                        </div>
                        <button id={"yearlyRelease-searchButton"} type={"submit"}>
                            Search
                        </button>
                    </form>
                    <div id={"yearlyRelease-createButtonDiv"}>
                        <button id={"yearlyRelease-createButton"}
                                onClick={() => window.location.href = "/yearlyRelease/create"}>Create New
                            <img src={"/locationAdd.png"} id={"yearlyRelease-plusIcon"} alt={"Plus icon"}/>
                        </button>
                    </div>

                    {filteredYearly.length > 0 ?
                        <table id={"yearlyRelease-table"} className={"yearlyRelease-tableElement"}>
                            <tbody>
                            <tr>
                                <th className={"yearlyRelease-tableHeading"}>#</th>
                                <th className={"yearlyRelease-tableHeading"}>Model</th>
                                <th className={"yearlyRelease-tableHeading"}>Name</th>
                                <th className={"yearlyRelease-tableHeading"}>Year</th>
                                <th className={"yearlyRelease-tableHeading"}>Model Code</th>
                                <th className={"yearlyRelease-tableHeading"}></th>
                            </tr>
                            {filteredYearly.slice((currentPageNumber - 1) * MAX_RESULTS, currentPageNumber * MAX_RESULTS).map((doc, index) =>
                                <tr key={doc.id}>
                                    <td className={"yearlyRelease-tableElement"}>{index + 1}</td>
                                    <td className={"yearlyRelease-tableElement"}>{doc.data().model}</td>
                                    <td className={"yearlyRelease-tableElement"}>{doc.data().name}</td>
                                    <td className={"yearlyRelease-tableElement"}>{doc.data().year}</td>
                                    <td className={"yearlyRelease-tableElement"}>{doc.data().modelCode}</td>
                                    <td className={"yearlyRelease-tableElement"}>
                                        <button onClick={() => navigate('/yearlyRelease/create', {
                                            state: {
                                                data: doc.data(),
                                                id: doc.id
                                            }
                                        })}
                                                className={"yearlyRelease-editButton"}>Edit
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table> : null}
                    {filteredYearly.length > 0 ? <div id={"yearlyRelease-pageNavigation"}>
                        <button onClick={decrementPageNumber} id={"yearlyRelease-prev"}>Prev</button>
                        {pageNumbers}
                        <button onClick={incrementPageNumber} id={"yearlyRelease-next"}>Next</button>
                    </div> : null}
                </div> :
                <p id={"yearlyRelease-loading"}>Loading...</p>}
        </>
    );
}

export default YearlyRelease;