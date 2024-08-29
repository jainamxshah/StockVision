import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="max-w">
      <div className="nav-div">
        <div>
          <Link to="/">
            <img
              src="https://bit.ly/3nMw3oc"
              width={148}
              height={40}
              alt="Groww Logo"
              itemProp="logo"
            />
          </Link>
        </div>
        <div className="c-search">
          <i className="material-icons">search</i>
          <input
            type="search"
            id="search"
            placeholder="What are you looking for today?"
          />
        </div>
        <div id="thirdBox">
          <Link to="/login">
            <button id="login-btn">Login/Register</button>
          </Link>
          <div id="userAcc" className="dontDisplay">
            <img
              id="user"
              src="https://www.shareicon.net/data/2016/05/26/771188_man_512x512.png"
              alt="User Account"
            />
            <Link to="/cart">
              <i className="material-icons">shopping_cart</i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
