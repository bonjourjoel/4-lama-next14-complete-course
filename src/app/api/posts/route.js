import { Api } from "@/lib/ApiHelper";
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
export const GET = async (request) => {
  return Api.exec({ check: Api.CHECK_AUTH }, async () => {
    connectToDb();
    const posts = await Post.find();
    return Api.response(posts);
  });
};

export const POST = async (request) => {
  return Api.exec({ check: Api.CHECK_ADMIN }, async () => {
    const { title, desc, slug, userId } = await request.json();

    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();

    return Api.response(newPost, 201);
  });
};
