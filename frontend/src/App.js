import logo from './logo.svg';
import './App.css';

import React from "react";
import {Routes, Route} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

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
import Profile from './components/Profile';

function App() {

  const { isLoading, error } = useAuth0();
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Navbar />
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <div>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </div>
      )}
    
      <Routes>
        <Route path="/" element={
          <LandingPage />
        }/>
        <Route path="/home" element={
          isAuthenticated && (
            <HomePage />
          )
        }/>
        <Route path="/garden" element={
          isAuthenticated && (
            <GardenPage />
          )
        }/>
        <Route path="/add-garden" element={
          isAuthenticated && (
            <AddGardenPage />
          )
        }/>
        <Route path="/crop" element={
          isAuthenticated && (
            <CropPage />
          )
        }/>
        <Route path="/select-crops" element={
          isAuthenticated && (
            <SelectCropsPage />
          )
        }/>
        <Route path="/soil-guide" element={
          isAuthenticated && (
            <SoilGuidePage />
          )
        }/>

      </Routes>

    </div>
  );
}

export default App;
