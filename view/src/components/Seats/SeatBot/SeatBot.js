import { Popper, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import InfoTable from "./InfoTable";
import Header from "./Header";

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

function SeatBot({ anchorEl, close }) {
  const onMouseUp = (e) => {
    if (e.target.id === "overlay") {
      close();
    }
  };

  return (
    <Overlay id="overlay" onMouseUp={onMouseUp} open={anchorEl ? 1 : 0}>
      <Popper
        placement="right"
        modifiers={[{ name: "arrow", enabled: true }]}
        open={!!anchorEl}
        anchorEl={anchorEl}
      >
        <StyledPaper>
          <Header />
          <InfoTable />
        </StyledPaper>
      </Popper>
    </Overlay>
  );
}

export default SeatBot;
