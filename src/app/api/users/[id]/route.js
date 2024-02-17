import { Api, CHECK_ADMIN, api } from "@/lib/ApiHelper";
import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (request, { params }) => {
  return api({ check: CHECK_ADMIN }, async () => {
    const { id } = params;

    try {
      connectToDb();
      const user = await User.findById(id);

      return Api.response(user);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch user");
    }
  });
};

export const DELETE = async (request, { params }) => {
  return api({ check: CHECK_ADMIN }, async () => {
    const { id } = params;

    try {
      connectToDb();
      await User.findByIdAndDelete(id);

      return Api.response("User deleted");
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete user");
    }
  });
};
