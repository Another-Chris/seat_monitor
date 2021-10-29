import { Popper, ClickAwayListener, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";

function Tip({ anchorEl, close }) {
  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={close}>
      <Popper open={!!anchorEl} anchorEl={anchorEl}>
        <Paper>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>status</TableCell>
                        <TableCell>
                            <Typography sx = {{color: "info"}}>
                                available
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>average available time</TableCell>
                        <TableCell>5 - 10 min</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>last occupied</TableCell>
                        <TableCell>10 min ago</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
}

export default Tip;
