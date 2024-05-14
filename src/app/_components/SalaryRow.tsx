"use client";
import React from "react";
import { StyledTableCell, StyledTableRow } from "./ui/styledTable";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

function SalaryRow({
  employee,
  paymentHistory = false,
}: {
  employee: any;
  paymentHistory: Boolean;
}) {
  const router = useRouter();
  const [updateSalary, setUpdateSalary] = React.useState({
    isEOS: employee.isEndOfService || false,
    addition: employee.addition || 0,
    deduction: employee.deduction || 0,
    processDate: "",
  });

  const processSalary = async () => {
    const payload = { ...employee, ...updateSalary };
    const res = await axios.put(`api/salaries/${employee.employeeId}`, payload);
    if (res.data.status === 200) {
      router.push("/payment-history");
    }
  };
  const gross =
    employee.basicSalary +
    (employee.allowances || 0) +
    updateSalary.addition -
    updateSalary.deduction;

  return (
    <StyledTableRow key={employee._id + ""}>
      {/* Full Name */}
      <StyledTableCell component="th" scope="row">
        <section className="flex align-baseline gap-3">
          {employee.fullName}
        </section>
      </StyledTableCell>
      {/* Basic Salary */}
      <StyledTableCell align="right">
        AED {employee.basicSalary}
      </StyledTableCell>
      {/* Allowances */}
      <StyledTableCell align="right">
        AED {employee.allowance || 0}
      </StyledTableCell>
      {/* processDate */}
      <StyledTableCell align="right">
        {paymentHistory ? (
          <span>{dayjs(employee.processDate).format("MMM YYYY")}</span>
        ) : (
          <input
            className=" p-3 mt-2 border-3 border-solid border-slate-950 transition duration-500 focus:border-gray-500 outline-none"
            type="month"
            max={dayjs().format("YYYY-MM")}
            id={`process-date-${employee.employeeId}`}
            value={updateSalary.processDate}
            placeholder=" MM/YYYY"
            style={{ border: "1px solid #a71059" }}
            onChange={(e) =>
              setUpdateSalary({ ...updateSalary, processDate: e.target.value })
            }
          ></input>
        )}
      </StyledTableCell>
      {/* Addition */}
      <StyledTableCell align="right">
        {paymentHistory ? (
          <Typography>AED {employee.addition || 0}</Typography>
        ) : (
          <TextField
            id={`outlined-addition-${employee.employeeId}`}
            label=""
            variant="outlined"
            value={updateSalary.addition}
            onChange={(e) =>
              setUpdateSalary({
                ...updateSalary,
                addition: Number(e.target.value),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
          />
        )}
      </StyledTableCell>
      {/* Deduction */}
      <StyledTableCell align="right">
        {paymentHistory ? (
          <Typography>AED {employee.deduction || 0}</Typography>
        ) : (
          <TextField
            id={`outlined-deduction-${employee.employeeId}`}
            label=""
            value={updateSalary.deduction}
            onChange={(e) =>
              setUpdateSalary({
                ...updateSalary,
                deduction: Number(e.target.value),
              })
            }
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
          />
        )}
      </StyledTableCell>
      {/* EOS */}
      <StyledTableCell align="right">
        <Checkbox
          id={`salary-checkbox-${employee.employeeId}`}
          checked={updateSalary.isEOS}
          disabled={Boolean(paymentHistory)}
          onChange={(e) =>
            setUpdateSalary({ ...updateSalary, isEOS: e.target.checked })
          }
        />
      </StyledTableCell>
      {/* Salary Status */}
      <StyledTableCell align="right">{employee.salaryStatus}</StyledTableCell>

      <StyledTableCell align="right">
        {paymentHistory ? (
          <Typography>AED {employee.grossSalary} paid</Typography>
        ) : (
          <button
            disabled={!Boolean(updateSalary.processDate)}
            onClick={processSalary}
            className="mt-1 block w-full px-3 py-2 cursor-pointer
            bg-violet-500 text-white rounded-md
disabled:bg-gray-300 disabled:text-gray-700 
 focus:bg-pink-500 focus:ring-violet-300 
 hover:bg-violet-600 hover:text-white
   active:bg-violet-700 focus:outline-none focus:ring"
          >
            Pay AED {gross}
          </button>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default SalaryRow;
