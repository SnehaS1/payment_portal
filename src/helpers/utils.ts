import dayjs, { Dayjs } from "dayjs";
import { EmployeeRoles } from "./constants";

export const handledateFormat = (date: Dayjs): string => {
  return dayjs(date).format("D MMM YYYY");
};

export const handleAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
  }).format(amount);
};

export const handleGrossCalculation = (
  base: number,
  tax: number,
  deduction: number,
  allowances: number
): number => {
  return 0;
};

export const getInitialsFromName = (name: string = ""): string => {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
};

export const getRandomRole = (): string => {
  const rolesArray: string[] = Object.values(EmployeeRoles);
  const randomIndex = Math.floor(Math.random() * rolesArray.length);
  return rolesArray[randomIndex];
};

export const getTokenClient = () => {
  return "";
};
