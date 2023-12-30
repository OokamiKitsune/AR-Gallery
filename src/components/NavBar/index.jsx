import "bootstrap/dist/css/bootstrap.min.css";
import imnotartlogo from "../../assets/imnotartlogo.png";
import { useState, useEffect } from "react";

import { Navbar, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  const [siteName, setSiteName] = useState("AR Gallery");
  const [siteLogo, setSiteLogo] = useState(imnotartlogo);

  // Get site name and logo from backend API

  return (
    <Navbar bg="light" expand="lg">
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
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <Button variant="outline-primary" className="mr-2">
            Login
          </Button>
          <Button variant="primary">Upload</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
