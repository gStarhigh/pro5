// React imports
import React from "react";
import { Link } from "react-router-dom";

// React Boostrap import
import { Container } from "react-bootstrap";

// Styles
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/NavigationButtons.module.css";

// My own import
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavigationButtons = () => {
  const currentUser = useCurrentUser();
  return (
    <Container className={styles.Row}>
      {currentUser ? (
        <>
          <Link to="/createinformation">
            <button alt="Create information" className={btnStyles.Round}>
              Create info
            </button>
          </Link>
          <Link to="/posts/create">
            <button alt="To create post" className={btnStyles.Round}>
              Create Post
            </button>
          </Link>
        </>
      ) : null}
    </Container>
  );
};

export default NavigationButtons;
