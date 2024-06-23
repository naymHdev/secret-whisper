import * as React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <div className="font-sans text-gray-800 max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {username}!</h1>
      <p className="mt-4">
        We are excited to have you on board. Please use the following One-Time
        Password (OTP) to verify your email address and complete the
        registration process:
      </p>
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-md inline-block">
        <strong className="text-xl">{otp}</strong>
      </div>
      <p className="mt-4">
        If you did not request this verification, please ignore this email.
      </p>
      <p className="mt-8">Best regards,</p>
      <p>
        <strong>Your Company Name</strong>
      </p>
      <p className="text-xs text-gray-500 mt-4">
        This is an automated message, please do not reply.
      </p>
    </div>
  );
}
