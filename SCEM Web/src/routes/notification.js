import React, {useState, useEffect} from 'react';
import '../css/notification.css';
import {onAuthStateChanged} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [authState, setAuthState] = useState(false);
    const [userID, setUserID] = useState(null);

    const getUserData = () => {
        onAuthStateChanged(auth, user => {
            if (auth) {
                setAuthState(true);
                setUserID(user.uid);
            }
        });
    }

    const getAllNotifications = async () => {
        const notificationRef = collection(firestore, "notification");
        const dataQuery = query(notificationRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(dataQuery);
        let dataQueried = [];
        querySnapshot.forEach(doc => {
            dataQueried.push(doc);
        });
        setNotifications(dataQueried);
    }

    useEffect(getUserData, [authState]);

    useEffect(() => {
        getAllNotifications();
    }, [authState]);

    return (
        <div id={"notification-page"}>
            <div id={"notification-header"}>
                <div id={"notification-backButtonDiv"}>
                    <a href={"/user"} className={"arrow left"}></a>
                </div>
                <h3 id={"notification-titleText"}>Notification</h3>
            </div>
            <div id={"notification-data"}>
                {authState ?
                    notifications.map(doc =>
                        <div key={doc.id} className={"notification-notificationDiv"}>
                            <p className={"notification-content"}>{doc.data().content.length > 125 ? doc.data().content.substring(0, 125) + "..." : doc.data().content}</p>
                            <p className={"notification-datePosted"}>{doc.data().datePosted}</p>
                            <p className={"notification-timePosted"}>{doc.data().timePosted}</p>
                        </div>)
                    : <p id={"notification-loading"}>Loading...</p>}
            </div>
        </div>
    );
}

export default Notification;