import bcrypt from "bcryptjs";
import credentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "smith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any): Promise<any> => {
        await dbConnect();
        try {
          if (!credentials?.identifier || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await userModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          console.log("user___", user, "credentials__", credentials);

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first!");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password, // Ensure this is the correct property name
            user.password
          );

          if (isPasswordValid) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          console.error("Authorize error:", error.message); // Log the error for debugging
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id?.toString();
        token.isverified = user?.isverified;
        token.isAcceptingMessage = user?.isAcceptingMessage;
        token.username = user?.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isverified = token.isverified;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
        session.user.username = token.username;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
};
