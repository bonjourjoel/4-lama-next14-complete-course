"use server";

import { User } from "../models";
import { connectToDb } from "../utils";
import bcryptjs from "bcryptjs";

const { signIn, signOut } = require("./auth");

export const handleGithubLogin = async (formData) => {
  const { callbackUrl } = Object.fromEntries(formData);
  await signIn("github", { redirectTo: callbackUrl });
};

export const handleLogout = async () => {
  await signOut();
};

export const handleRegisterInternal = async (previousState, formData) => {
  const { username, email, img, password, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists" };
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
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleLoginInternal = async (previousState, formData) => {
  const { username, password, callbackUrl } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: callbackUrl,
    });
  } catch (err) {
    console.log(err);
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password." };
    } else {
      throw err;
    }
  }
};
