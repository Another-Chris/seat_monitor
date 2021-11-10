const socketio = require("socket.io");

let socket;
let io;

const IO_EVENTS = {
  GET_SEATS_INFO: "GET_SEATS_INFO",
  RECEIVE_SEATS_INFO: "RECEIVE_SEATS_INFO",
};

const boardcastSeatInfo = (seats) => {
  io.emit(IO_EVENTS.RECEIVE_SEATS_INFO, seats);
};

const initSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (s) => {
    socket = s;
    console.log("connected");
  });
};

module.exports = { initSocket, boardcastSeatInfo };
