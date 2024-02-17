"use server";

import { revalidatePath } from "next/cache";
import { data } from "../data/data";

export const saAdmAddPost = async (prevState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    data.addPost({ title, desc, slug, userId });
    console.log(`added post ${slug}`);

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const saAdmDeletePost = async (formData) => {
  const { slug } = Object.fromEntries(formData);

  try {
    data.deletePost(slug);
    console.log(`deleted post ${slug}`);

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const saAdmAddUser = async (prevState, formData) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  try {
    data.addUser({ username, email, password, img, isAdmin });
    console.log("saved user");

    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const saAdmDeleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    data.deleteUser(id);
    console.log("deleted user");

    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
