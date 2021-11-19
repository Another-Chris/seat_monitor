import { styled } from "@mui/material/styles";
import { memo, useContext, useEffect, useState, createContext } from "react";

import { SocketContext } from "../../context/socketContext";
import { IO_EVENTS } from "./../../socket";

import Progress from "../Progress/Progress";
import Info from "./Info";
import SeatsIcons from "./SeatsIcons";
import Predictor from "./Predictor/Predictor";

export const SeatContext = createContext({});
const server = process.env.REACT_APP_SERVER;

//=== styles
const StyledContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  margin: `${theme.spacing(10)} auto`,
  minHeight: 500,
  maxWidth: 800,
}));

function Seats() {
  const { socket } = useContext(SocketContext);
  const [seats, setSeats] = useState([]);
  console.log(seats);

  useEffect(() => {
    async function getSeats() {
      const response = await fetch(server + "/seats", {
        method: "GET",
      });
      const data = await response.json();
      setSeats(data);
    }

    getSeats();
    socket &&
      socket.on(IO_EVENTS.RECEIVE_SEATS_INFO, (seats) => setSeats(seats));
  }, [socket]);

  //=== functions
  const getAvailableSeatNo = () =>
    seats.filter((seat) => seat.status === "available").length;

  //=== vars
  const availableSeats = getAvailableSeatNo();

  return (
    <SeatContext.Provider value={{ seats }}>
      {socket && seats.length !== 0 ? (
        <StyledContainer>
          <Info availableSeats={availableSeats} />
          <SeatsIcons />
        </StyledContainer>
      ) : (
        <Progress />
      )}
    </SeatContext.Provider>
  );
}

export default memo(Seats);
