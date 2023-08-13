import React, {useEffect, useState} from "react";
import {firestore, storage} from "../firebase";
import {addDoc, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import '../css/createYearly.css';
import {useLocation} from "react-router-dom";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const YearlyReleaseCreate = () => {
    const [model, setModel] = useState("");
    const [allModels, setAllModels] = useState([]);
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [mCode, setMCode] = useState("");
    const [suffix, setSuffix] = useState("");
    const [capacity, setCapacity] = useState("");
    const [engine, setEngine] = useState("");
    const [color, setColor] = useState("");
    const [documentation, setDocumentation] = useState("");
    const [warranty, setWarranty] = useState("");
    const [picture, setPicture] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");
    const location = useLocation();

    const getExistingData = () => {
        if (location.state) {
            const data = location.state.data;
            setName(data.name);
            setModel(data.model);
            setYear(data.year);
            setCapacity(data.capacity);
            setWarranty(data.warranty);
            setMCode(data.modelCode);
            setEngine(data.engine);
            setDocumentation(data.documentation);
            setSuffix(data.suffix);
            setColor(data.color);
            setPicture(data.picture);
        }
    }

    useEffect(() => {
        getExistingData();
    }, []);

    const getAllModels = async () => {
        const querySnapshot = await getDocs(collection(firestore, "model"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setAllModels(dataQueried);
    }

    useEffect(() => {
        getAllModels();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        let data = {
            name: name,
            model: model,
            year: year,
            modelCode: mCode,
            suffix: suffix,
            capacity: capacity,
            engine: engine,
            documentation: documentation,
            warranty: warranty,
            color: color,
        };

        if (!location.state) {
            const yearlyRelease = collection(firestore, "yearlyRelease");
            await addDoc(yearlyRelease, data).then((res) => {
                const storageRef = ref(storage, `/yearlyRelease/${res.id}`);
                uploadBytes(storageRef, picture).then(() => {
                    getDownloadURL(storageRef).then(url => {
                        updateDoc(doc(firestore, "yearlyRelease", res.id), {
                            picture: url
                        }).then(() => {
                            alert("New yearly release data has been created.");
                            window.location.href = "/yearlyRelease";
                        });
                    });
                }).catch(err => {
                    console.error(err);
                });
            });
        } else {
            await updateDoc(doc(firestore, "yearlyRelease", location.state.id), data).then(() => {
                if (uploadedImage !== "") {
                    const storageRef = ref(storage, `/yearlyRelease/${location.state.id}`);
                    uploadBytes(storageRef, picture).then(() => {
                        getDownloadURL(storageRef).then(url => {
                            updateDoc(doc(firestore, "yearlyRelease", location.state.id), {
                                picture: url
                            }).then(() => {
                                alert("Yearly release data has been updated.");
                                window.location.href = "/yearlyRelease";
                            });
                        });
                    }).catch(err => {
                        console.error(err);
                    });
                }
            });
        }
    }

    const handleUploadImage = () => {
        const input = document.getElementById("createYearly-imageInput");
        if (input.files.length > 1) {
            alert("Please only upload one image!");
            return;
        }
        const file = input.files[0];
        setUploadedImage(URL.createObjectURL(file));
        setPicture(file);
    }

    return (
        <div id={"createYearly-page"}>
            <div id={"createYearly-header"}>
                <div id={"createYearly-backButtonDiv"}>
                    <a href={"/yearlyRelease"}
                       className={"arrow left"}>
                    </a>
                </div>
                <h3 id={"createYearly-createYearlyText"}>Yearly Release</h3>
            </div>

            <form id="createYearly-form" onSubmit={handleSave}>
                <label id="createYearly-Label">Model</label>
                <br></br>
                <select name="Model" id="createYearly-select" onChange={(e) => {
                    setModel(e.target.value)
                }}>
                    <option value="">Select a model...</option>
                    {allModels.map(doc =>
                        <option key={doc.id} value={doc.data().modName} selected={model === doc.data().modName}>{doc.data().modName}</option>)}
                </select>
                <div id={"createYearly-textInputs"}>
                    <div>
                        <div id={"createYearly-nameDiv"}>
                            <label id="createYearly-Label">Name</label>
                            <br></br>
                            <input id="createYearly-Input" type="text" defaultValue={name} onChange={(e) => {
                                setName(e.target.value)
                            }}></input>
                        </div>
                        <div id={"createYearly-yearDiv"}>
                            <label id="createYearly-Label">Year</label>
                            <br></br>
                            <input id="createYearly-Input" type="text" defaultValue={year}
                                   onChange={(e) => {
                                       setYear(e.target.value)
                                   }}></input>
                        </div>
                        <div id={"createYearly-modelCodeDiv"}>
                            <label id="createYearly-Label">Model Code</label>
                            <br></br>
                            <input id="createYearly-Input" type="text" defaultValue={mCode}
                                   onChange={(e) => {
                                       setMCode(e.target.value)
                                   }}></input>
                        </div>
                    </div>
                    <div id={"createYearly-suffixDiv"}>
                        <label id="createYearly-Label">Suffix</label>
                        <br></br>
                        <input id="createYearly-Input" type="text" defaultValue={suffix}
                               onChange={(e) => {
                                   setSuffix(e.target.value)
                               }}></input>
                    </div>
                    <div id={"createYearly-capacityDiv"}>
                        <label id="createYearly-Label">Capacity</label>
                        <br></br>
                        <input id="createYearly-Input" type="text" defaultValue={capacity}
                               onChange={(e) => {
                                   setCapacity(e.target.value)
                               }}></input>
                    </div>
                    <div id={"createYearly-engineDiv"}>
                        <label id="createYearly-Label">Engine</label>
                        <br></br>
                        <input id="createYearly-Input" type="text" defaultValue={engine}
                               onChange={(e) => {
                                   setEngine(e.target.value)
                               }}></input>
                    </div>
                </div>

                <div id={"createYearly-availableColorsDiv"}>
                    <label id="createYearly-Label">Available colors</label>
                    <br></br>
                    <select id="createYearly-Input" onChange={e => setColor(e.target.value)}>
                        <option value={""}>Select a colour...</option>
                        <option value="white" selected={color === "white"}>White</option>
                        <option value="red" selected={color === "red"}>Red</option>
                        <option value="blue" selected={color === "blue"}>Blue</option>
                    </select>
                </div>
                <div>
                    <label id="createYearly-Label">Documentation</label>
                    <br></br>
                    <input className="createYearly-textBox" type="text" defaultValue={documentation}
                           onChange={(e) => {
                               setDocumentation(e.target.value)
                           }}/>
                </div>
                <div>
                    <label id="createYearly-Label">Warranty Policy</label>
                    <br></br>
                    <input className="createYearly-textBox" type="text" defaultValue={warranty}
                           onChange={(e) => {
                               setWarranty(e.target.value)
                           }}/>
                </div>
                <div>
                    <label id="createYearly-Label">Picture</label>
                    <br></br>
                    {!uploadedImage ?
                        <img src={picture} id={"createYearly-profilePicture"}
                             alt={"Device picture"}/> :
                        <img src={uploadedImage} id={"createYearly-profilePicture"}
                             alt={"Device picture"}/>}
                    <br></br>
                    <input type="file"
                           accept="image/png, image/jpeg, image/jpg" id={"createYearly-imageInput"} onChange={handleUploadImage}/>
                </div>
                    <button id="createYearly-createYearlybutton" type="submit">Update</button>
            </form>
        </div>
    );
}

export default YearlyReleaseCreate;