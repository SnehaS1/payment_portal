import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Salaries from "@/models/salary";

connect();
export async function GET() {
  try {
    const salaries = await Salaries.find({});
    return NextResponse.json({
      message: "Salaries fetched successfully",
      salaries,
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: "Error fetching salary list",
      data: err.message,
      status: 500,
    });
  }
}
