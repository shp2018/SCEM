import React, {useEffect, useState} from "react";
import {auth, firestore, storage} from "../firebase";
import {doc, addDoc, collection, getDocs, query, where, updateDoc, arrayUnion} from "firebase/firestore";
import '../css/marketplaceAddItem.css';
import {onAuthStateChanged} from "firebase/auth";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

const MarketplaceAddItem = () => {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [dailyPrice, setDailyPrice] = useState("");
    const [weeklyPrice, setWeeklyPrice] = useState("");
    const [monthlyPrice, setMonthlyPrice] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
    const [allSites, setAllSites] = useState([]);

    const imageMimeType = /image\/(png|jpg|jpeg|gif|webp)/i;
    const [files, setFiles] = useState(null);
    // eslint-disable-next-line
    const [file, setFile] = useState(null);
    // eslint-disable-next-line
    const [fileDataURL, setFileDataURL] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [imgNum, setImgNum] = useState(0);

    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(null);

    const month = () => {
        const monthOutput = new Date().getMonth() + 1
        if (monthOutput < 10) {
            return "" + 0 + monthOutput;
        } else {
            return monthOutput;
        }
    }
    const day = () => {
        const dayOutput = new Date().getDate();
        if (dayOutput < 10) {
            return "" + 0 + dayOutput;
        } else {
            return dayOutput;
        }
    }
    const time = () => {
        const hoursOutput = new Date().getHours();
        const minutesOutput = new Date().getMinutes();
        if (hoursOutput < 10) {
            if (minutesOutput < 10) {
                return "" + "0" + hoursOutput + ":" + "0" + minutesOutput;
            } else {
                return "" + "0" + hoursOutput + ":" + minutesOutput;
            }
        } else {
            if (minutesOutput < 10) {
                return "" + hoursOutput + ":" + "0" + minutesOutput;
            } else {
                return "" + hoursOutput + ":" + minutesOutput;
            }
        }
    }
    const date = "" + (new Date().getFullYear()) + "-" + month() + "-" + day();

    async function checkAuthState() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserID(user.uid);
                setAuthState(true);
                const ref = collection(firestore, "users");
                const q = query(ref, where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (!userName) {
                        setUserName(doc.data().fullname);
                    }
                });
            }
        })
    }

    const getAllEquipmentTypes = async () => {
        const querySnapshot = await getDocs(collection(firestore, "equipmentTypes"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        })
        setAllEquipmentTypes(dataQueried);
    }

    const getAllSites = async () => {
        const querySnapshot = await getDocs(collection(firestore, "site location"));
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        })
        setAllSites(dataQueried);
    }

    useEffect(() => {
        getAllEquipmentTypes().then(() => {
        });
    }, []);

    useEffect(() => {
        getAllSites().then(() => {
        });
    }, []);

    useEffect(() => {
        checkAuthState();
    }, []);

    const handleNext = () => {
        const n = files.length - 1;
        if (imgNum < n) {
            setImgNum(imgNum + 1);
        } else {
            setImgNum(0);
        }
        setFile(files[imgNum]);
    }

    const changeHandler = e => {
        const files = e.target.files;
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
        setFiles(files);
        setIsShown(current => !current);
    }

    const handleSave = async e => {
        e.preventDefault();

        if (!authState) {
            alert("Please login first.");
            return;
        }

        const marketplaceRef = collection(firestore, "marketplace");

        // handle adding search terms
        let searchTerms = name.toLowerCase().split(" ");
        searchTerms.push("");

        let data = {
            name: name,
            equipmentType: equipmentType,
            site: site,
            description: description,
            dailyPrice: dailyPrice,
            weeklyPrice: weeklyPrice,
            monthlyPrice: monthlyPrice,
            fromDate: fromDate,
            toDate: toDate,
            userCreated: userName,
            userID: userID,
            dateCreated: date,
            timeCreated: time(),
            images: [],
            onRent: false,
            onRentName: "",
            onRentID: "",
            searchTerms: searchTerms,
        };
        try {
            addDoc(marketplaceRef, data).then((res) => {
                for (let i = 0; i < files.length; i++) {
                    const storageRef = ref(storage, `/marketplaceImages/${res._key.path.lastSegment()}/${i + 1}`);
                    console.log(files[i]);
                    uploadBytes(storageRef, files[i]).then(() => {
                        getDownloadURL(storageRef).then((url) => {
                            const itemRef = doc(firestore, "marketplace", res._key.path.lastSegment());
                            updateDoc(itemRef, {
                                images: arrayUnion(url),
                            })
                        })
                    })
                }
            });
            alert("Success!");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div id={"marketplaceAddItem-page"}>
            <div id={"marketplaceAddItem-header"}>
                <div id={"marketplaceAddItem-backButton"}>
                    <a href={"/marketplace"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"marketplaceAddItem-marketplaceAddItemText"}>
                    <h3> For Rent </h3>
                </div>
            </div>
            <br></br>
            <form id="marketplaceAddItem-form" onSubmit={handleSave}>
                <div>
                    <div id={"marketplaceAddItem-inputBoxes"}>
                        <label id="marketplaceAddItem-LabelName">Name</label>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputName" type="text"
                               placeholder="Name" onChange={(e) => {
                            setName(e.target.value)
                        }}></input><br></br>

                        <label id="marketplaceAddItem-LabelEquipmentType">Equipment type</label>
                        <select className={"marketplaceAddItem-inputs"} onChange={e => setEquipmentType(e.target.value)}>
                            {allEquipmentTypes.map((equipmentType, index) => <option value={equipmentType.data().name}
                                                                                     key={index}>{equipmentType.data().name}</option>)}
                        </select>
                        <br></br>

                        <label id="marketplaceAddItem-LabelSite">Site</label>
                        <select className={"marketplaceAddItem-inputs"} onChange={e => setSite(e.target.value)}>
                            {allSites.map((site, index) => <option value={site.data().siteName}
                                                                   key={index}>{site.data().siteName}</option>)}
                        </select>
                        <br></br>

                        <label id="marketplaceAddItem-LabelDescription">Description</label>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputDescription"
                               type="text" placeholder="Description"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelDailyPrice">Daily Price</label>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputDailyPrice" type="text"
                               placeholder="Daily Price"
                               onChange={(e) => {
                                   setDailyPrice(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelWeeklyPrice">Weekly Price</label>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputWeeklyPrice"
                               type="text" placeholder="Weekly Price"
                               onChange={(e) => {
                                   setWeeklyPrice(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelMonthlyPrice">Monthly Price</label>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputMonthlyPrice"
                               type="text" placeholder="Monthly Price"
                               onChange={(e) => {
                                   setMonthlyPrice(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelFromDate">From Date</label><br></br>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputFromDate" type="date"
                               placeholder="From date"
                               onChange={(e) => {
                                   setFromDate(e.target.value)
                               }}></input><br></br>
                        <br></br>

                        <label id="marketplaceAddItem-LabelToDate">To Date</label><br></br>
                        <input className="marketplaceAddItem-inputs" id="marketplaceAddItem-InputToDate" type="date"
                               placeholder="To date" onChange={(e) => {
                            setToDate(e.target.value)
                        }}></input><br></br>
                    </div>
                    <div id={"marketplaceAddItem-addImages"}>
                        <div id="pic">Pictures <input id="img" type="file" multiple accept="image/*"
                                                      onChange={changeHandler}
                        /></div>
                        <div>
                            {fileDataURL ?
                                <p className="preview">
                                    {
                                        <img className="preview" src={fileDataURL} alt="preview"/>
                                    }
                                </p> : null}
                            {isShown && (
                                <div>
                                    <button id="next" onClick={handleNext}></button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button id="marketplaceAddItem-marketplaceAddItembutton" type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}

export default MarketplaceAddItem;