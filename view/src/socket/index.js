import io from "socket.io-client";

const server = process.env.REACT_APP_SERVER_DEV;


export const IO_EVENTS = {
    GET_SEATS_INFO: "GET_SEATS_INFO",
    RECEIVE_SEATS_INFO: "RECEIVE_SEATS_INFO",
  };
  

export const connectIo = () =>
  new Promise((resolve, reject) => {
    const socket = io(server);

    socket.io.on("error", (error) => reject(error));
    socket.on("connect", (seatObj) => {
      resolve(socket);
    });
  });


