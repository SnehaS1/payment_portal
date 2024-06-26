import React from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LuFolderOpen } from "react-icons/lu";
import dayjs from "dayjs";
import { LuPartyPopper } from "react-icons/lu";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Celebrations({ employees = [] }: { employees: any[] }) {
  const currentMonth = dayjs().month();
  const filteredEmployees = employees?.filter((employee) => {
    return dayjs(employee.joiningDate).month() == currentMonth;
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Anniversaries
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 300 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Celebration</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => {
              const currentYear = dayjs().year();
              const joiningYear = dayjs(employee.joiningDate).year();
              return (
                <StyledTableRow key={employee._id + ""}>
                  <StyledTableCell component="th" scope="row">
                    <section className="flex align-baseline gap-3">
                      {employee.fullName}
                      <LuPartyPopper color="#FFC100" size={20} />
                    </section>
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {currentYear - joiningYear} year Anniversay
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>
                  <section
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">No Anniversaries found</Typography>
                    <LuFolderOpen size={50} />
                  </section>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Celebrations;
