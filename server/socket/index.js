const socketio = require("socket.io");
const { getSeatInfo } = require("./../data");

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

  io.on("connection", (s) => {
    socket = s;
    console.log("connected");
    socket.on(IO_EVENTS.GET_SEATS_INFO, () => socket.emit(IO_EVENTS.GET_SEATS_INFO, getSeatInfo()));
  });
};

module.exports = { initSocket, boardcastSeatInfo };
