import React, { useState } from 'react'
import './Explore.css'

import Navbar from '../../Components/Navbar/Navbar'

import Indices from '../../Components/Indices/Indices'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from '../../Components/Navigations';
import Login from '../../Components/auth/Login';
import Signup from '../../Components/auth/Signup';
import { AuthProvider } from '../../context/AuthContext';
// import Carousel from '../../Components/Carousel/Carousel';
import IndicePrices from '../../Components/Indices/Indices';
import Card from '../../Components/Card/Card'
import TopGainers from '../../Components/TopGainers/TopGainers'
import MainNews from '../../Components/MainNews/MainNews'
import TopLosers from '../../Components/TopLosers/TopLosers'
// import {Logout} from './Components/logout';

const Explore = () => {
  // Example stock data


  return (
    <div>
      <IndicePrices/>
      <Card/>
      <TopGainers/>
      <MainNews/>
      <TopLosers/>
    </div>
  )
}

export default Explore;
