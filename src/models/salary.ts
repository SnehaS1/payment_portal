import { EmployeeRoles, SalaryStatus } from "@/helpers/constants";
import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, "Please provide fullName"],
  },
  basicSalary: {
    type: Number,
    required: [true, "Please provide a basic salary"],
  },
  employeeRole: {
    type: String,
    enum: Object.values(EmployeeRoles),
    required: true,
  },
  avatar: {
    type: String,
  },
  tax: {
    type: Number,
  },
  deduction: {
    type: Number,
  },
  allowance: {
    type: Number,
  },
  salaryStatus: {
    type: String,
    enum: Object.values(SalaryStatus),
    default: SalaryStatus.PENDING,
  },
  email: {
    type: String,
  },
});

console.log("mongoose modeks", mongoose.models);
const Salaries =
  mongoose.models.salaries || mongoose.model("salaries", salarySchema);

export default Salaries;
