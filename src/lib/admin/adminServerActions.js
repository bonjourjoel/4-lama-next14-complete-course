"use server";

import { revalidatePath } from "next/cache";
import { data } from "../data/data";

export const saAdmAddPost = async (prevState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    await data.addPost({ title, desc, slug, userId });
    console.log(`added post ${slug}`);
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
};

export const saAdmDeletePost = async (formData) => {
  const { slug } = Object.fromEntries(formData);

  try {
    await data.deletePost(slug);
    console.log(`deleted post ${slug}`);
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
};

export const saAdmAddUser = async (prevState, formData) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  try {
    await data.addUser({ username, email, password, img, isAdmin });
    console.log("saved user");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }

  revalidatePath("/admin");
};

export const saAdmDeleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await data.deleteUser(id);
    console.log("deleted user");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }

  revalidatePath("/admin");
};
