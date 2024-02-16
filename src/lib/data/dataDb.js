import { Post, User } from "../models";
import { connectToDb } from "../utils";
import { unstable_noStore as noStore } from "next/cache";

export class DataDb {
  async getPosts() {
    try {
      connectToDb();
      const posts = await Post.find();
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch posts!");
    }
  }

  async getPost(slug) {
    try {
      connectToDb();
      const post = await Post.findOne({ slug });
      return post;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to fetch post ${slug}!`);
    }
  }

  async getUsers() {
    try {
      connectToDb();
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to fetch users`);
    }
  }

  async getUser(id) {
    noStore();
    try {
      connectToDb();
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to fetch user ${id}!`);
    }
  }
}
