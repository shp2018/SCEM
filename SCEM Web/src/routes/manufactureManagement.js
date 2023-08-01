import React, {useState, useEffect} from 'react';
import '../css/manufactureManagement.css';

const ManufactureManagement = () => {
    const handleSearch = e => {
        e.preventDefault();
    }

    return (
        <div id={"manufactureManagement-page"}>
            <div id={"manufactureManagement-header"}>
                <div id={"manufactureManagement-backButtonDiv"}>
                    <a href={"/"} className={"arrow left"}></a>
                </div>
                <h3 id={'manufactureManagement-titleText'}>Manufacture Management</h3>
            </div>
            <form id={"manufactureManagement-form"} onSubmit={handleSearch}>
                <label>Name</label>
                <br></br>
                <input/>
                <br></br>
                <button id={"manufactureManagement-button"} type={"submit"}>Search</button>
            </form>
            <a href={"/manufactureManagement/create"}>Create</a>
        </div>
    );
}

export default ManufactureManagement;