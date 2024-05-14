import Employee from "@/models/employees";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatafromToken";
import Salaries from "@/models/salary";
import { getRandomRole } from "@/helpers/utils";
import { SalaryStatus } from "@/helpers/constants";
import { faker } from "@faker-js/faker";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const {
    allowances,
    fullName,
    joiningDate,
    basicSalary,
    employeeId,
    employeeRole,
    tax,
    deduction,
    salaryStatus,
    email,
  } = reqBody;

  try {
    const employeeById = await Employee.findOne({ employeeId });
    if (employeeById) {
      return NextResponse.json({
        data: "EmployeeId already exists",
        message: "Error",
        status: 500,
      });
    } else {
      const newEmployee = new Employee({
        fullName,
        email,
        joiningDate,
        basicSalary,
        employeeId,
        avatar: faker.image.urlLoremFlickr({ category: "people" }),
        allowances,
        employeeRole: getRandomRole(),
      });

      const savedEmployee = await newEmployee.save();

      const newSalary = await new Salaries({
        employeeId,
        fullName,
        basicSalary,
        allowances: newEmployee.allowances || 0,
        joiningDate,
        email,
        employeeRole: newEmployee.employeeRole,
        salaryStatus: SalaryStatus.PENDING,
      });

      const savedSalary = await newSalary.save();

      return NextResponse.json({
        message: "Success",
        data: reqBody,
        status: 201,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Error",
      data: error.message,
      status: 500,
    });
  }
}
