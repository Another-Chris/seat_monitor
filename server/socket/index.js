const socketio = require("socket.io");
const { getSeatInfo } = require("./../data");

let socket;
let io;

const boardcastSeatInfo = (seats) => {
  io.emit("boardcastSeatInfo", seats);
};

const initSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (s) => {
    socket = s;
    console.log("connected");
    socket.on("askForInfo", () => socket.emit("tellSeatsInfo", getSeatInfo()));
  });
};

module.exports = { initSocket, boardcastSeatInfo };
