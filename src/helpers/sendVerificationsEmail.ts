import { resend } from "@/lib/resend";
import { apiResponse } from "@/types/apiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationsEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<apiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email send successfully." };
  } catch (emailError) {
    console.log("Error sending verification email!", emailError);
    return { success: false, message: "Failed to send verification email!" };
  }
}
