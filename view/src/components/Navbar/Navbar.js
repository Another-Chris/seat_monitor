import { Typography, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#343a40",
});

function Navbar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h5">Seat Monitor</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
