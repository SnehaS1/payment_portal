import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
type IFormInputProps = {
  name: string;
} & TextFieldProps;

const FormDate: FC<IFormInputProps> = ({ name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue={dayjs().startOf("month")}
      name="joiningDate"
      rules={{
        required: {
          value: true,
          message: "Joining date is required",
        },
      }}
      render={({ field: { onChange, value, ref } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            disableFuture
            onChange={onChange}
            value={value}
            inputRef={ref}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormDate;
