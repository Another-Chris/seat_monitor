const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const http = require("http");

let socket;

// set view engine
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("", (req, res, next) => {
  res.sendFile("./public/view/index.html", { root: __dirname });
});

app.use("/request", (req, res, next) => {
  const { method, query } = req;
  socket.emit("GET_REQUEST", { method, query });
  res.send("ok");
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (s) => {
  socket = s;
  console.log("connected");
});

server.listen(8080, (err) => {
  if (err) {
    console.log(err);
  }
});
