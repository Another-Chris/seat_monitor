import { Popper, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import DateTimeSelector from "./DateTimeSelector";
import DisplayInfo from "./DisplayInfo";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { createContext, useState } from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2),
  alignItems: "center",
}));

export const PredictorContext = createContext({});

function Predictor({ anchorEl, closePredict }) {
  const [loading, setLoading] = useState(false);
  const [predicted, setPredicted] = useState(null);

  return (
    <Popper placement="right" anchorEl={anchorEl} open={!!anchorEl}>
      <PredictorContext.Provider
        value={{ loading, setLoading, predicted, setPredicted }}
      >
        <StyledPaper>
          <Header>
            <IconButton onClick={closePredict}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h5">Predictor</Typography>
          </Header>
          <StyledContainer>
            <DateTimeSelector />
            <DisplayInfo />
          </StyledContainer>
        </StyledPaper>
      </PredictorContext.Provider>
    </Popper>
  );
}

export default Predictor;
