import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Adjust path as needed
import "./Navbar.css";

const Navbar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/explore">
            <img
              src="https://bit.ly/3nMw3oc"
              width={148}
              height={40}
              alt="Groww Logo"
            />
          </Link>
        </div>

        {/* Toggle Button for Mobile */}
        <div className="menu-toggle" onClick={handleToggle}>
          <i className="material-icons">=</i>
        </div>

        {/* Main Navigation */}
        <div className={`nav-items ${isMobileMenuOpen ? "active" : ""}`}>
          {/* Search Section */}
          <div className="search">
            <input
              type="search"
              id="search"
              placeholder="What are you looking for today?"
            />
          </div>

          {/* Navigation Links Section */}
          <div className="nav-links">
            <Link to="/explore">Explore</Link>

          </div>

          {/* User Section */}
          <div className="user-actions">
            {isAuth ? (
              <>
                <div className="nav-links">
                  <Link to="/user/portfolio" className="nav-links">
                    Portfolio
                  </Link>
                  <Link to="/user/watchlist" className="nav-links">
                    Watchlist
                  </Link>
                </div>

                <button
                  id="logout-btn"
                  onClick={logout}
                  className="logout-button"
                >
                  <img
                    id="user"
                    src="https://www.shareicon.net/data/2016/05/26/771188_man_512x512.png"
                    alt="User Account"
                    className="logout-icon"
                  />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button id="login-btn">Login/Register</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
