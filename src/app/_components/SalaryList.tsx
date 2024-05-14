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
import { useEffect, useState } from "react";
import SalaryTable from "./SalaryTable";

function SalaryListComponent({
  salaryList,
  paymentHistory = false,
}: {
  salaryList: any;
  paymentHistory?: Boolean;
}) {
  const [apiLoader, setApiLoader] = useState<boolean>(false);
  const processAllSalary = async () => {
    try {
      console.log("Processing all salary");

      const res = await axios.put(`api/salaries`);
      console.log("res", res);
    } catch (err) {
      toast.error("Error processing salary");
    }
  };
  return (
    <div>
      <SalaryTable salaries={salaryList} paymentHistory={paymentHistory} />
    </div>
  );
}

export default SalaryListComponent;
