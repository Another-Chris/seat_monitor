import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { createContext, memo, useState } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";

import formatMin from "../../utils/formatMin";

import SeatBot from "./SeatBot/SeatBot";

export const SeatInfoContext = createContext({});

const StyledIcon = styled(EventSeatIcon)(({ theme, available }) => ({
  display: "block",
  width: theme.spacing(10),
  height: theme.spacing(10),
  fill: available ? theme.palette.primary.dark : theme.palette.grey[300],
  cursor: "pointer",
  "&:hover": {
    fill: available ? theme.palette.primary.light : theme.palette.grey[500],
  },
}));

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
  const { available, beenOccupied, seatNo } = seatInfo;
  const [clicked, setClicked] = useState();

  //=== functions
  const onClickIcon = (e) => setClicked(e.target);
  const close = () => setClicked(null);
  return (
    <SeatInfoContext.Provider value={{ seatInfo }}>
      <Container>
        <StyledIcon
          onClick={onClickIcon}
          key={seatNo}
          available={available ? 1 : 0}
        />
        <Info>
          <Typography variant="caption">
            {available ? "Available" : "Occupied"} for
          </Typography>
          <ShowTime variant="h6">{formatMin(beenOccupied)}</ShowTime>
          <SeatBot anchorEl={clicked} close={close} />
        </Info>
      </Container>
    </SeatInfoContext.Provider>
  );
}

export default memo(SeatDisplay);
