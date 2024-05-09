import dayjs, { Dayjs } from "dayjs";

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
