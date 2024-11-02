import logo from './logo.svg';
import './App.css';

import React from "react";
import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import GardenPage from './pages/GardenPage';
import CropPage from './pages/CropPage';
import SelectCropsPage from './pages/SelectCropsPage';
import SoilGuidePage from './pages/SoilGuide';
import AddGardenPage from './pages/AddGardenPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <LandingPage />
        }/>
        <Route path="/home" element={
          <HomePage />
        }/>
        <Route path="/garden" element={
          <GardenPage />
        }/>
        <Route path="/add-garden" element={
          <AddGardenPage />
        }/>
        <Route path="/crop" element={
          <CropPage />
        }/>
        <Route path="/select-crops" element={
          <SelectCropsPage />
        }/>
        <Route path="/soil-guide" element={
          <SoilGuidePage />
        }/>

      </Routes>

    </div>
  );
}

export default App;
