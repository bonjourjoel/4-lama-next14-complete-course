import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    connectToDb();
    const user = await User.findById(id);

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user");
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    connectToDb();
    await User.findByIdAndDelete(id);

    return NextResponse.json("User deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user");
  }
};
