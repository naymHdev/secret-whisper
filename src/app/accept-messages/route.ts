import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { User } from "next-auth";
