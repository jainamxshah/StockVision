import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home/Home";
import AuthProvider from "./context/AuthContext";
// import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Components/auth/Login";
import Navbar from "./Components/Navbar/Navbar";
import Explore from "./Pages/Explore/Explore";
import IndicePrices from "./Components/Indices/Indices";
import SignUp from "./Components/auth/Signup";

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar />
    
        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
