import { styled } from "@mui/material/styles";
import EventSeatIcon from "@mui/icons-material/EventSeat";

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

const SeatIcons = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gridTemplateRows: "repeat(2,1fr)",
  marginTop: theme.spacing(5),
  justifyItems: "center",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2,1fr)",
    gridTemplateRows: "repeat(3,1fr)",
  },
}));

function SeatsIcons({ seats }) {
  return (
    <SeatIcons>
      {seats.map((seat) => (
        <StyledIcon key={seat.seatNo} available={seat.available ? 1 : 0} />
      ))}
    </SeatIcons>
  );
}

export default SeatsIcons;
