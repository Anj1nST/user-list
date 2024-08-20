import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        message: "Не удалось загрузить данные user",
        status: response.status,
      });
    } else {
      return NextResponse.json(response);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function PATCH(request: Request) {
  const token = cookies().get("authToken");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // TODO: Решить проблему с аутентификацией
      Authentication: `Bearer ${token}`,
    },
    body: JSON.stringify(request.body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: response.status }
    );
  } else {
    return NextResponse.json(response);
  }
}
