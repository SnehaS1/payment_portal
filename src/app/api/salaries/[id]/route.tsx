import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Salaries from "@/models/salary";
import { SalaryStatus } from "@/helpers/constants";

connect();
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("body PURT salary", body);
    // const ticketData = body.formData;
    const { _id, isEndOfService } = body;

    // const updateTicketData = await Ticket.findByIdAndUpdate(id, {
    //   ...ticketData,
    // });
    const updateSalaryData = await Salaries.findByIdAndUpdate(_id, {
      salaryStatus: SalaryStatus.PAID,
      isEndOfService,
    });
    console.log("updateSalaryData", updateSalaryData);

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
