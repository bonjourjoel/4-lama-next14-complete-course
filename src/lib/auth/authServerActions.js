"use server";

const { signIn, signOut } = require("./auth");

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};
