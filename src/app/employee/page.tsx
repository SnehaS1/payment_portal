"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { all } from "axios";
import toast, { Toaster } from "react-hot-toast";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { EmployeeRoles } from "@/helpers/constants";
import TextField from "@mui/material/TextField";

export default function SignupPage() {
  const router = useRouter();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  const [user, setUser] = React.useState({
    employeeId: "",
    fullName: "",
    joiningDate: dayjs()!,
    basicSalary: "",
    employeeRole: "",
    tax: "",
    deduction: "",
    allowance: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const notify = () => toast("Here is your toast.");

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/employee", user);
      if (response.data.status === 500) {
        toast.error("EmployeeId already exists!!");
        throw new Error(response.data.message);
      } else {
        toast.success("Employee created successfully");
        router.push("/employeeList");
      }
    } catch (error: any) {
      console.log("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.employeeId.length > 0 &&
      user.fullName.length > 0 &&
      user.basicSalary.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Typography variant="h1" component="h2" gutterBottom>
        {loading ? "Processing..." : "Employee"}
      </Typography>

      <hr />
      <Toaster />
      <label htmlFor="username">Full Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="fullName"
        type="text"
        value={user.fullName}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="employeeId">Employye ID</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="employeeId"
        type="text"
        value={user.employeeId}
        onChange={(e) => setUser({ ...user, employeeId: e.target.value })}
        placeholder="employee Id"
      />
      <FormControl fullWidth>
        <InputLabel id="employeeRole">Employee Role</InputLabel>
        <Select
          labelId="employeeRole"
          id="employeeRole"
          value={user.employeeRole}
          label="Employee Role"
          onChange={(e) => setUser({ ...user, employeeRole: e.target.value })}
        >
          {Object.values(EmployeeRoles).map((role) => (
            <MenuItem value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <label htmlFor="email">Joining Date</label>
      {/* <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="joiningDate"
        type="text"
        value={user.joiningDate}
        onChange={(e) => setUser({ ...user, joiningDate: e.target.value })}
        placeholder="email"
      /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Joining Date"
          value={value}
          onChange={(newValue) =>
            newValue && setUser({ ...user, joiningDate: newValue })
          }
        />
      </LocalizationProvider>
      <label htmlFor="basicSalary">Basic Salary</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="basicSalary"
        type="number"
        value={user.basicSalary}
        onChange={(e) => setUser({ ...user, basicSalary: e.target.value + "" })}
        placeholder="Enter Basic Salry"
      />
      <section className="flex gap-3 my-5">
        <TextField
          className="my-2"
          id="tax"
          type="number"
          label="Tax"
          variant="outlined"
          value={user.tax}
          onChange={(e) => setUser({ ...user, tax: e.target.value + "" })}
        />
        <TextField
          className="my-2"
          id="allowance"
          type="number"
          label="Allowance"
          variant="outlined"
          value={user.allowance}
          onChange={(e) => setUser({ ...user, allowance: e.target.value + "" })}
        />
        <TextField
          className="my-2"
          id="deduction"
          label="Deduction"
          variant="outlined"
          value={user.deduction}
          onChange={(e) => setUser({ ...user, deduction: e.target.value + "" })}
          type="number"
        />
      </section>

      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        <Typography>
          {buttonDisabled ? "Disabled" : "Create Employee"}
        </Typography>
      </button>
    </div>
  );
}
