import React from "react";
import styles from "./styles.module.css";

const Title = ({ text }) => {
  return (
    <div className={styles.title_wrapper}>
      <h1 className={styles.title_text}>{text}</h1>
    </div>
  );
};

export default Title;
