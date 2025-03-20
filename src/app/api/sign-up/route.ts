
/*  
  This code handles user registration with email verification.  
  - It checks if the username is already taken by a verified user.  
  - It checks if the email is already registered:  
    - If registered and verified → returns an error.  
    - If registered but not verified → updates password & resends verification code.  
    - If new email → creates a new user with a verification code.  
  - Sends a verification email to the user.  
  - Returns success or error messages accordingly.  
*/

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/User";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";






export async function POST(request: Request) {
        await dbConnect();
        console.log("✅ Connected to DB");
      
        try {
          const { username, email, password } = await request.json();
          console.log("🟡 Received Data:", { username, email, password });
      
          const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });
          console.log("🔍 Checking Username:", existingUserVerifiedByUsername);
      
          if (existingUserVerifiedByUsername) {
            console.log("❌ Username already taken");
            return NextResponse.json(
              { success: false, message: "Username is already taken" },
              { status: 400 }
            );
          }
      
          const existingUserByEmail = await UserModel.findOne({ email });
          console.log("🔍 Checking Email:", existingUserByEmail);
      
          const verifyCode = Math.floor(10000 + Math.random() * 90000).toString();
          console.log("🔢 Generated Verify Code:", verifyCode);
      
          if (existingUserByEmail) {
                if (existingUserByEmail.isVerified) {
                  console.log("❌ Email already registered and verified");
                  return NextResponse.json(
                    { success: false, message: "USER ALREADY EXIST" },
                    { status: 400 }
                  );
                } else {
                  console.log("🔄 Updating existing user (not verified yet)");
                  const hashedPassword = await bcrypt.hash(password, 10);
                  existingUserByEmail.username = username;  // ✅ Update username
                  existingUserByEmail.password = hashedPassword;
                  existingUserByEmail.verifyCode = verifyCode;
                  existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                  await existingUserByEmail.save();
                  console.log("✅ User updated:", existingUserByEmail);
                }
              }
              else {
            console.log("🆕 Creating new user...");
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
      
            const newUser = new UserModel({
              username,
              email,
              password: hashedPassword,
              verifyCode,
              verifyCodeExpiry: expiryDate,
              isVerified: false,
              isAcceptingMessages: true,
              messages: [],
            });
      
            await newUser.save();
            console.log("✅ New user saved:", newUser);
          }
      
          console.log("📧 Sending verification email...");
          const emailResponse = await sendVerificationEmail(email, username, verifyCode);
          if (!emailResponse.success) {
            console.log("❌ Email sending failed:", emailResponse.message);
            return NextResponse.json(
              { success: false, message: emailResponse.message },
              { status: 500 }
            );
          }
      
          console.log("✅ User registered successfully");
          return NextResponse.json(
            { success: true, message: "User registered successfully. Please verify your email" },
            { status: 201 }
          );
        } catch (error) {
          console.error("❌ Error in registering user:", error);
          return NextResponse.json(
            { success: false, message: "Error in registering the user" },
            { status: 500 }
          );
        }
      }
      