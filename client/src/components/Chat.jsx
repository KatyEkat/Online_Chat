import React, { useState } from "react";
import styles from "../styles/Chat.module.css";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import icon from "../img/emoji.svg";
import EmojiPicker from "emoji-picker-react";
import { Messages } from "./Messages";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const { search } = useLocation();

  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
      console.log(data);
    });
  }, []);

  const leftRoom = () => {};
  const handleChange = ({ target: { value } }) => setMessage(value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;

    socket.emit("sendMessage", { params });

    setMessage("");
  };
  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}> {params.room} </div>
        <div className={styles.users}> 0 users in this room </div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>

      <Messages messages={state} name={params.name} />

      <div className={styles.messages}>
        {/* {state.map(({ message }, i) => (
          <span key={i}> {message} </span>
        ))} */}
      </div>

      <form className={styles.form}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Write here your message"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.emoji}>
          <img src={icon} alt="emoji" onClick={() => setOpen(!isOpen)} />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input
            type="submit"
            onSubmit={handleSubmit}
            value="send the message"
          />
        </div>
      </form>
    </div>
  );
};

export default Chat;
