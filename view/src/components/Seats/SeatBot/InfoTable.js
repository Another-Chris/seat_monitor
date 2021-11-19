import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

import getAverage from "../../../utils/getAverage";

function InfoTable() {
  const { seatInfo } = useContext(SeatInfoContext);
  const { status } = seatInfo;
  const displayStatus = status === "available" ? "availability" : "occupation";
  const displayStatusInverse =
    status === "available" ? "occupation" : "availablility";
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>average {displayStatus}</TableCell>
            <TableCell>{getAverage(seatInfo)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>next {displayStatusInverse}</TableCell>
            <TableCell> {"<1 min (estimated)"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default InfoTable;
