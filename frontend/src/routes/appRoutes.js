import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/homePage/home';
import AddDevice from '../components/addDevice/addDevice';
import LocationDetails from '../components/locationDetails/locationDetails';
import AddLocation from '../components/Addform/addLocation';
import Device from '../components/devicePage/devicePage';
import Location from '../components/locationPage/locationPage';

 
function AppRoutes() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
            <Route path="" element={<AddLocation/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/adddevice" element={<AddDevice/>}/>
            <Route path="/locationdetails/:id" element={<LocationDetails/>}/>
            <Route path="/devicepage" element={<Device/>}/>
            <Route path="/locationpage" element={<Location/>}/>

               
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default AppRoutes;