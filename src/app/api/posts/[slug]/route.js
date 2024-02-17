import { Api } from "@/lib/ApiHelper";
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (request, { params }) => {
  return Api.exec({ check: Api.CHECK_AUTH }, async () => {
    const { slug } = params;

    connectToDb();
    const post = await Post.findOne({ slug });
    return Api.response(post);
  });
};

export const DELETE = async (request, { params }) => {
  return Api.exec({ check: Api.CHECK_ADMIN }, async () => {
    const { slug } = params;

    connectToDb();
    await Post.deleteOne({ slug });
    return Api.response("Post deleted");
  });
};
