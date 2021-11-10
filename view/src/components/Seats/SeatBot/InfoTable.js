import {
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

const BtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginTop: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

function InfoTable() {
  const { seatInfo } = useContext(SeatInfoContext);
  const { available, beenOccupied, seatNo } = seatInfo;
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>status</TableCell>
            <TableCell>
              <Typography sx={{ color: "info" }}>
                {available ? "available" : "occupied"}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>average availability</TableCell>
            <TableCell>6.75 min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>next occupation</TableCell>
            <TableCell> {"< 1 min (estimated)"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <BtnContainer>
        <Button>predict</Button>
      </BtnContainer>
    </>
  );
}

export default InfoTable;
