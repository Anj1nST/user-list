import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const signUpResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (!signUpResponse.ok) {
      return NextResponse.json({
        message: "Не удалось выполнить регистрацию",
        status: signUpResponse.status,
      });
    } else {
      return NextResponse.json(signUpResponse);
    }
  } catch (err) {
    console.error(err);
  }
}
