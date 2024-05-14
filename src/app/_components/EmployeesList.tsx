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
// import { EmployeeType } from "../employee/page";
import Loader from "./Loader";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function EmployeesList({
  employees,
  employeeLoader,
}: {
  employees: EmployeeListType[];
  employeeLoader: Boolean;
}) {
  return (
    <div className="overflow-x-auto">
      {employeeLoader && <Loader />}
      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table
          stickyHeader
          sx={{
            minWidth: "80%",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell align="right">Employee ID</StyledTableCell>
              <StyledTableCell align="right" className="hidden lg:block">
                Role
              </StyledTableCell>
              <StyledTableCell align="right">Joining Date</StyledTableCell>
              <StyledTableCell align="right">Basic Salary</StyledTableCell>
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
                        src={
                          row.avatar
                            ? row.avatar + ""
                            : "https://loremflickr.com/640/480/people?lock=2596792350801920"
                        }
                        className="rounded-full hidden lg:block"
                      />
                      {row.fullName}
                    </section>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.employeeId}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="hidden lg:block">
                    {row.employeeRole}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {handledateFormat(row.joiningDate)}
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
