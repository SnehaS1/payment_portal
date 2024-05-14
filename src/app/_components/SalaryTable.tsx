import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTableRow } from "./ui/styledTable";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SalaryRow from "./SalaryRow";
import { Style } from "@mui/icons-material";
import { SalaryStatus } from "@/helpers/constants";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function SalaryTable({
  salaries,
  paymentHistory,
}: {
  salaries: any[];
  paymentHistory: Boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table
          stickyHeader
          sx={{
            minWidth: "80%",
          }}
          aria-label="customized salary"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Basic Salary</StyledTableCell>
              <StyledTableCell>Allowances</StyledTableCell>
              <StyledTableCell>Salary Process Date </StyledTableCell>
              <StyledTableCell>Additions</StyledTableCell>
              <StyledTableCell>Deductions</StyledTableCell>
              <StyledTableCell>Is EOS</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="right">
                {paymentHistory ? "Gross Paid" : "Pay"}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {/* {paymentHistory ? (
            <TableBody>


            </TableBody>
          ) : ( */}
          <TableBody>
            {salaries.map((employee) => {
              const gross = employee.basicSalary + employee.allowances;
              const currentYear = dayjs().year();
              const joiningYear = dayjs(employee.joiningDate).year();
              return (
                <SalaryRow
                  employee={employee}
                  key={employee._id + ""}
                  paymentHistory={paymentHistory}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
