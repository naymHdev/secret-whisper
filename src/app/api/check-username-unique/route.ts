import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UserNameSchema = z.object({
  username: usernameValidation,
});

//  mongoose Get method
export async function GET(request: Request) {
  await dbConnect();
  try {
  } catch (error) {
    console.error("Error checking username_", error);
  }
}
