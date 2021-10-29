import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
}));

function Progress() {
  return (
    <StyledContainer>
      <Typography style = {{marginBottom: "1em"}} variant="body2"> loading... </Typography>
      <CircularProgress />
    </StyledContainer>
  );
}

export default Progress;
