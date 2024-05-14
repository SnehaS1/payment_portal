"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { handleAmount } from "@/helpers/utils";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { SalaryStatus } from "@/helpers/constants";

type SalaryType = {
  employeeId: string;
  fullName: string;
  basicSalary: number;
  employeeRole: string;
  tax: number;
  deduction: number;
  allowance: number;
  salaryStatus: string;
  email: string;
  isEndOfService: boolean;
};
function SalaryFormComponent({ salary }: { salary: SalaryType }) {
  const [checked, setChecked] = useState(false);
  const [salaryfield, setSalary] = useState<any>(salary);
  const grossSalary =
    Number(salary.basicSalary) +
    Number(salary.allowance || 0) -
    Number(salary.deduction || 0);

  const processSalary = async () => {
    const res = await axios.put(`api/salaries/${salaryfield.employeeId}`, {
      ...salaryfield,
      salary: SalaryStatus.PAID,
    });
  };

  return (
    <div className="my-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{
            backgroundColor: "#A87676",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <section className="flex justify-between flex-row w-full">
            <Typography>{salary.fullName}</Typography>
            <Chip label={salary.salaryStatus} color="success" />
          </section>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div style={{ color: "#A87676" }}>
              Employee Id: {salary.employeeId}
            </div>
            <div>Basic Salary: {handleAmount(salary.basicSalary)}</div>
            <div>Department: {salary.employeeRole}</div>
            <div>Tax: {handleAmount(salary.tax)}</div>
            <div>Deduction: {handleAmount(salary.deduction)}</div>
            <div>Allowance: {handleAmount(salary.allowance)}</div>
            <div>Email: {salary.email}</div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label="Adjust Salary"
              />
            </FormGroup>
            {/* {checked &&(

            )} */}
            <div className="flex gap-4 my-3 ">
              <TextField
                className="my-2"
                disabled={checked}
                id="allowance"
                type="number"
                label="Allowance"
                variant="outlined"
                value={salaryfield.allowance || 0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">AED</InputAdornment>
                  ),
                }}
                onChange={(e) =>
                  setSalary({ ...salaryfield, allowance: e.target.value + "" })
                }
              />
              <TextField
                className="my-2"
                disabled={checked}
                id="deductions"
                type="number"
                label="Deductions"
                variant="outlined"
                value={salary.deduction || 0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">AED</InputAdornment>
                  ),
                }}
                onChange={(e) =>
                  setSalary({ ...salaryfield, deductions: e.target.value + "" })
                }
              />
              <Switch
                checked={salaryfield.isEndOfService}
                onChange={(e) => {
                  setSalary({
                    ...salaryfield,
                    isEndOfService: e.target.checked,
                  });
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              <TextField
                className="my-2"
                id="grossSalary"
                disabled
                type="number"
                label="Gross Salry"
                variant="outlined"
                value={grossSalary}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">AED</InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            onClick={processSalary}
            disabled={salary.salaryStatus === SalaryStatus.PAID}
          >
            Process Salary for {salary.fullName}
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SalaryFormComponent;
