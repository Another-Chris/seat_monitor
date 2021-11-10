import { styled } from "@mui/material/styles";
import { memo, useContext, useEffect, useState, createContext } from "react";

import { SocketContext } from "../../context/socketContext";
import { IO_EVENTS } from "./../../socket";

import Progress from "../Progress/Progress";
import Info from "./Info";
import SeatsIcons from "./SeatsIcons";

export const SeatContext = createContext({});

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

  useEffect(() => {
    socket &&
      socket.on(IO_EVENTS.RECEIVE_SEATS_INFO, (seats) => setSeats(seats));
    socket && socket.on(IO_EVENTS.GET_SEATS_INFO, (seats) => setSeats(seats));
  }, [socket]);

  //=== functions
  const getAvailableSeatNo = () =>
    seats.filter((seat) => seat.available === true).length;

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
