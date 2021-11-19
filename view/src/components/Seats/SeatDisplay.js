import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { createContext, memo, useState } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";

import formatMin from "../../utils/formatMin";

import SeatBot from "./SeatBot/SeatBot";

export const SeatInfoContext = createContext({});

const StyledIcon = styled(EventSeatIcon)(({ theme, status }) => {
  let seatColor, seatColorHover;
  if (status === "available") {
    seatColor = theme.palette.primary.dark;
    seatColorHover = theme.palette.primary.light;
  } else if (status === "occupied") {
    seatColor = theme.palette.grey[300];
    seatColorHover = theme.palette.grey[500];
  } else if (status === "suspicious") {
    seatColor = theme.palette.warning.main;
    seatColorHover = theme.palette.warning.light;
  }
  return {
    display: "block",
    width: theme.spacing(10),
    height: theme.spacing(10),
    fill: seatColor,
    cursor: "pointer",
    "&:hover": {
      fill: seatColorHover,
    },
  };
});

const Info = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: theme.spacing(2),
  justifyContent: "center",
}));

const Container = styled("div")(({ theme }) => ({
  display: "flex",
}));

const ShowTime = styled(Typography)(({ theme }) => ({
  marginTop: 0.5 * theme.spacing(1),
}));

function SeatDisplay({ seatInfo }) {
  const { status, duration, seatNo } = seatInfo;
  const [clicked, setClicked] = useState();

  //=== functions
  const onClickIcon = (e) => setClicked(e.target);
  const close = () => setClicked(null);
  return (
    <SeatInfoContext.Provider value={{ seatInfo }}>
      <Container>
        <StyledIcon onClick={onClickIcon} key={seatNo} status={status} />
        <Info>
          <Typography variant="caption">{status} for</Typography>
          <ShowTime variant="h6">{formatMin(duration)}</ShowTime>
          <SeatBot anchorEl={clicked} close={close} />
        </Info>
      </Container>
    </SeatInfoContext.Provider>
  );
}

export default memo(SeatDisplay);
