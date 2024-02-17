import { Api, CHECK_ADMIN, CHECK_AUTH, api } from "@/lib/ApiHelper";
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (request, { params }) => {
  return api({ check: CHECK_AUTH }, async () => {
    const { slug } = params;

    try {
      connectToDb();
      const post = await Post.findOne({ slug });
      return Api.response(post);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch post");
    }
  });
};

export const DELETE = async (request, { params }) => {
  return api({ check: CHECK_ADMIN }, async () => {
    const { slug } = params;

    try {
      connectToDb();
      await Post.deleteOne({ slug });
      return Api.response("Post deleted");
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete post");
    }
  });
};
