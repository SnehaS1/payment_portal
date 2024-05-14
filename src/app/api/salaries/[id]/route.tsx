import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Salaries from "@/models/salary";
import { SalaryStatus } from "@/helpers/constants";

connect();
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      _id,
      isEOS,
      basicSalary,
      allowances = 0,
      addition,
      deduction,
      processDate,
    } = body;
    const gross = basicSalary + allowances + addition - deduction;
    const updateSalaryData = await Salaries.findByIdAndUpdate(_id, {
      salaryStatus: SalaryStatus.PAID,
      isEndOfService: isEOS,
      addition,
      deduction,
      grossSalary: gross,
      processDate: processDate,
    });

    return NextResponse.json({
      message: "Salary Paid Successfully!!",
      salary: updateSalaryData,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
