import React, {useState, useEffect} from 'react';
import '../css/changeProfile.css';
import {auth, firestore, storage} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes, uploadBytesResumable} from "firebase/storage";

const ChangeProfile = () => {
    const [authState, setAuthState] = useState(false);
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");
    const [userID, setUserID] = useState(null);

    const getUserData = () => {
        onAuthStateChanged(auth, async () => {
            if (auth) {
                const docSnap = await getDoc(doc(firestore, "users", auth.currentUser.uid));
                setEmail(docSnap.data().email);
                setFullname(docSnap.data().fullname);
                setGender(docSnap.data().gender);
                setBirthday(docSnap.data().birthday);
                setAddress(docSnap.data().address);
                setProfilePicture(docSnap.data().profilePicture);
                setUserID(auth.currentUser.uid);
                setAuthState(true);
            }
        });
    }

    useEffect(getUserData, [authState]);

    const handleChangeProfile = async e => {
        e.preventDefault();

        await updateDoc(doc(firestore, "users", userID), {
            fullname, email, gender, birthday, address
        }).then(() => {
            const storageRef = ref(storage, `/userProfilePictures/${userID}`);
            uploadBytes(storageRef, profilePicture).then(() => {
                getDownloadURL(storageRef).then(url => {
                    updateDoc(doc(firestore, "users", userID), {
                        profilePicture: url
                    }).then(() => {
                        alert("Update success!");
                    });
                });
            }).catch(err => {
                console.error(err);
            });
        });
    }

    const handleUploadImage = () => {
        const input = document.getElementById("changeProfile-imageInput");
        if (input.files.length > 1) {
            alert("Please only upload one image!");
            return;
        }
        const file = input.files[0];
        setUploadedImage(URL.createObjectURL(file));
        setProfilePicture(file);
    }

    return (
        <>
            {authState ?
                <div id={"changeProfile-page"}>
                    <div id={"changeProfile-header"}>
                        <div id={"changeProfile-backButtonDiv"}>
                            <a href={"/user"} className={"arrow left"}></a>
                        </div>
                        <h3 id={"changeProfile-titleText"}>Change Profile</h3>
                    </div>
                    <form onSubmit={handleChangeProfile}>
                        <div className={"changeProfile-formDivs"}>
                            <label className={"changeProfile-formLabels"}>Email</label>
                            <br></br>
                            <input className={"changeProfile-formInputs"} id={"changeProfile-emailInput"} type={"email"}
                                   defaultValue={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className={"changeProfile-formDivs"}>
                            <label className={"changeProfile-formLabels"}>Full Name</label>
                            <br></br>
                            <input className={"changeProfile-formInputs"} defaultValue={fullname}
                                   onChange={e => setFullname(e.target.value)}/>
                        </div>
                        <div className={"changeProfile-formDivs"}>
                            <label className={"changeProfile-formLabels"}>Gender</label>
                            <br></br>
                            <select className={"changeProfile-formInputs"} id={"changeProfile-genderInput"}
                                    defaultValue={gender} onChange={e => setGender(e.target.value)}>
                                <option value={"Female"} selected={gender === "Female"}>Female</option>
                                <option value={"Male"} selected={gender === "Male"}>Male</option>
                                <option value={"Other"} selected={gender === "Other"}>Other</option>
                            </select>
                        </div>
                        <div className={"changeProfile-formDivs"}>
                            <label className={"changeProfile-formLabels"}>Birthday</label>
                            <br></br>
                            <input className={"changeProfile-formInputs"} type={"date"} defaultValue={birthday}
                                   onChange={e => setBirthday(e.target.value)}/>
                        </div>
                        <div className={"changeProfile-formDivs"}>
                            <label className={"changeProfile-formLabels"}>Address</label>
                            <br></br>
                            <input className={"changeProfile-formInputs"} defaultValue={address}
                                   onChange={e => setAddress(e.target.value)}/>
                        </div>
                        <div className={"changeProfile-formDivs"}>
                            <label className={"changeProfile-formLabels"}>Avatar</label>
                            <br></br>
                            {!uploadedImage ?
                                <img src={profilePicture} id={"changeProfile-profilePicture"}
                                     alt={"Profile Avatar"}/> :
                                <img src={uploadedImage} id={"changeProfile-profilePicture"}
                                     alt={"Profile Avatar"}/>}
                            <br></br>
                            <input type={"file"} accept={"image/jpeg, image/png, image/jpg"}
                                   id={"changeProfile-imageInput"} onChange={handleUploadImage}/>
                        </div>
                        <button type={"submit"} id={"changeProfile-button"}>Update</button>
                    </form>
                </div>
                : <p id={"changeProfile-loading"}>Loading...</p>
            }
        </>
    );
}

export default ChangeProfile;