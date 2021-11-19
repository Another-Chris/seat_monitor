import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useContext } from "react";
import { SeatInfoContext } from "../SeatDisplay";

import getAvailability from "../../../utils/getAvailability";

function InfoTable() {
  const { seatInfo } = useContext(SeatInfoContext);

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>average availability</TableCell>
            <TableCell>{getAvailability(seatInfo)} %</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default InfoTable;
