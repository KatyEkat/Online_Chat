const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
// import io from "socket.io-client";

const route = require("./route");
const { addUser, findUser } = require("./users");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user } = addUser({ name, room });

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `Hey there ${user.name}` },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: `${user.name} has join` },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  io.on("disconnect", (socket) => {
    console.log("Disconnect");
  });
});

server.listen(5000, () => {
  console.log("Server is running");
});
