import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-sections">
        <div className="footer-about">
          <h3>About Stock Vision</h3>
          <p>Stock Vision provides comprehensive stock market data and insights to help you make informed investment decisions. Stay updated with the latest stock trends, manage your watchlist, and more.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/news">News</a></li>
            <li><a href="/stocks/top-gainers">Top Gainers</a></li>
            <li><a href="/stocks/top-lossers">Top Lossers</a></li>
            <li><a href="/stocks/active-by-volume">Active By Volume</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com/stockvision" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/stockvision" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/stockvision" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com/company/stockvision" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>ⓒ {new Date().getFullYear()} Stock Vision. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
