import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

import getAverage from "../../../utils/getAverage";

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
    </>
  );
}

export default InfoTable;
