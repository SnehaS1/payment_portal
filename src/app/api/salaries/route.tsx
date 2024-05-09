import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Salaries from "@/models/salary";
import { SalaryStatus } from "@/helpers/constants";

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

export async function PUT(req: NextRequest) {
  try {
    console.log("body PURT salary", req.body);
    const updateSalaryList = await Salaries.updateMany(
      { $set: { salaryStatus: SalaryStatus.PAID } },
      { upsert: true }
    );
    console.log("updateSalaryList", updateSalaryList);
    return NextResponse.json({
      message: "Salary Paid Successfully!!",
      salary: updateSalaryList,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error Updating salary list", error },
      { status: 500 }
    );
  }
}
