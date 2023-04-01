import React from "react";
import '../css/homeWithLogin.css';

function HomeWithLogin() {
    return (
        <div>
            <div id={"homeWithLogin-header"}>
                <img id="homeWithLogin-logo" src='logoTemp.jpg' alt={"SCEM logo"}></img>
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
                    <li> <a href={"/"}> Company </a></li>
                    <li> <a href={"/"}> Equipment </a>  </li>
                    <li> <a href={"/"}> For Rent </a>  </li>
                    <li> <a href={"/"}> Marketplace </a> </li>
                </ul>
            </nav>

            <div id={"homeWithLogin-menuItem"}>
                <img src={'rentMyEquipment.jpg'}
                     id={"homeWithLogin-menuItemIcons"}
                     alt={""}>
                </img>
                <a href={"/"}
                   id={"homeWithLogin-menuItemLinks"}> Rent my equipment </a>
            </div>
            <div id={"homeWithLogin-menuItem"}>
                <img src={'equipmentForRent.jpg'}
                     id={"homeWithLogin-menuItemIcons"}
                     alt={""}>
                </img>
                <a href={"/"}
                   id={"homeWithLogin-menuItemLinks"}> Equipment for rent </a>
            </div>

            <div id={"homeWithLogin-companyManagement"}>
                <h3 id={"homeWithLogin-companyManagementHeader"}> Company Management </h3>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'companyProfile.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/"}
                       id={"homeWithLogin-menuItemLinks"}> Company Profile </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'userGroup.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/"}
                       id={"homeWithLogin-menuItemLinks"}> User group </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'userManagement.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/"}
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
                    <a href={"/"}
                       id={"homeWithLogin-menuItemLinks"}> Equipment Group </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'equipmentManagement.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/"}
                       id={"homeWithLogin-menuItemLinks"}> Equipment Management </a>
                </div>

                <div id={"homeWithLogin-menuItem"}>
                    <img src={'siteAndTrackingLink.jpg'}
                         id={"homeWithLogin-menuItemIcons"}
                         alt={""}>
                    </img>
                    <a href={"/"}
                       id={"homeWithLogin-menuItemLinks"}> Site and Tracking link </a>
                </div>
            </div>

        </div>
    );
}

export default HomeWithLogin;