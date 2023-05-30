import {useEffect, useState} from 'react';
import '../css/post.css';
import {firestore} from "../firebase";
import {collection, addDoc} from "firebase/firestore";

const ref = firestore;
const dbRef = collection(ref, "equipmentForRent");
const imageMimeType = /image\/(png|jpg|jpeg|gif|webp)/i;

function Post() {
    const [files, setFiles] = useState(null);
    const [file, setFile] = useState(null);
    const [equipment, setEquipment] = useState('');
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [dPrice, setDPrice] = useState('');
    const [wPrice, setWPrice] = useState('');
    const [mPrice, setMPrice] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fileDataURL, setFileDataURL] = useState(null);
    const [imgNum, setImgNum] = useState(0)
    const [isShown, setIsShown] = useState(false);
    const refresh = () => window.location.reload(true)

    const handleIncrement = () => {

        setImgNum(imgNum + 1)

    }
    const changeHandler = (e) => {
        const files = e.target.files;
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
        setFiles(files)
        setIsShown(current => !current);
    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const {result} = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);
    const handleNext = () => {
        const n = files.length - 1
        if (imgNum < n) {
            handleIncrement()
        } else {
            setImgNum(0)
        }
        console.log(imgNum)
        setFile(files[imgNum])

    }
    const handleEquipment = (e) => {
        setEquipment(e.target.value)
    }
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleInfo = (e) => {
        setInfo(e.target.value)
    }
    const handleDPrice = (e) => {
        setDPrice(e.target.value)
    }
    const handleWPrice = (e) => {
        setWPrice(e.target.value)
    }
    const handleMPrice = (e) => {
        setMPrice(e.target.value)
    }
    const handleFromDate = (e) => {
        setFromDate(e.target.value)
    }
    const handleToDate = (e) => {
        setToDate(e.target.value)
    }

    const handlePost = (e) => {
        console.log("Equpment: " + equipment, "Title: " + title, "Info: " + info, "Daily: " + dPrice, "Weekly: " + wPrice, "Monthly: " + mPrice, "From" + fromDate, "To" + toDate, "Images: " + files)


        const data = {
            Equipment: equipment,
            Title: title,
            Info: info,
            DailyPrice: dPrice,
            WeeklyPrice: wPrice,
            MonthlyPrice: +mPrice,
            Images: files,
            FromDate: fromDate,
            ToDate: toDate
        }

        addDoc(dbRef, data)
            .then(docRef => {
                console.log("Document has been added successfully");
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div id="equipment">Equipment</div>
            <select name="equipment" id="equipmentDrop" onChange={handleEquipment}>
                <option value="P1">Product 1</option>
                <option value="P2">Product 2</option>
                <option value="P3">Product 3</option>
                <option value="P4">Product 4</option>
            </select>
            <div id="title">Title</div>
            <input id="titleInput" name="title" onChange={handleTitle}></input>
            <div id="other">Other Information</div>
            <input id="otherInput" onChange={handleInfo}></input>
            <div id="dprice">Daily Price</div>
            <input type="number" id="dpriceInput" onChange={handleDPrice}></input>
            <div id="wprice">Weekly Price</div>
            <input type="number" id="wpriceInput" onChange={handleWPrice}></input>
            <div id="mprice">Monthly Price</div>
            <input id="mpriceInput" type="number" onChange={handleMPrice}></input>
            <div id="fromDatetext">From Date <span id="toDatetext">To Date</span></div>
            <input id="fromDate" type="date" onChange={handleFromDate}></input> <input id="toDate" type="date"
                                                                                       onChange={handleToDate}></input>
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


            <br></br>

            <button id="post" onClick={handlePost}>Post</button>
            <button id="clear" onClick={refresh}>Clear</button>


        </div>

    )
}

export default Post;