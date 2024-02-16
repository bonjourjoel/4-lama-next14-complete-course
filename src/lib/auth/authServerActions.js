"use server";

import { User } from "../models";
import { connectToDb } from "../utils";
import bcryptjs from "bcryptjs";

const { signIn, signOut } = require("./auth");

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const handleRegisterInternal = async (formData) => {
  const { username, email, img, password, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return "Passwords do not match";
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });
    if (user) {
      return "Username already exists";
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleLoginInternal = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
