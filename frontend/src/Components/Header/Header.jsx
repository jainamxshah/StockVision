import React, { useContext, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Adjust path as needed
import './Header.css';

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="lg" bg="light" variant="light" className="custom-navbar" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/explore" className="brand-name">
          Stock Vision
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center">
            <Form inline className="search-form">
              <FormControl type="search" placeholder="Search Stocks" className="search-input" />
            </Form>
            <Nav.Link as={Link} to="/explore" className="nav-link">Explore</Nav.Link>
            {isAuth && (
              <>
                <Nav.Link as={Link} to="/user/portfolio" className="nav-link">Portfolio</Nav.Link>
                <Nav.Link as={Link} to="/user/watchlist" className="nav-link">Watchlist</Nav.Link>
                <Button variant="outline-danger" onClick={logout} className="logout-button">
                  
                  Logout
                </Button>
              </>
            )}
            {!isAuth && (
              <Button  as={Link} to="/login" className="login-button">Login/Register</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
