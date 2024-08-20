import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const loginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const loginResponseData = await loginResponse.json();

    if (!loginResponse.ok) {
      return NextResponse.json(
        {
          message: "Не удалось выполнить вход",
        },
        { status: loginResponse.status }
      );
    } else {
      cookies().set("authToken", loginResponseData, {
        maxAge: 3600 * 24,
      });
      cookies().set("userEmail", email, {
        maxAge: 3600 * 24,
      });
      return NextResponse.json(loginResponseData);
    }
  } catch (err) {
    console.error(err);
  }
}
