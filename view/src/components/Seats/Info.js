import { LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const InfoContainer = styled("div")(({ theme }) => ({}));

const StyledTypo = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.h2.fontSize
  }
}))

const StyledProgress = styled(LinearProgress)(({ theme, value }) => {
  const small = value < 60;
  return {
    marginBottom: theme.spacing(1),
    backgroundColor: small
      ? theme.palette.error.light + "30"
      : theme.palette.primary.light + "30",
    "& .MuiLinearProgress-bar": {
      backgroundColor: small
        ? theme.palette.error.main
        : theme.palette.primary.main,
    },
  };
});

function Info({ availableSeats }) {
  return (
    <InfoContainer>
      <StyledTypo variant="h1">{availableSeats}</StyledTypo>
      <StyledProgress value={20 * availableSeats} variant="determinate" />
      <Typography variant="h6">Available Seats</Typography>
    </InfoContainer>
  );
}

export default Info;
