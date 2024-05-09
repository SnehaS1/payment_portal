"use client";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { handledateFormat } from "@/helpers/utils";
import Image from "next/image";

type EmployeeListType = {
  _id: String;
  employeeId: String;
  fullName: String;
  joiningDate: Dayjs;
  basicSalary: number;
  employeeRole: String;
  avatar: String;
  email: String;
  birthDate: Dayjs;
};
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function EmployeesList({ employees }: { employees: EmployeeListType[] }) {
  console.log("employees", employees);
  return (
    <div style={{ padding: "20px" }}>
      EmployeesList
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Joining Date</StyledTableCell>
              <StyledTableCell align="right">Birt Date</StyledTableCell>
              <StyledTableCell align="right">Basic Salry</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row: EmployeeListType) => {
              var dt = dayjs(row.joiningDate).format("D-MMM-YYYY");
              return (
                <StyledTableRow key={row._id + ""}>
                  <StyledTableCell component="th" scope="row">
                    <section className="flex align-baseline gap-3">
                      <Image
                        alt={row.fullName + ""}
                        height={50}
                        width={50}
                        src={row.avatar + ""}
                        className="rounded-full"
                      />
                      {row.fullName}
                    </section>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.employeeRole}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {handledateFormat(row.joiningDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {handledateFormat(row.birthDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    AED {row.basicSalary}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeesList;
