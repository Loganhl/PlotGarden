import logo from './logo.svg';
import './App.css';

import React from "react";
import {Routes, Route} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';


import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GardenDetailPage from './pages/GardenDetailPage';
import GardensPage from './pages/GardensPage';
import CropPage from './pages/CropPage';
import SelectCropsPage from './pages/SelectCropsPage';
import GuidesPage from './pages/GuidesPage';
import AddGardenPage from './pages/AddGardenPage';
import CropList from './pages/CropList';

function App() {

  const { isLoading, error } = useAuth0();
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Navbar />
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
    
      <Routes>
        <Route path="/" element={
          <LandingPage />
        }/>
        <Route path="/gardens" element={
          isAuthenticated && (
            <GardensPage />
          )
        }/>
        <Route path="/garden/:id" element={
          isAuthenticated && (
            <GardenDetailPage />
          )
        }/>
        <Route path="/add-garden" element={
          isAuthenticated && (
            <AddGardenPage />
          )
        }/>
        <Route path="/crops" element={
          <CropList />
        }/>
        <Route path="/crop/:id" element={ 
            <CropPage />
        }/>
        <Route path="/select-crops" element={
          isAuthenticated && (
            <SelectCropsPage />
          )
        }/>
        <Route path="/guides" element={
            <GuidesPage />
        }/>

      </Routes>

    </div>
  );
}

export default App;
