import React, {useEffect, useState} from "react";
import {auth, firestore} from "../firebase";
import {doc, setDoc, collection, getDocs, query, where, getDoc, updateDoc} from "firebase/firestore";
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
    const [loaded, setLoaded] = useState(false);

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

    const getCompanyData = async () => {
        const companyRef = collection(firestore, "company");
        const companyQuery = query(companyRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(companyQuery);

        if (querySnapshot.size === 0) return;

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            setcName(data.companyName);
            setaccType(data.accountType);
            setcEmail(data.companyEmail);
            setcNumber(data.companyNumber);
            setcOwner(data.companyOwner);
            settEmail(data.techEmail);
            settNumber(data.techNumber);
            settName(data.techName);
            settaxID(data.taxID);
        })
    }

    useEffect(() => {
        checkAuthState().then(() => {
            getCompanyData().then(() => {
                setLoaded(true);
            });
        });
    }, [userID]);


    const handleSave = async (e) => {
        e.preventDefault();

        if (!authState) {
            alert("Please login first.");
            return;
        }

        const companyProfileRef = doc(firestore, "company", cEmail);
        const companyData = await getDoc(companyProfileRef);

        let data = {
            companyName: cName,
            companyEmail: cEmail,
            companyNumber: cNumber,
            companyOwner: cOwner,
            techEmail: tEmail,
            techNumber: tNumber,
            techName: tName,
            taxID: taxID,
            accountType: accType,
            userCreated: userName,
            userID: userID,
        };

        if (companyData.exists()) {
            await updateDoc(companyProfileRef, data);
            alert("Existing company profile data has been updated");
        } else {
            await setDoc(companyProfileRef, data)
            alert("New company profile data has been created");
        }
    }

    return (
        <div>
            {loaded ? <div id={"companyProfile-page"}>
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
                            }}
                                   defaultValue={cName}></input><br></br>

                            <label id="companyProfile-Label">Company Email</label>
                            <input id="companyProfile-Input" type="text" placeholder="Company email"
                                   onChange={(e) => {
                                       setcEmail(e.target.value)
                                   }}
                                   defaultValue={cEmail}></input><br></br>

                            <label id="companyProfile-Label">Company Phone Number</label>
                            <input id="companyProfile-Input" type="text" placeholder="Company phone number"
                                   onChange={(e) => {
                                       setcNumber(e.target.value)
                                   }}
                                   defaultValue={cNumber}></input><br></br>

                            <label id="companyProfile-Label">Company Owner</label>
                            <input id="companyProfile-Input" type="text" placeholder="Company owner"
                                   onChange={(e) => {
                                       setcOwner(e.target.value)
                                   }}
                                   defaultValue={cOwner}></input><br></br>

                            <label id="companyProfile-Label">Technical Support Email</label>
                            <input id="companyProfile-Input" type="text" placeholder="Technical support email"
                                   onChange={(e) => {
                                       settEmail(e.target.value)
                                   }}
                                   defaultValue={tEmail}></input><br></br>

                            <label id="companyProfile-Label">Technical Support Phone</label>
                            <input id="companyProfile-Input" type="text" placeholder="Technical support phone"
                                   onChange={(e) => {
                                       settNumber(e.target.value)
                                   }}
                                   defaultValue={tNumber}></input><br></br>

                            <label id="companyProfile-Label">Technical Person Name </label>
                            <input id="companyProfile-Input" type="text" placeholder="Technical person name"
                                   onChange={(e) => {
                                       settName(e.target.value)
                                   }}
                                   defaultValue={tName}></input><br></br>

                            <label id="companyProfile-Label">Tax ID</label><br></br>
                            <input id="companyProfile-Input" type="text" placeholder="Tax ID"
                                   onChange={(e) => {
                                       settaxID(e.target.value)
                                   }}
                                   defaultValue={taxID}></input><br></br>
                            <br></br>

                            <label id="companyProfile-Label">Account Type</label><br></br>
                            <select id="companyProfile-Input" placeholder="Account type"
                                    defaultValue={accType ? accType : "User"}
                                    onChange={(e) => {
                                        setaccType(e.target.value)
                                    }}>
                                <option>User</option>
                                <option>Company</option>
                            </select><br></br>
                        </div>

                        <button id="companyProfile-companyProfilebutton" type="submit">Update</button>
                    </div>
                </form>
            </div> : <p className={"loading"}> Loading... </p>}
        </div>
    )
}

export default CompanyProfile;