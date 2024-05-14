import { NextResponse } from "next/server";
import bcryptjs, { hash } from "bcrypt";
import Users from "@/models/users";
import { stat } from "fs";
import { connect } from "@/dbconfig/dbConfig";

connect();
export async function POST(request: Request) {
  try {
    const { fullName, password, email } = await request.json();

    const userById = await Users.findOne({ email });

    if (userById) {
      throw NextResponse.json({
        message: "Error: User already exists",
        status: 500,
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new Users({
        fullName,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      return NextResponse.json({
        message: "User Registration Successful",
        status: 200,
      });
    }
  } catch (e) {
    return NextResponse.json({
      message: "Error: User Registration Failed",
      status: 500,
    });
  }
}
