import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface LoginData {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const data: LoginData = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to login" },
      { status: res.status }
    );
  } else {
    cookies().set("authToken", resData, {
        maxAge: 3600 * 24,
      });
  }

  return NextResponse.json(resData);
}