"use client";
import { Box, FormGroup, FormHelperText, Typography } from "@mui/material";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import FormInput from "../_components/FormInput";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Loader from "./Loader";

const loginSchema = object({
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type RegisterInput = TypeOf<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const errorKeys = Object.keys(errors);
  const errortext = errorKeys.join(", ").replace(/,([^,]*)$/, ", and$1");
  const onSubmit: SubmitHandler<RegisterInput> = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", values);
      if (response.data.status !== 200) {
        toast.error(`${response.data.error}: Try Again or Register Again`);
      } else {
        Cookies.set("token_client", response.data.token ? "1" : "0");
        Cookies.set("userName_client", decodeURIComponent(response.data.user));

        toast.success("Login Successful");
        router.push("/employees");
      }
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast.error("Login Failed");
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
      {loading && <Loader />}
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: "2rem" }}
        color={"#0A1647"}
      >
        Login
      </Typography>
      <Toaster />
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            name="email"
            id="email"
            required
            fullWidth
            label="Email"
            type="email"
            sx={{ mb: 2 }}
          />
          <FormInput
            id="password"
            name="password"
            required
            fullWidth
            label="Password"
            type={"password"}
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
            Login
          </LoadingButton>
          <Typography
            variant="body1"
            sx={{ my: "1rem", textDecoration: "underline", cursor: "pointer" }}
            className="hover:font-extrabold text-blue-900"
            onClick={() => router.push("/register")}
            textAlign="end"
          >
            Register Here
          </Typography>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
