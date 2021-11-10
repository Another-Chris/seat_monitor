import { Typography, Divider, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

const Container = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

function Header() {
  const { seatInfo } = useContext(SeatInfoContext);
  const { seatNo, status } = seatInfo;
  return (
    <Container>
      <Title>
        <Typography variant="h6">No.{seatNo}</Typography>
        <Badge
          badgeContent={status}
          color={status === "available" ? "success" : "error"}
        ></Badge>
      </Title>

      <Divider />
      <Typography variant="caption">very popular</Typography>
    </Container>
  );
}

export default Header;
