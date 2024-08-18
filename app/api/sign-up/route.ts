import { NextResponse } from "next/server";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const data: SignUpData = await request.json();

  const signUpResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!signUpResponse.ok) {
    return NextResponse.json(
      { message: "Failed to sign up" },
      { status: signUpResponse.status }
    );
  }

  const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email, password: data.password }),
  });

  if (!loginResponse.ok) {
    return NextResponse.json(
      { message: "Failed to log in after sign up" },
      { status: loginResponse.status }
    );
  }

  const responseData = await loginResponse.json();
  return NextResponse.json(responseData);
}
