import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { handleAmount } from "@/helpers/utils";

// const StyledAccordian = styled(AccordionSummary)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));
function SalaryListComponent({ salarylist }: { salarylist: any }) {
  return (
    <div>
      <Button variant="contained">Process Salary</Button>

      {salarylist.map((salary: any) => {
        return (
          <Accordion key={salary.employeeId}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              style={{
                backgroundColor: "#8a8383",
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
                <div>Employee Id: {salary.employeeId}</div>
                <div>Basic Salary: {handleAmount(salary.basicSalary)}</div>
                <div>Employee Role: {salary.employeeRole}</div>
                <div>Tax: {handleAmount(salary.tax)}</div>
                <div>Deduction: {handleAmount(salary.deduction)}</div>
                <div>Allowance: {handleAmount(salary.allowance)}</div>
                <div>Email: {salary.email}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default SalaryListComponent;
