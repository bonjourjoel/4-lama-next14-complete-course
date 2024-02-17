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

  async addPost({ title, desc, slug, userId }) {
    try {
      connectToDb();
      const newPost = new Post({
        title,
        desc,
        slug,
        userId,
      });

      await newPost.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to add post ${slug}!`);
    }
  }

  async deletePost(slug) {
    try {
      connectToDb();
      await Post.findOneAndDelete(slug);
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to delete post ${slug}!`);
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

  async getUser(userId) {
    noStore();
    try {
      connectToDb();
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to fetch user ${userId}!`);
    }
  }

  async findUserByUsername(username) {
    connectToDb();
    return User.findOne({ username });
  }

  async findUserByEmail(email) {
    connectToDb();
    return User.findOne({ email });
  }

  async addUser({ username, email, password, img, isAdmin }) {
    try {
      connectToDb();
      const newUser = new User({
        username,
        email,
        password,
        img,
        isAdmin,
      });

      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to add user ${username}!`);
    }
  }

  async deleteUser(id) {
    try {
      connectToDb();
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to delete user ${id}!`);
    }
  }
}
