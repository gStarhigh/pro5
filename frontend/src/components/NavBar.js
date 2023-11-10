// React import
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// React Bootstrap imports
import { Container, Navbar, Nav, Modal, Button } from "react-bootstrap";

// Axios import
import axios from "axios";

// Styles
import styles from "../styles/NavBar.module.css";

// My own imports
import logo from "../assets/favicon-horse.png";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { AlertContext } from "../contexts/AlertContext";

// Toastify Imports
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

// Toastify style
import "react-toastify/dist/ReactToastify.css";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { alert, setAlert } = useContext(AlertContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Shows the confirmation modal
  const confirmSignOut = async () => {
    setShowConfirmation(true);
  };

  // Handles the signout
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setAlert("You signed out successfully!");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
    setShowConfirmation(false);
  };

  /* If a user is logged in */
  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} to="/" onClick={confirmSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        to="/tickets"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-regular fa-envelope"></i>Contact
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={40}
        />
      </NavLink>
    </>
  );

  /* If a user is logged out */
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  useEffect(() => {
    if (alert && typeof alert === "string" && alert !== "null") {
      toast(alert);
      setAlert(null);
    }
  }, [alert, setAlert]);

  return (
    <Navbar
      expanded={expanded}
      expand="md"
      fixed="top"
      className={styles.NavBar}
    >
      <Container>
        <ToastContainer position="top-center" />
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.img} src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
              exact
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to sign out?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSignOut}>
              Sign out
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default NavBar;
