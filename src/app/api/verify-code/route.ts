import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  console.log("Connected to DB");

  try {
    // Debug JSON parsing
    const body = await request.json();
    console.log("Request Body:", body);

    const { username, code } = body;
    if (!username || !code) {
      return NextResponse.json({ success: false, message: "Missing username or code" }, { status: 400 });
    }

    // Debug username decoding
    const decodedUsername = decodeURIComponent(username);
    console.log("Decoded Username:", decodedUsername);

    // Check if user exists
    const user = await UserModel.findOne({ username: decodedUsername });
    console.log("User Found:", user);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Check code validity
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    console.log("Code Valid:", isCodeValid, "Code Expired:", !isCodeNotExpired);

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json({ success: true, message: "Account verified successfully" }, { status: 200 });
    } else if (!isCodeNotExpired) {
      return NextResponse.json({ success: false, message: "Verification code expired. Please request a new one." }, { status: 400 });
    } else {
      return NextResponse.json({ success: false, message: "Incorrect verification code" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
