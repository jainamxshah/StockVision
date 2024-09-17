import React, { useState } from 'react'
import './Explore.css'

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
import MovingStocks from '../../Components/TopByMarketCap/TopByMarketCap'
import Footer from '../../Components/Footer/Footer'
import StockDetails from '../StockDetails/StockDetails'
import ActiveByVolume from '../../Components/ActiveByVolume/ActiveByVolume'
import Week52High from '../../Components/Week52High/Week52High'
import Week52Low from '../../Components/Week52Low/Week52Low'


// import {Logout} from './Components/logout';

const Explore = () => {
  // Example stock data


  return (
   <>
      <IndicePrices/> 
      {/* <Card/> */}
      <TopGainers/>
      <TopLosers />
      <ActiveByVolume />
      <MainNews/>
      <Week52High />
      <Week52Low />
      <Footer/>
      {/* {/* <Watchlist/> */}
    {/* <Portfolio/> */}
    {/* <StockDetails/> */}
    </>
  )
}

export default Explore;
