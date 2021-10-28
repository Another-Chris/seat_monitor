import { LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EventSeatIcon from "@mui/icons-material/EventSeat";

//=== styles
const StyledContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} auto`,
  minHeight: 500,
  maxWidth: 800,
}));

const Info = styled("div")(({ theme }) => ({}));

const SeatIcons = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gridTemplateRows: "repeat(2,1fr)",
  marginTop: theme.spacing(5),
}));

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledIcon = styled(EventSeatIcon)(({ theme, available }) => ({
  display: "block",
  width: theme.spacing(10),
  height: theme.spacing(10),
  fill: available ? theme.palette.primary.dark : theme.palette.grey[300],
}));

const icons = [
  { iconNo: 0, available: true },
  { iconNo: 1, available: true },
  { iconNo: 2, available: true },
  { iconNo: 3, available: true },
  { iconNo: 4, available: true },
];

function Seats() {
  //=== functions
  const getAvailableSeatNo = () =>
    icons.filter((icon) => icon.available === true).length;

  //=== vars
  const availableSeats = getAvailableSeatNo();

  //=== components
  const RenderIcons = () =>
    icons.map((icon) => (
      <StyledIcon key={icon.iconNo} available={icon.available ? 1 : 0} />
    ));

  const RenderProgress = () =>
    availableSeats > 2 ? (
      <StyledProgress value={20 * availableSeats} variant="determinate" />
    ) : (
      <StyledProgress
        value={20 * availableSeats}
        color="error"
        variant="determinate"
      />
    );

  return (
    <StyledContainer>
      <Info>
        <Typography variant="h1">{availableSeats}</Typography>
        <RenderProgress />
        <Typography variant="h6">Available Seats</Typography>
      </Info>
      <SeatIcons>
        <RenderIcons />
      </SeatIcons>
    </StyledContainer>
  );
}

export default Seats;
