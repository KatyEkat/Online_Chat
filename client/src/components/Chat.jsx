import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState(null);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      console.log(data);
    });
  }, []);

  return <div>Chat</div>;
};

export default Chat;
