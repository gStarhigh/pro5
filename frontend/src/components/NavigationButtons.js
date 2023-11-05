import React from "react";
import { Link } from "react-router-dom";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/NavigationButtons.module.css";
import { Container } from "react-bootstrap";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavigationButtons = () => {
  const currentUser = useCurrentUser();
  return (
    <Container className={styles.Row}>
      {currentUser ? (
        <>
          <Link to="/">
            <button alt="To add usage" className={btnStyles.Round}>
              Add Usage
            </button>
          </Link>
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
          <Link to="/liked">
            <button alt="To liked posts" className={btnStyles.Round}>
              Liked Posts
            </button>
          </Link>
          <Link to="/feed">
            <button alt="To posts feed" className={btnStyles.Round}>
              Posts Feed
            </button>
          </Link>
        </>
      ) : null}
    </Container>
  );
};

export default NavigationButtons;
