import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // YOU MAY WANT TO ADD SOME VALIDATION HERE
  } catch (e) {
    return NextResponse.json({ message: "error Registering user" });
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
