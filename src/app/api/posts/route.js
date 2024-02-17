import { Api, CHECK_ADMIN, CHECK_AUTH, api } from "@/lib/ApiHelper";
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
export const GET = async (request) => {
  return api({ check: CHECK_AUTH }, async () => {
    try {
      connectToDb();
      const posts = await Post.find();
      return Api.response(posts);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch posts");
    }
  });
};

export const POST = async (request) => {
  return api({ check: CHECK_ADMIN }, async () => {
    const { title, desc, slug, userId } = await request.json();

    try {
      connectToDb();
      const newPost = new Post({
        title,
        desc,
        slug,
        userId,
      });
      await newPost.save();

      return Api.response(newPost, 201);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to add post");
    }
  });
};
