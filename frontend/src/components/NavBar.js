import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/favicon-horse.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="sm" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link className={styles.NavLink}>
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <i className="fas fa-sign-in-alt"></i>Sign In
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <i className="fas fa-user-plus"></i>Sign Up
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <i class="fa-regular fa-envelope"></i>Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
