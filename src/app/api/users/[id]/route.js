import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export const GET = async (request, { id }) => {
  try {
    connectToDb();
    const user = await User.findOne({ id });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user");
  }
};