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

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/companyProfile" element={<CompanyProfile/>}/>
                <Route path="/locationGroup" element={<LocationGroup/>}/>
                <Route path="/locationGroup/create" element={<CreateLocationGroup/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path={"/marketplace"} element={<Marketplace/>}/>
                <Route path={"/marketplace/search"} element={<MarketplaceSearch/>}/>
                <Route path={"/marketplace/addItem"} element={<MarketplaceAddItem/>}/>
                <Route path={'/marketplace/:marketplaceId'} element={<MarketplaceItem/>}/>
                <Route path={'/equipmentForRent'} element={<EquipmentForRent/>}/>
                <Route path={"/profile/:profileId"} element={<Profile/>}/>
                <Route path={"/equipmentCurrentlyOnRent"} element={<EquipmentCurrentlyOnRent/>}/>
                <Route path={"/myRentalManagement"} element={<MyRentalManagement/>}/>
            </Routes>
        </Router>
    );
}

export default App;