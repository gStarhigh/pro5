// React import
import React from "react";

// Styles
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="profile"
      ></img>
      {text}
    </span>
  );
};

export default Avatar;
