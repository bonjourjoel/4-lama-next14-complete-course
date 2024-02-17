import { Api } from "@/lib/ApiHelper";
import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (request) => {
  return Api.exec({ check: Api.CHECK_ADMIN }, async () => {
    const { searchParams } = new URL(request.url);

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
  });
};

export const POST = async (request) => {
  return Api.exec({ check: Api.CHECK_ADMIN }, async () => {
    const { username, email, password, img } = await request.json();

    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });
    await newUser.save();

    return Api.response(newUser, 201);
  });
};
