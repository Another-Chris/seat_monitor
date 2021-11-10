import { Popper, Paper, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

const Container = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({}));

function Header() {
  const { seatInfo } = useContext(SeatInfoContext);
  const { seatNo } = seatInfo;
  return (
    <Container>
      <Typography variant="h6">No.{seatNo}</Typography>
      <StyledDivider />
      <Typography variant="caption">very popular</Typography>
    </Container>
  );
}

export default Header;
