import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Home from "./components/Home/Home";
import AuthProvider from "./context/AuthContext";
// import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Components/auth/Login";
import Navbar from "./Components/Navbar/Navbar";
import Explore from "./Pages/Explore/Explore";
import IndicePrices from "./Components/Indices/Indices";
import SignUp from "./Components/auth/Signup";
import StockPage from "./Pages/StocksPage/StockPage";
import StockDetails from "./Pages/StockDetails/StockDetails";
import News from "./Pages/News/NewsCard";
import IndicesDetailed from "./Pages/IndicesDetailed/IndicesDetailed";
import Watchlist from "./Pages/WatchList/watchlist"
import Portfolio from "./Pages/Portfolio/portfolio";



function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>

            <Route path="/" element={<Navigate to="/explore" />} />

            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/stocks/top-gainers" element={<StockPage />} />
            <Route path="/stocks/top-losers" element={<StockPage />} />
            <Route path="/stock" element={<StockDetails />} />
            <Route path="/news" element={<News/>} />
            <Route path="/indices" element={<IndicesDetailed/>} />
            <Route path="/user/watchlist" element={<Watchlist/>} />
            <Route path="/user/portfolio" element={<Portfolio/>} />


          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
