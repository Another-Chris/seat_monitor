import { Popper, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import InfoTable from "./InfoTable";
import Header from "./Header";
import Predictor from "../Predictor/Predictor";
import { useState } from "react";

const Overlay = styled("div")(({ theme, open }) => ({
  display: open ? "block" : "none",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  backgroundColor: "#343a4080",
  left: 0,
  top: 0,
  cursor: "pointer",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const BtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

function SeatBot({ anchorEl, close }) {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const onMouseUp = (e) => {
    if (e.target.id === "overlay") {
      close();
      closePredict();
    }
  };

  const onClickPredict = (e) => setAnchorEl2(anchorEl);
  const closePredict = (e) => setAnchorEl2(null);

  return (
    <Overlay id="overlay" onMouseUp={onMouseUp} open={anchorEl ? 1 : 0}>
      {!anchorEl2 ? (
        <Popper
          placement="right"
          modifiers={[{ name: "arrow", enabled: true }]}
          open={!!anchorEl}
          anchorEl={anchorEl}
        >
          <StyledPaper>
            <Header />
            <InfoTable />
            <BtnContainer>
              <Button onClick={onClickPredict} variant="outlined">
                predict
              </Button>
            </BtnContainer>
          </StyledPaper>
        </Popper>
      ) : (
        <Predictor closePredict={closePredict} anchorEl={anchorEl2} />
      )}
    </Overlay>
  );
}

export default SeatBot;
