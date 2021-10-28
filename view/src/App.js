import Navbar from "./components/Navbar/Navbar";
import Seats from "./components/Seats/Seats";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const server = process.env.REACT_APP_SERVER_DEV;
let appSocket;

const ConnectIo = () =>
  new Promise((resolve, reject) => {
    const socket = io(server);

    socket.io.on("error", (error) => reject(error));
    socket.on("connect", (seatObj) => {
      resolve(socket);
    });
  });

function App() {
  const [seatsInfo, setSeatsInfo] = useState([]);

  useEffect(() => {
    async function connect() {
      try {
        appSocket = await ConnectIo();
        appSocket.emit("askForInfo");
        appSocket.on("tellSeatsInfo", (obj) => setSeatsInfo(obj));
        appSocket.on("boardcastSeatInfo", (obj) => {
          setSeatsInfo(obj);
        });
      } catch (error) {
        console.log(error);
      }
    }

    connect();
  }, []);

  return (
    <>
      <Navbar />
      <Seats seats={seatsInfo} />
    </>
  );
}

export default App;
