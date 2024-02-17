import { Api, CHECK_ADMIN, api } from "@/lib/ApiHelper";
import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
export const GET = async (request) => {
  return api({ check: CHECK_ADMIN }, async () => {
    const { searchParams } = new URL(request.url);

    try {
      connectToDb();
      let users;
      if (searchParams.get("username") != null) {
        users = await User.find({ username: searchParams.get("username") });
      } else if (searchParams.get("email") != null) {
        users = await User.find({ email: searchParams.get("email") });
      } else {
        users = await User.find();
      }

      return Api.response(users);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch users");
    }
  });
};

export const POST = async (request) => {
  return api({ check: CHECK_ADMIN }, async () => {
    const { username, email, password, img } = await request.json();
    try {
      connectToDb();
      const newUser = new User({
        username,
        email,
        password,
        img,
      });
      await newUser.save();

      return Api.response(newUser, 201);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to add user");
    }
  });
};
