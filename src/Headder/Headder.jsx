import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Headder.css";

const headder = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand>
        <NavLink to={"/"}>About Me</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/TempView">
              Temp & Humidity dashbord
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/ApiExp">
              Temp & Humidity API
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/aboutserver">
              About the server
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default headder;
