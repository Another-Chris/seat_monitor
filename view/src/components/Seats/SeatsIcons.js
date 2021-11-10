import { styled } from "@mui/material/styles";
import { memo, useContext } from "react";
import SeatDisplay from "./SeatDisplay";
import { SeatContext } from "./Seats";

const SeatIcons = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  marginTop: theme.spacing(5),
  rowGap: theme.spacing(3),
}));

function SeatsIcons() {
  const { seats } = useContext(SeatContext);
  return (
    <SeatIcons>
      {seats.map((seat) => (
        <SeatDisplay key={seat.seatNo} seatInfo={seat} />
      ))}
    </SeatIcons>
  );
}

export default memo(SeatsIcons);
