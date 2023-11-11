// React Imports
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Styles
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/PostsButtons.module.css";
import Container from "react-bootstrap/Container";

const PostsButtons = () => {
  return (
    <Container className={styles.Container}>
      <Link className={styles.Link} to="/">
        <button className={styles.GrayButton} alt="To liked posts">
          All
        </button>
      </Link>
      <Link className={styles.Link} to="/liked">
        <button className={styles.GrayButton} alt="To liked posts">
          Liked
        </button>
      </Link>
      <Link className={styles.Link} to="/feed">
        <button className={styles.GrayButton} alt="To posts feed">
          Feed
        </button>
      </Link>
    </Container>
  );
};

export default PostsButtons;
