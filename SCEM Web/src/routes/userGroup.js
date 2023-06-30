import React, {useState, useEffect} from 'react';
import "../css/userGroup.css";
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebase";

const UserGroup = () => {
    const [userGroupIDs, setUserGroupIDs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const dropdown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = (event) => {
        if (event.target.matches('.userManagement-dropdownButton')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i].classList.contains('show')) {
                    dropdowns[i].classList.remove('show');
                }
            }
        }
    }

    const getUserGroupsData = async () => {
        const userGroupsRef = collection(firestore, "userGroups");
        const userGroupsQuery = query(userGroupsRef);
        const querySnapshot = await getDocs(userGroupsQuery);
        setUserGroupIDs([]);

        querySnapshot.forEach(doc => {
            let data = doc.data();
            setUserGroupIDs(curr => [...curr,
                <tr key={doc.id}>
                    <td className={"userGroups-tableElement"}>{}</td>
                    <td className={"userGroups-tableElement"}>{data.name}</td>
                    <td className={"userGroups-tableElement"}>{data.active ? "On" : "Off"}</td>
                    <td className={"userGroups-tableElement"}>
                        <div className={"userManagement-dropdownDiv"}>
                            <button onClick={dropdown} className={"userManagement-dropdownButton"}
                                    id={"userManagement-dropDownButtonID"}><img
                                src={"/triangle-right.svg"}
                                alt={"Right arrow used to redirect user to item link."}
                                id={"userManagement-tableLinkArrow"}>
                            </img></button>
                            <div id={"myDropdown"} className={"dropdown-content"}>
                                <a href={`/userGroup`} className={"userManagement-dropdownButton"}>Edit</a>
                                <a href={`/userGroup`} className={"userManagement-dropdownButton"}>Permission</a>
                                <button className={"userManagement-dropdownButton"}
                                        id={"userManagement-dropdownCancel"}>Cancel
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>])
        })
    }

    useEffect(() => {
        getUserGroupsData().then(() => {
            setLoaded(true);
        })
    }, []);

    return (
        <div id={"userGroups-body"}>
            <div id={"userGroups-header"}>
                <div id={"userGroups-backButton"}>
                    <a href={"/"}
                       className={"arrow left"}>
                    </a>
                </div>
                <div id={"userGroups-titleText"}>
                    <h3 id={"userGroups-titleText"}>User Group</h3>
                </div>
                <div id={"userGroups-addButtonDiv"}>
                    <a href={"/userGroup/create"} id={"userGroups-addButtonLink"}>
                        <img src={"/locationAdd.png"} id={"userGroups-addButton"}
                             alt={"Add user group button"}>
                        </img>
                    </a>
                </div>
            </div>

            <div id={"userGroups-tableDiv"}>
                {loaded ?
                    <table
                    className={"userGroups-tableElement"}
                    id={"userGroups-table"}>
                        <tbody>
                        <tr>
                            <th className={"userGroups-tableHeading"}>#</th>
                            <th className={"userGroups-tableHeading"}>Name</th>
                            <th className={"userGroups-tableHeading"}>Active</th>
                            <th className={"userGroups-tableHeading"}></th>
                        </tr>
                        {userGroupIDs}
                        </tbody>
                    </table>
                    : <p className={"loading"}>Loading...</p>}
            </div>
        </div>
    );
}

export default UserGroup;