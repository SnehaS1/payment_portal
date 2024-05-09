import Employee from "@/models/employees";
import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatafromToken";

connect();
export async function GET() {
  try {
    const employees = await Employee.find({});
    return NextResponse.json({
      message: "Employees fetched",
      data: employees,
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: "Error fetching employees",
      data: err.message,
      status: 500,
    });
  }
}
