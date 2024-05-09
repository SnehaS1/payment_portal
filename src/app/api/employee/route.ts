import Employee from "@/models/employees";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatafromToken";
import { de, faker } from "@faker-js/faker";
import Salaries from "@/models/salary";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const {
    allowance,
    fullName,
    joiningDate,
    basicSalary,
    employeeId,
    employeeRole,
    tax,
    deduction,
    salaryStatus,
  } = reqBody;
  console.log("employees post request: ", reqBody);
  try {
    const employeeById = await Employee.findOne({ employeeId });
    if (employeeById) {
      throw NextResponse.json({
        message: "Error:EmployeeId already exists",
        status: 500,
      });
    } else {
      const newEmployee = new Employee({
        fullName: faker.person.fullName(),
        joiningDate,
        basicSalary,
        employeeId,
        employeeRole,
        avatar: faker.image.urlLoremFlickr({ category: "people" }),
        email: faker.internet.email(),
        birthdate: faker.date.between({
          from: "1992-01-01T00:00:00.000Z",
          to: "2010-01-01T00:00:00.000Z",
        }),
      });
      const savedEmployee = await newEmployee.save();
      const newSalary = await new Salaries({
        employeeId,
        fullName: savedEmployee.fullName,
        basicSalary,
        tax,
        deduction,
        allowance,
        salaryStatus,
        employeeRole,
        email: savedEmployee.email,
      });

      const savedSalary = await newSalary.save();

      console.log("savedEmployee", savedEmployee);
      console.log("savedSalary", savedSalary);

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
