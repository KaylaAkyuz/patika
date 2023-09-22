const app = require("express")();
const http = require("http").Server(app);
const cors = require("cors");
const { io: ioClient } = require("socket.io-client");
const io = require("socket.io")(http, {
  cors: {
    origin: "https://kaylaa0.github.io",
    methods: ["GET", "POST"],
  },
});
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
const path = require("path");

const users = {};
const messages = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("user connect", (alias) => {
    const userIps =
      socket.handshake.headers["x-forwarded-for"] ||
      socket.request.connection.remoteAddress ||
      socket.handshake.address.address;
    const userIp = userIps.split(",")[0];
    const aliasTaken = Object.values(users).includes(alias);
    const aliasTakenbyUser = users[userIp] === alias;

    if (aliasTaken && !aliasTakenbyUser) {
      socket.emit("alias taken", alias);
    } else if (aliasTakenbyUser) {
      socket.emit("alias was set", alias);
    } else {
      users[userIp] = alias;
      socket.emit("alias set", alias);
      io.emit("user list update", Object.values(users));
    }
  });

  socket.on("chat message", (msg) => {
    const userIps =
      socket.handshake.headers["x-forwarded-for"] ||
      socket.request.connection.remoteAddress ||
      socket.handshake.address.address;
    const userIp = userIps.split(",")[0];
    const alias = users[userIp];
    if (!alias) {
      socket.emit("user not found");
      return;
    }
    const message = {
      alias,
      text: msg,
      timestamp: new Date().toLocaleTimeString(),
    };
    messages.push(message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    const userIps =
      socket.handshake.headers["x-forwarded-for"] ||
      socket.request.connection.remoteAddress ||
      socket.handshake.address.address;
    const userIp = userIps.split(",")[0];
    if (users[userIp]) {
      delete users[userIp];
      io.emit("user list update", Object.values(users));
    }
  });

  socket.emit("user list update", Object.values(users));
  socket.emit("initial messages", messages);
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});

const socket = ioClient(`http://${host}:${port}/`);

socket.emit("user connect", "Admin");

socket.emit(
  "chat message",
  "🌟 Welcome to Luminova! Enjoy the vibes, chat responsibly, and have fun! 🎮🎶🌃"
);
