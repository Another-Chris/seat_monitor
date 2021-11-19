import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { PredictorContext } from "./Predictor";

const StyledContainer = styled(Paper)(({ theme }) => ({
  minWidth: 300,
  maxWidth: 400,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: theme.spacing(1),
}));

const StyledText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.grey[200],
}));

const InfoText = styled(Typography)(({ theme, status }) => ({
  fontWeight: "bold",
  color:
    status === "available"
      ? theme.palette.success.main
      : theme.palette.error.main,
  textTransform: "uppercase",
  margin: `${theme.spacing(1)} 0`

}));

function DisplayInfo() {
  const { loading, predicted } = useContext(PredictorContext);
  return (
    <StyledContainer elevation={0} variant="outlined">
      {loading ? (
        <CircularProgress />
      ) : !predicted ? (
        <StyledText variant="h5">Results</StyledText>
      ) : (
        <div>
          <Typography variant="caption">This seat will probabily be</Typography>
          <InfoText status={predicted.status} variant="h5">
            {predicted.status}
          </InfoText>
          <Typography>Availability: {Number(predicted.confidence).toFixed(2)} %</Typography>
        </div>
      )}
    </StyledContainer>
  );
}

export default DisplayInfo;
