import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableHead,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

import getAverage from "../../../utils/getAverage";
//test
const BtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

function InfoTable() {
  const { seatInfo } = useContext(SeatInfoContext);
  const { status } = seatInfo;
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              average {status === "available" ? "availability" : "occupation"}
            </TableCell>
            <TableCell>{getAverage(seatInfo)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>next occupation</TableCell>
            <TableCell> {"<1 min"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <BtnContainer>
        <Button variant="outlined">predict</Button>
      </BtnContainer>
    </>
  );
}

export default InfoTable;
