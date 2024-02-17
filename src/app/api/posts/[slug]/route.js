import { apiCheckAdmin, apiCheckAuth } from "@/lib/auth/apiCheckAuth";
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  return apiCheckAuth(async () => {
    const { slug } = params;

    try {
      connectToDb();
      const post = await Post.findOne({ slug });
      return NextResponse.json(post);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch post");
    }
  });
};

export const DELETE = async (request, { params }) => {
  return apiCheckAdmin(async () => {
    const { slug } = params;

    try {
      connectToDb();
      await Post.deleteOne({ slug });
      return NextResponse.json("Post deleted");
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete post");
    }
  });
};
