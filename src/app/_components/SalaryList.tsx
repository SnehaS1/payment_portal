"use client";
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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import SalaryFormComponent from "./SalaryForm";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// const StyledAccordian = styled(AccordionSummary)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));
async function SalaryListComponent({ salarylist }: { salarylist: any }) {
  const processAllSalary = async () => {
    try {
      console.log("Processing all salary");
      debugger;
      const res = await axios.put(`api/salaries`);
      debugger;
      console.log("res", res);
    } catch (err) {
      toast.error("Error processing salary");
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={processAllSalary}>
        Process Salary
      </Button>
      <Toaster />
      {salarylist.map((salary: any) => {
        return <SalaryFormComponent key={salary.employeeId} salary={salary} />;
      })}
    </div>
  );
}

export default SalaryListComponent;
