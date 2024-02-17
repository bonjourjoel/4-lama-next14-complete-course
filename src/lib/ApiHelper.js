import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export class Api {
  static CHECK_AUTH = "CHECK_AUTH";
  static CHECK_ADMIN = "CHECK_ADMIN";

  constructor(data, code) {
    this.data = data;
    this.code = code;
  }
  static response(data, code) {
    return new Api(data, code);
  }

  static async exec({ check }, funApiResponse) {
    if (check != null && ![Api.CHECK_AUTH, Api.CHECK_ADMIN].includes(check)) {
      throw new Error(`Invalid api() arg check ${check}`);
    }

    if ([Api.CHECK_AUTH, Api.CHECK_ADMIN].includes(check)) {
      const session = await auth();
      if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
      } else if (check == Api.CHECK_ADMIN && !session?.user?.isAdmin) {
        return NextResponse.json("Forbidden", { status: 403 });
      }
    }

    let apiResponse;
    try {
      apiResponse = await funApiResponse();
    } catch (error) {
      if (error.message.includes("Cast to ObjectId")) {
        return NextResponse.json("Bad request", { status: 400 });
      }
      return NextResponse.json("Internal Server Error", { status: 500 });
    }

    if (apiResponse.data == null) {
      return NextResponse.json("Not found", { status: 404 });
    } else {
      return NextResponse.json(apiResponse.data, {
        status: apiResponse.code || 200,
      });
    }
  }
}
