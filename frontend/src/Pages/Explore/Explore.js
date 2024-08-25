import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

import Indices from '../../Components/Indices/Indices'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from '../../Components/Navigations';
import Login from '../../Components/auth/Login';
import Signup from '../../Components/auth/Signup';
import { AuthProvider } from '../../context/AuthContext';
// import {Logout} from './Components/logout';

const Explore = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
        {/* <Navigation></Navigation> */}
        <Routes>
          <Route path="/" element={<Navbar/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>

          {/* <Route path="/logout" element={<Logout/>}/> */}
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    // <div>
    //   <Navbar></Navbar>
    //   <Indices></Indices>
    // </div>
  )
}

export default Explore
