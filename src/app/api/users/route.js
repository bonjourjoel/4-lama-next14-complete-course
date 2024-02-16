import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export const GET = async (request) => {
  try {
    connectToDb();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users");
  }
};
