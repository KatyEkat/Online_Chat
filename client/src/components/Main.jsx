import React, { useState } from "react";
import styles from "../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

const Main = () => {
  const { USERNAME, ROOM } = FIELDS;

  const [value, setValue] = useState({ [USERNAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValue({ ...value, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.value(value).some((v) => !v);
    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form className={styles.form}></form>
        <div className={styles.group}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={value[USERNAME]}
            className={styles.input}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="text"
            name="room"
            placeholder="Room name"
            value={value[ROOM]}
            className={styles.input}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <Link
          className={styles.group}
          onClick={handleClick}
          to={`/chat?name=${value[USERNAME]}&room=${value[ROOM]}`}
        >
          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
