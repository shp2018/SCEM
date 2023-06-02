import React, {useEffect, useState} from "react";
import {auth, firestore, storage} from "../firebase";
import {doc, addDoc, collection, getDocs, query, where, updateDoc, arrayUnion} from "firebase/firestore";
import '../css/marketplaceAddItem.css';
import {onAuthStateChanged} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function MarketplaceAddItem() {
    const [name, setName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [dailyPrice, setDailyPrice] = useState("");
    const [weeklyPrice, setWeeklyPrice] = useState("");
    const [monthlyPrice, setMonthlyPrice] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const imageMimeType = /image\/(png|jpg|jpeg|gif|webp)/i;
    const [files, setFiles] = useState(null);
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [imgNum, setImgNum] = useState(0);

    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");

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
                setAuthState(true);
                const ref = collection(firestore, "users");
                const q = query(ref, where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (!userName) setUserName(doc.data().fullname);
                });
            }
        })
    }

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
        console.log(imgNum);
        setFile(files[imgNum]);
    }

    const changeHandler = (e) => {
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

    const handleSave = async (e) => {
        e.preventDefault();

        if (!authState) {
            alert("Please login first.");
            return;
        }

        const marketplaceRef = collection(firestore, "marketplace");

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
            dateCreated: date,
            timeCreated: time(),
            images: [],
        };
        try {
            addDoc(marketplaceRef, data).then((res) => {
                for (let i = 0; i < files.length; i++) {
                    const storageRef = ref(storage, `/marketplaceImages/${res._key.path.lastSegment()}/${i + 1}`);
                    uploadBytes(storageRef, files[i]).then(() => {
                        console.log("Uploaded image " + i);
                        getDownloadURL(storageRef).then((url) => {
                            console.log(url);
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
        <body>
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
                        <input id="marketplaceAddItem-InputName" type="text" placeholder="Name" onChange={(e) => {
                            setName(e.target.value)
                        }}></input><br></br>

                        <label id="marketplaceAddItem-LabelEquipmentType">Equipment type</label>
                        <input id="marketplaceAddItem-InputEquipmentType" type="text" placeholder="Equipment type"
                               onChange={(e) => {
                                   setEquipmentType(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelSite">Site</label>
                        <input id="marketplaceAddItem-InputSite" type="text" placeholder="Site" onChange={(e) => {
                            setSite(e.target.value)
                        }}></input><br></br>

                        <label id="marketplaceAddItem-LabelDescription">Description</label>
                        <input id="marketplaceAddItem-InputDescription" type="text" placeholder="Description"
                               onChange={(e) => {
                                   setDescription(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelDailyPrice">Daily Price</label>
                        <input id="marketplaceAddItem-InputDailyPrice" type="text" placeholder="Daily Price"
                               onChange={(e) => {
                                   setDailyPrice(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelWeeklyPrice">Weekly Price</label>
                        <input id="marketplaceAddItem-InputWeeklyPrice" type="text" placeholder="Weekly Price"
                               onChange={(e) => {
                                   setWeeklyPrice(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelMonthlyPrice">Monthly Price</label>
                        <input id="marketplaceAddItem-InputMonthlyPrice" type="text" placeholder="Monthly Price"
                               onChange={(e) => {
                                   setMonthlyPrice(e.target.value)
                               }}></input><br></br>

                        <label id="marketplaceAddItem-LabelFromDate">From Date</label><br></br>
                        <input id="marketplaceAddItem-InputFromDate" type="date" placeholder="From date"
                               onChange={(e) => {
                                   setFromDate(e.target.value)
                               }}></input><br></br>
                        <br></br>

                        <label id="marketplaceAddItem-LabelToDate">To Date</label><br></br>
                        <input id="marketplaceAddItem-InputToDate" type="date" placeholder="To date" onChange={(e) => {
                            setToDate(e.target.value)
                        }}></input><br></br>
                    </div>
                    <div id={"marketplaceAddItem-addImages"}>
                        <div id="pic">Pictures <input id="img" type="file" multiple accept="image/*" onChange={changeHandler}
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
        </body>
    );
}

export default MarketplaceAddItem;