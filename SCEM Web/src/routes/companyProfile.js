import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
import {doc, addDoc, collection, getDocs, query, where, updateDoc, arrayUnion} from "firebase/firestore";
import '../css/companyProfile.css';
import {onAuthStateChanged} from "firebase/auth";


function CompanyProfile() {
    const [cName, setcName] = useState("");
    const [cEmail, setcEmail] = useState("");
    const [cNumber, setcNumber] = useState("");
    const [cOwner, setcOwner] = useState("");
    const [tEmail, settEmail] = useState("");
    const [tNumber, settNumber] = useState("");
    const [tName, settName] = useState("");
    const [taxID, settaxID] = useState("");
    const [accType, setaccType] = useState("");
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(null);


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

    useEffect(() => {
        checkAuthState();
    }, []);



    const handleSave = async (e) => {
        e.preventDefault();

        if (!authState) {
            alert("Please login first.");
            return;
        }

        const companyProfileRef = collection(firestore, "company");

        let data = {
            companyName: cName,
            companyEmail: cEmail,
            companyNumber: cNumber,
            companyOwner: cOwner,
            techEmail: tEmail,
            techNumber: tNumber,
            techName: tName,
            taxID: taxID,
            accountTypet: accType,
            userCreated: userName,
            userID: userID,
        };
        addDoc(companyProfileRef, data)

    
    }

    return (
        <body>
        <div id={"companyProfile-page"}>
            <div id={"companyProfile-header"}>
                <div id={"companyProfile-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"companyProfile-companyProfileText"}>
                    <h3> Company Profile Management </h3>
                </div>
            </div>
            <br></br>
            <form id="companyProfile-form" onSubmit={handleSave}>
                <div>
                    <div id={"companyProfile-inputBoxes"}>
                        <label id="companyProfile-Label">Company Name</label>
                        <input id="companyProfile-Input" type="text" placeholder="Company name" onChange={(e) => {
                            setcName(e.target.value)
                        }}></input><br></br>

                        <label id="companyProfile-Label">Company Email</label>
                        <input id="companyProfile-Input" type="text" placeholder="Company email"
                               onChange={(e) => {
                                   setcEmail(e.target.value)
                               }}></input><br></br>

                        <label id="companyProfile-Label">Company Phone Number</label>
                        <input id="companyProfile-Input" type="text" placeholder="Company phone number" onChange={(e) => {
                            setcNumber(e.target.value)
                        }}></input><br></br>

                        <label id="companyProfile-Label">Company Owner</label>
                        <input id="companyProfile-Input" type="text" placeholder="Company owner"
                               onChange={(e) => {
                                   setcOwner(e.target.value)
                               }}></input><br></br>

                        <label id="companyProfile-Label">Technical Support Email</label>
                        <input id="companyProfile-Input" type="text" placeholder="Technical support email"
                               onChange={(e) => {
                                   settEmail(e.target.value)
                               }}></input><br></br>

                        <label id="companyProfile-Label">Technical Support Phone</label>
                        <input id="companyProfile-Input" type="text" placeholder="Technical support phone"
                               onChange={(e) => {
                                   settNumber(e.target.value)
                               }}></input><br></br>

                        <label id="companyProfile-Label">Technical Person Name </label>
                        <input id="companyProfile-Input" type="text" placeholder="Technical person name"
                               onChange={(e) => {
                                   settName(e.target.value)
                               }}></input><br></br>

                        <label id="companyProfile-Label">Tax ID</label><br></br>
                        <input id="companyProfile-Input" type="text" placeholder="Tax ID"
                               onChange={(e) => {
                                   settaxID(e.target.value)
                               }}></input><br></br>
                        <br></br>

                        <label id="companyProfile-Label">Account Type</label><br></br>
                        <input id="companyProfile-Input" type="text" placeholder="Account type" onChange={(e) => {
                            setaccType(e.target.value)
                        }}></input><br></br>
                    </div>
                  

                    <button id="companyProfile-companyProfilebutton" type="submit">Update</button>
                </div>
            </form>
        </div>
        </body>
    )
}

export default CompanyProfile;