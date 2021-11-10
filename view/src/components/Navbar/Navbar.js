import { Typography, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "./../../assets/logo.png";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "white",
});

const StyledLogo = styled("img")({
  maxWidth: 250,
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  marginRight: theme.spacing(20),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

function Navbar() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledTitle variant="h5">Seat Monitor</StyledTitle>
        <StyledLogo src={Logo} />
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Navbar;
