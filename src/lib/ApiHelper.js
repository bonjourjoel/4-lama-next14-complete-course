import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export const CHECK_AUTH = "CHECK_AUTH";
export const CHECK_ADMIN = "CHECK_AUTH";

export class Api {
  constructor(data, code) {
    this.data = data;
    this.code = code;
  }
  static response(data, code) {
    return new Api(data, code);
  }
}

export async function api({ check }, funApiResponse) {
  if (check != null && ![CHECK_AUTH, CHECK_ADMIN].includes(check)) {
    throw new Error(`Invalid api() arg check ${check}`);
  }

  if ([CHECK_AUTH, CHECK_ADMIN].includes(check)) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (check == CHECK_ADMIN && !session?.user?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const apiResponse = await funApiResponse();

  if (apiResponse.data == null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } else {
    return NextResponse.json(apiResponse.data, {
      status: apiResponse.code || 200,
    });
  }
}
