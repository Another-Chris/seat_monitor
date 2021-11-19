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

  let badgeColor;
  if (status === "available") {
    badgeColor = "success";
  } else if (status === "occupied") {
    badgeColor = "error";
  } else if (status === "suspicious") {
    badgeColor = "warning";
  }
  return (
    <Container>
      <Title>
        <Typography variant="h6">No.{seatNo}</Typography>
        <Badge badgeContent={status} color={badgeColor}></Badge>
      </Title>

      <Divider />
      <Typography variant="caption">very popular</Typography>
    </Container>
  );
}

export default Header;
