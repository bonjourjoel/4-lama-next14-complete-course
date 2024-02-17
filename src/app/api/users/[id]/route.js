import { Api } from "@/lib/ApiHelper";
import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (request, { params }) => {
  return Api.exec({ check: Api.CHECK_ADMIN }, async () => {
    const { id } = params;

    connectToDb();
    const user = await User.findById(id);

    return Api.response(user);
  });
};

export const DELETE = async (request, { params }) => {
  return Api.exec({ check: Api.CHECK_ADMIN }, async () => {
    const { id } = params;

    connectToDb();
    await User.findByIdAndDelete(id);

    return Api.response("User deleted");
  });
};
