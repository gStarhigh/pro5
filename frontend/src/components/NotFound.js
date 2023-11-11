import React from "react";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.Background}>
      <h1 className={styles.Headline}>404</h1>
      <h2 className={styles.Error}>Page Not Found</h2>
      <h4 className={styles.Info}>
        The page you are looking for might have been removed, had it's name
        changed, or is temporarily unavailable.
      </h4>
      <button
        className={styles.HomeButton}
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
