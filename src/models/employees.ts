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
    // type: Date,
    // default: Date.now,
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
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
});

const Employee =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
