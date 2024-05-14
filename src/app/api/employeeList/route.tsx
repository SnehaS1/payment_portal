import Employee from "@/models/employees";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatafromToken";

connect();
export async function GET(request: NextRequest) {
  try {
    const userToken = await getDataFromToken(request);
    const employees = await Employee.find({});
    return NextResponse.json({
      message: "Employees fetched",
      employeeList: employees,
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: "Error fetching employees",
      employeeList: err.message,
      status: 500,
    });
  }
}
