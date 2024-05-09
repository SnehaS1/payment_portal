import React, { useState } from "react";
// import { MaintenanceStatus } from "../constants/enums";
// import { saveVehicle } from "../api";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
interface FormValues {
  fullName: string;
  joiningDate: Dayjs | null;
  vin: string;
  status: string;
  mileage: number;
  type: string;
  maximumLoadCapacity: number;
  lastMaintenanceDate?: Date;
}
const style = {
  light: "#ee9b48",
  main: "#d9a32f",
  dark: "#e1ad12",
  contrastText: "#fff",
};
const initialFormValues: FormValues = {
  fullName: "",
  joiningDate: dayjs(),
  vin: "",
  status: "",
  mileage: 0,
  type: "",
  maximumLoadCapacity: 0,
  lastMaintenanceDate: new Date(),
};

const UserForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  //   const navigate = useNavigate();
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    debugger;
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "lastMaintenanceDate") {
      setFormValues({ ...formValues, [name]: new Date(value) });
    }
    setFormValues({ ...formValues, [name]: value });
  };
  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const validationErrors: Partial<FormValues> = {};
  //     if (!formValues.make) {
  //       validationErrors.make = "Make is required";
  //     } else if (!formValues.vehicleModel) {
  //       validationErrors.vehicleModel = "Make is required";
  //     } else if (!formValues.vin) {
  //       validationErrors.vin = "VIN is required";
  //     } else if (
  //       formValues.vin.length !== 17 ||
  //       formValues.vin.match(/[^A-Za-z0-9]/)
  //     ) {
  //       validationErrors.vin = "VIN must be 17 characters long";
  //     } else if (!formValues.status) {
  //       validationErrors.status = "Status is required";
  //     }
  //     if (Object.keys(validationErrors).length > 0) {
  //       setErrors(validationErrors);
  //       return;
  //     }

  //     try {
  //       saveVehicle(formValues).then((res) => {
  //         setFormValues(initialFormValues); // Reset form after submission
  //         setErrors({});
  //         navigate("/vehicle");
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div className="">
      <form
        //   onSubmit={handleSubmit}
        className="flex flex-col gap-10 "
      >
        <Typography>Enter the employee details</Typography>

        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            placeholder="eg. Jogn Doe"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            placeholder="eg. Jogn Doe"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            placeholder="eg. Jogn Doe"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            placeholder="eg. Jogn Doe"
          />
        </FormControl>
      </form>
    </div>
  );
};

export default UserForm;
