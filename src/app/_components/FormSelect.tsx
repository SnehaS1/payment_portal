import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFormSelectProps = {
  name: string;
  options: { value: string; label: string }[];
  endAdornment?: React.ReactNode;
} & SelectProps;

const FormSelect: FC<IFormSelectProps> = ({ name, options, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const generateSingleOptions = (): React.ReactNode => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...otherProps}
          margin={"dense"}
          {...field}
          error={!!errors[name]}
        >
          {generateSingleOptions()}
        </Select>
      )}
    />
  );
};

export default FormSelect;
