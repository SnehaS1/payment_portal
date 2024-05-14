import { FC } from "react";
import { ErrorMessage } from "@hookform/error-message";

interface InputErrorProps {
  errors: any;
  name: string;
}

export const InputErrorMessage: FC<InputErrorProps> = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }: { message: string }) => (
        <p className="form__error">{message}</p>
      )}
    />
  );
};
