import React, {useEffect, useState} from "react";
import '../css/homeWithLogin.css';
import {auth, firestore} from "../firebase";
import {doc, getDoc} from "firebase/firestore";

const HomeWithLogin = () => {
    const [loaded, setLoaded] = useState(false);

    const getAuthData = async () => {
        const ref = doc(firestore, "users", auth.currentUser.uid);
        const docSnap = await getDoc(ref);
        auth.currentUser.displayName = docSnap.data().fullname;
    }

    useEffect(() => {
        getAuthData().then(() => {
            setLoaded(true);
        });
    }, []);

    return (
        <div id={"homeWithLogin-body"}>
            <div id={"homeWithLogin-header"}>
                <img id="homeWithLogin-logo" src="/logoWithBackground.jpg" alt={"SCEM logo"}></img>
            </div>

            <div id={"homeWithLogin-userInfo"}>
                {loaded ? <p> Welcome! <a href={"/user"} id={"homeWithLogin-displayName"}>{auth.currentUser.displayName}</a></p> : <p className={"homeWithLogin-loading"}> Loading... </p>}
            </div>

            <div id={"homeWithLogin-suggestions"}>
                <p> AI Suggestions: Equipment A needs urgent maintenance to avoid future breakdown. </p>
            </div>

            <nav id={"homeWithLogin-navbar"}>
                <ul id={"homeWithLogin-iconBar"}>
                    <img src={'company.png'}
                         id={"homeWithLogin-icons"}
                         alt={"Generic Company Logo"}></img>
                    <img src={'equipment.png'}
                         id={"homeWithLogin-icons"}
                         alt={"Generic Equipment Logo"}></img>
                    <img src={'rent.png'}
                         id={"homeWithLogin-icons"}
                         alt={"Generic Rent Logo"}></img>
                    <img src={'marketplace.png'}
                         id={"homeWithLogin-icons"}
                         alt={"Generic Company Logo"}></img>
                </ul>

                <ul id={"homeWithLogin-links"}>
                    <li><a href={"/companyProfile"}> Company </a></li>
                    <li><a href={"/myRentalManagement"}> Equipment </a></li>
                    <li><a href={"/marketplace/addItem"}> For Rent </a></li>
                    <li><a href={"/marketplace"}> Marketplace </a></li>
                </ul>
            </nav>

            <div id={"homeWithLogin-menuItem"}>
                <img src={'rentMyEquipment.jpg'}
                     id={"homeWithLogin-menuItemIcons"}
                     alt={""}>
                </img>
                <a href={"/marketplace/addItem"}
                   id={"homeWithLogin-menuItemLinks"}> Rent my equipment </a>
            </div>
            <div id={"homeWithLogin-menuItem"}>
                <img src={'equipmentForRent.jpg'}
                     id={"homeWithLogin-menuItemIcons"}
                     alt={""}>
                </img>
                <a href={"/equipmentForRent"}
                   id={"homeWithLogin-menuItemLinks"}> Equipment for rent </a>
            </div>
            <div id={"homeWithLogin-menuItem"}>
                <img src={'equipmentForRent.jpg'}
                     id={"homeWithLogin-menuItemIcons"}
                     alt={""}>
                </img>
                <a href={"/equipmentCurrentlyOnRent"}
                   id={"homeWithLogin-menuItemLinks"}> Equipment currently on rent </a>
            </div>

            <div id={"homeWithLogin-companyManagement"}>
                <h3 id={"homeWithLogin-companyManagementHeader"}> Company Management </h3>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'companyProfile.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/companyProfile"}
                       id={"homeWithLogin-menuItemLinks"}> Company Profile </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'userGroup.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/userGroup"}
                       id={"homeWithLogin-menuItemLinks"}> User group </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'userManagement.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/userManagement"}
                       id={"homeWithLogin-menuItemLinks"}> User management </a>
                </div>
            </div>

            <div id={"homeWithLogin-equipmentManagement"}>
                <h3 id={"homeWithLogin-equipmentManagementHeader"}> Equipment Management </h3>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'equipmentGroup.jpeg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/equipmentGroup"}
                       id={"homeWithLogin-menuItemLinks"}> Equipment Group </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'equipmentGroup.jpeg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/equipmentType"}
                       id={"homeWithLogin-menuItemLinks"}> Equipment Type </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'equipmentManagement.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/equipmentManagement"}
                       id={"homeWithLogin-menuItemLinks"}> Equipment Management </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'siteAndTrackingLink.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/siteAndTrackingLink"}
                       id={"homeWithLogin-menuItemLinks"}> Site and Tracking link </a>
                </div>
            </div>

        </div>
    );
}

export default HomeWithLogin;