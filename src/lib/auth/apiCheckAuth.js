import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function apiCheckAuth(fun) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    return fun();
  }
}

export async function apiCheckAdmin(fun) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } else {
    return fun();
  }
}
