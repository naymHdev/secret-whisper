import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import userModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { sendVerificationsEmail } from '@/helpers/sendVerificationsEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json() as { username: string; email: string; password: string };

    const existingUserVerifiedByUsername = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return NextResponse.json({
        success: false,
        message: "Username is already taken",
      }, { status: 400 });
    }

    const existingUserByEmail = await userModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json({
          success: false,
          message: "User already exists with this email",
        }, { status: 400 });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // SEND VERIFY EMAIL
    const emailResponse = await sendVerificationsEmail(email, username, verifyCode);
    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message,
      }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      message: "User registered successfully. Please verify your email!",
    }, { status: 201 });
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json({
      success: false,
      message: "Error registering user",
    }, { status: 500 });
  }
}
