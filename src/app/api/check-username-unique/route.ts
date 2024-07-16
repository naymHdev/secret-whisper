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
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
    // validate with Zod
    const result = UserNameSchema.safeParse(queryParams);
    console.log("result___", result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message:
          usernameErrors?.length > 0
            ? usernameErrors.join(", ")
            : "Invalid query parameters",
      });
    }

    const { username } = result.data;

    const existingVerifiedUser = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking username_", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
