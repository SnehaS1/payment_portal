import { EmployeeRoles } from "@/helpers/constants";
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, "Please provide employeeId"],
    unique: [true, "EmployeeId already exists"],
  },
  fullName: {
    type: String,
    required: [true, "Please provide fullName"],
  },
  joiningDate: {
    type: String,
    required: [true, "Please provide a joining date"],
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
  allowances: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
  },
});

const Employee =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
