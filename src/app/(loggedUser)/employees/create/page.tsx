"use client";
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EmployeeRoles } from "@/helpers/constants";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { literal, object, string, number, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Loader from "@/app/_components/Loader";
import FormInput from "@/app/_components/FormInput";

const registerSchema = object({
  fullName: string()
    .min(3, "Name must be at least 3 characters")
    .nonempty("Name is required")
    .max(30, "Name must be less than 30 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
  allowances: z
    .string()
    .refine(
      (v) => {
        let n = Number(v);
        return !isNaN(n) && v?.length > 0;
      },
      { message: "Enter number" }
    )
    .optional(),
  basicSalary: z
    .string()
    .refine(
      (v) => {
        let n = Number(v);
        return !isNaN(n) && v?.length > 0;
      },
      { message: "Enter number" }
    )
    .refine(
      (v) => {
        let n = Number(v);
        return n > 0;
      },
      { message: "Basic Salary must be greater than zero" }
    ),
  employeeId: string().nonempty("Employee Id is required"),
});

type RegisterInput = TypeOf<typeof registerSchema>;
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [val, setVal] = useState<string>("");
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      allowances: "0",
      basicSalary: "0",
      employeeId: "",
    },
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  // const { control } = useFormContext();

  const {
    reset,
    getValues,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  console.log("errors", errors);
  const errorKeys = Object.keys(errors);

  const errortext = errorKeys.join(", ").replace(/,([^,]*)$/, ", and$1");
  const onSubmit: SubmitHandler<RegisterInput> = async (values) => {
    try {
      setLoading(true);
      const inputValue = {
        ...values,
        basicSalary: Number(values.basicSalary),
        allowances: Number(values.allowances),
        joiningDate: date?.toISOString(),
      };
      const response = await axios.post("/api/employee", inputValue);

      if (response.data.status === 200 || response.data.status === 201) {
        console.log("Registration Successful", response);
        toast.success("Registration Successful");
        router.push("/employees");
      } else {
        toast.error(`${response.data.message}: ${response.data.data}`);
      }
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "30rem",
        background: "rgba( 255, 255, 255, 0.55 )",
        padding: "2rem",
        borderRadius: "1rem",
      }}
      className="hover:bg-white/[1]"
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: "2rem" }}
        color={"#0A1647"}
      >
        Add Employee
      </Typography>
      {loading && <Loader />}
      <Toaster />
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            name="fullName"
            required
            fullWidth
            label="Full Name"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="employeeId"
            required
            fullWidth
            label="Employee Id"
            sx={{ mb: 2 }}
          />

          <FormInput
            name="email"
            required
            fullWidth
            label="Email"
            type="email"
            sx={{ mb: 2 }}
          />

          <FormInput
            required
            name="basicSalary"
            fullWidth
            label="Basic Salary"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="allowances"
            fullWidth
            label="Salary Allowances"
            type="number"
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Joining Date"
              sx={{
                width: "100%",
                mb: 2,
              }}
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>

          <FormGroup>
            <FormHelperText error={!!errorKeys}>
              {errorKeys.length
                ? errortext + " missing. Please add to proceed"
                : ""}
            </FormHelperText>
          </FormGroup>
          <LoadingButton
            variant="contained"
            fullWidth
            type="submit"
            loading={loading}
            sx={{ py: "0.8rem", mt: "1rem" }}
          >
            Add Employee
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default RegisterForm;
