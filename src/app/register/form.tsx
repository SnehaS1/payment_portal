"use client";
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormInput from "../_components/FormInput";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Loader from "../_components/Loader";

const registerSchema = object({
  fullName: string()
    .nonempty("Name is required")
    .max(30, "Name must be less than 30 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type RegisterInput = TypeOf<typeof registerSchema>;
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;
  console.log("isSubmitSuccessful", isSubmitSuccessful);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const errorKeys = Object.keys(errors);
  const errortext = errorKeys.join(", ").replace(/,([^,]*)$/, ", and$1");
  const onSubmit: SubmitHandler<RegisterInput> = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", {
        ...values,
        email: values.email.toLowerCase(),
        password: values.password.trim(),
      });

      if (response.data.status !== 200) {
        toast.error(response.data.message);
      } else {
        toast.success("Registration Successful");
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
        Register
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
            label="Name"
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
            name="password"
            required
            fullWidth
            label="Password"
            type="password"
            sx={{ mb: 2 }}
          />

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
            Register
          </LoadingButton>
          <Typography
            variant="body1"
            sx={{ my: "1rem", textDecoration: "underline", cursor: "pointer" }}
            className="hover:font-extrabold text-blue-900"
            onClick={() => router.push("/login")}
            textAlign="end"
          >
            Proceed to login
          </Typography>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default RegisterForm;
