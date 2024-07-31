import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Indices from '../../Components/Indices/Indices'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from '../../Components/Navigations';
// import {Logout} from './Components/logout';

const HomePage = () => {
  return (
    // <BrowserRouter>
    //     <Navigation></Navigation>
    //     <Routes>
    //       <Route path="/" element={<Home/>}/>
    //       <Route path="/login" element={<Login/>}/>
    //       {/* <Route path="/logout" element={<Logout/>}/> */}
    //     </Routes>
    //   </BrowserRouter>
    <div>
      <Navbar></Navbar>
      <Indices></Indices>
    </div>
  )
}

export default HomePage
