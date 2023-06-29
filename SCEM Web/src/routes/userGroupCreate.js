import React, {useState} from 'react';
import {collection, addDoc, getDocs, query, where} from 'firebase/firestore';
import {firestore} from '../firebase';
import '../css/userGroupCreate.css';

const UserGroupCreate = () => {
    const [groupName, setGroupName] = useState('');
    const [userInGroup, setUserInGroup] = useState('');
    const [users, setUsers] = useState([]);
    const [rentChecked, setRentChecked] = useState(false);
    const [forRentChecked, setForRentChecked] = useState(false);
    const [viewAllChecked, setViewAllChecked] = useState(false);

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleUserInGroupChange = (event) => {
        setUserInGroup(event.target.value);
    };

    const handleRentChange = () => {
        setRentChecked(!rentChecked);
    };

    const handleForRentChange = () => {
        setForRentChecked(!forRentChecked);
    };

    const handleViewAllChange = () => {
        setViewAllChecked(!viewAllChecked);
    };

    const handleAddUser = async () => {
        const usersCollectionRef = collection(firestore, 'users');
        const usersQuery = query(usersCollectionRef, where('email', '==', userInGroup));
        const userSnapshot = await getDocs(usersQuery);

        if (userSnapshot.empty) {
            console.log('User not found');
            return;
        }

        const userDoc = userSnapshot.docs[0];
        const userId = userDoc.id;

        setUsers((prevUsers) => [
            ...prevUsers,
            {id: userId, name: userDoc.data().fullname, email: userInGroup},
        ]);
        setUserInGroup('');
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleSaveUserGroup = async () => {
        const userGroupsCollectionRef = collection(firestore, 'userGroups');

        const newUserGroup = {
            name: groupName,
            rent: rentChecked,
            forRent: forRentChecked,
            viewAll: viewAllChecked,
            users: users.map((user) => user.id),
            active: true,
        };

        await addDoc(userGroupsCollectionRef, newUserGroup).then(() => {
            alert("User group added.");
        });

        setGroupName('');
        setUsers([]);
    };

    return (
        <div id="userGroup-body">
            <div id="userGroup-header">
                <div id="userGroup-backButton">
                    <a href="/userGroup" className="arrow left"></a>
                </div>
                <h3 id="userGroup-titleText">Create User Group</h3>
            </div>

            <div id="userGroup-inputBox">
                <input
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    placeholder="User Group Name"
                />
            </div>
            <h4 id="userGroup-permissionsHeader">User Group permissions</h4>
            <div id="userGroup-checkboxes">
                <label>
                    <input
                        type="checkbox"
                        checked={rentChecked}
                        onChange={handleRentChange}
                        className="checkbox"
                    />
                    <span className="checkbox-label">Rent</span>
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={forRentChecked}
                        onChange={handleForRentChange}
                        className="checkbox"
                    />
                    <span className="checkbox-label">For Rent</span>
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={viewAllChecked}
                        onChange={handleViewAllChange}
                        className="checkbox"
                    />
                    <span className="checkbox-label">View All</span>
                </label>
            </div>
            <div id="userGroup-addUserSection">
                <input
                    type="text"
                    value={userInGroup}
                    onChange={handleUserInGroupChange}
                    placeholder="User in Group"
                />
                <button id="userGroup-addButton" onClick={handleAddUser}>
                    Add
                </button>
            </div>
            <br/>
            <table id={"userGroup-table"}>
                <thead id={"userGroup-tableHead"}>
                <tr>
                    <th className={"userGroup-tableHeading"}>STT</th>
                    <th className={"userGroup-tableHeading"}>Name</th>
                    <th className={"userGroup-tableHeading"}>Email</th>
                    <th className={"userGroup-tableHeading"}></th>
                </tr>
                </thead>
                <tbody id={"userGroup-tableBody"}>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="remove-button"
                            >
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <button id="userGroup-saveButton" onClick={handleSaveUserGroup}>
                Update
            </button>
        </div>
    );
};

export default UserGroupCreate;