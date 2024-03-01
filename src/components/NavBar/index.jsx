// import "bootstrap/dist/css/bootstrap.min.css";
import imnotartlogo from "../../assets/imnotartlogo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

import { Navbar, Nav, Button } from "react-bootstrap";

const NavBar = ({ isAdmin, isLoggedIn }) => {
  const navigate = useNavigate(); // Create history object

  const [siteName, setSiteName] = useState("AR Gallery");
  const [siteLogo, setSiteLogo] = useState(imnotartlogo || "DefaultLogo");

  const fetchSiteData = async () => {
    // Fetch site name and logo from backend API
    // const response = await fetch("https://api.example.com/settings");
    // const data = await response.json();
    // setSiteName(data.siteName);
    // setSiteLogo(data.siteLogo);
    setSiteName("AR Gallery");
    setSiteLogo(imnotartlogo);
  };

  const handleAdminClick = () => {
    // Redirect to the AdminPanel component
    navigate("/admin");
  };

  const handleLoginClick = () => {
    // Redirect to the Login component
    navigate("/login");
  };

  // Get site name and logo from backend API

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      {/* Replace the text with an image */}
      <Navbar.Brand href="/">
        <img
          src={siteLogo}
          width="200"
          height="50"
          className="d-inline-block align-top"
          alt={siteName}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" onClick={() => navigate("/")}>
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          {/* Conditionally render the admin-only button */}
          {isAdmin && (
            <Button
              variant="outline-danger"
              className="mr-2"
              onClick={handleAdminClick}
            >
              Admin Panel
            </Button>
          )}
        </Nav>
        <Nav>
          {/* Conditionally render login options */}
          {isLoggedIn ? (
            <Button variant="outline-primary" className="mr-2">
              Logout
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
