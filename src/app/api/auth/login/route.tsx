import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/users";
import bcryptjs, { hash } from "bcrypt";
import Cookies from "js-cookie";

import { connect } from "@/dbconfig/dbConfig";
import { getInitialsFromName } from "@/helpers/utils";
import { use } from "react";

connect();
export async function POST(request: NextRequest, response: NextResponse) {
  const req = await request.json();
  const { email, password, token } = req;
  bcryptjs;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    } else {
      const isMatchPassword = await bcryptjs.compare(password, user.password);
      if (isMatchPassword) {
        const tokenData = {
          id: user._id,
          email: user.email,
          username: user.fullName,
        };
        const jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        const response = NextResponse.json({
          message: "Login successful",
          success: true,
          token: jwtToken,
          status: 200,
          user: user.fullName,
        });

        response.cookies.set("userName", getInitialsFromName(user.fullName), {
          httpOnly: true,
        });

        response.cookies.set("token", jwtToken, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({
          error: "Invalid Password check credentials",
          status: 400,
        });
      }
    }
  } catch (e: any) {
    console.log(e);
  }
}
