import React from "react";
import { Link } from "react-router-dom";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/NavigationButtons.module.css";
import { Container } from "react-bootstrap";

const NavigationButtons = () => {
  return (
    <Container className={styles.Row}>
      <Link to="/">
        <button alt="To add usage" className={btnStyles.Round}>
          Add Usage
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
    </Container>
  );
};

export default NavigationButtons;
