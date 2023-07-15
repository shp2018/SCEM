import React from 'react';
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Signup from './routes/signup';
import Login from './routes/login';
import Home from './routes/home';
import ForgotPassword from './routes/forgot';
import Marketplace from './routes/marketplace';
import MarketplaceSearch from './routes/marketplaceSearch';
import MarketplaceAddItem from './routes/marketplaceAddItem';
import MarketplaceItem from './routes/marketplaceItem';
import EquipmentForRent from "./routes/equipmentForRent";
import Profile from './routes/profile';
import CompanyProfile from './routes/companyProfile';
import MyRentalManagement from "./routes/myRentalManagement";
import EquipmentCurrentlyOnRent from "./routes/equipmentCurrentlyOnRent";
import CreateLocationGroup from './routes/createLocationGroup';
import LocationGroup from './routes/locationGroup';
import CreateSite from './routes/createSite';
import CompanyLocations from './routes/companyLocations';
import UserManagement from "./routes/userManagement";
import UserManagementCreateUser from "./routes/userManagement-createUser";
import UserGroup from "./routes/userGroup";
import UserGroupCreate from "./routes/userGroupCreate";
import EquipmentGroup from "./routes/equipmentGroup";
import CreateEquipmentGroup from './routes/createEquipmentGroup';
import EquipmentType from "./routes/equipmentType";
import EquipmentTypeCreate from "./routes/equipmentType-create";
import EquipmentManagement from "./routes/equipmentManagement";
import CreateEquipmentManagement from "./routes/createEquipmentManagement";
import ViewEquipmentList from "./routes/viewEquipmentList";
import ToolAlerts from './routes/toolAlerts';
import CreateToolAlerts from './routes/createToolAlerts';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/companyProfile"} element={<CompanyProfile/>}/>
                <Route path={"/locationGroup"} element={<LocationGroup/>}/>
                <Route path={"/locationGroup/create"} element={<CreateLocationGroup/>}/>
                <Route path={"/forgotPassword"} element={<ForgotPassword/>}/>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/companyProfile"} element={<CompanyProfile/>}/>
                <Route path={"/locationGroup"} element={<LocationGroup/>}/>
                <Route path={"/locationGroup/create"} element={<CreateLocationGroup/>}/>
                <Route path={"/forgotPassword"} element={<ForgotPassword/>}/>
                <Route path={"/companyLocation"} element={<CompanyLocations/>}/>
                <Route path={"/companyLocation/create"} element={<CreateSite/>}/>
                <Route path={"/marketplace"} element={<Marketplace/>}/>
                <Route path={"/marketplace/search"} element={<MarketplaceSearch/>}/>
                <Route path={"/marketplace/addItem"} element={<MarketplaceAddItem/>}/>
                <Route path={'/marketplace/:marketplaceId'} element={<MarketplaceItem/>}/>
                <Route path={'/equipmentForRent'} element={<EquipmentForRent/>}/>
                <Route path={"/profile/:profileId"} element={<Profile/>}/>
                <Route path={"/equipmentCurrentlyOnRent"} element={<EquipmentCurrentlyOnRent/>}/>
                <Route path={"/myRentalManagement"} element={<MyRentalManagement/>}/>
                <Route path={"/userManagement"} element={<UserManagement/>}/>
                <Route path={"/userManagement/createUser"} element={<UserManagementCreateUser/>}/>
                <Route path={"/userGroup"} element={<UserGroup/>}/>
                <Route path={"/userGroup/create"} element={<UserGroupCreate/>}/>
                <Route path={"/equipmentGroup"} element={<EquipmentGroup/>}/>
                <Route path={"/equipmentGroup/create"} element={<CreateEquipmentGroup/>}/>
                <Route path={"/equipmentType"} element={<EquipmentType/>}/>
                <Route path={"/equipmentType/create"} element={<EquipmentTypeCreate/>}/>
                <Route path={"/equipmentManagement"} element={<EquipmentManagement/>}/>
                <Route path={"/equipmentManagement/create"} element={<CreateEquipmentManagement/>}/>
                <Route path={"/viewEquipmentList"} element={<ViewEquipmentList/>}/>
                <Route path={"/toolAlerts"} element={<ToolAlerts/>}/>
                <Route path={"/toolAlerts/create"} element={<CreateToolAlerts/>}/>
            </Routes>
        </Router>
    );
}

export default App;