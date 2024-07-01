import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "smith@example.com",
        },
        password: { label: "Password", type: "pass***" },
      },
      authorize: async (credentials: any): Promise<any> => {
        await dbConnect();
        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found this email");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
};
