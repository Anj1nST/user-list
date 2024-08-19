import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const token = cookies().get("authToken");

  const res = await fetch(
    `https://frontend-test-api.yoldi.agency/api/profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`,
      },
      body: JSON.stringify(request.body),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: res.status }
    );
  }

  const resData = await res.json();
  return NextResponse.json(resData);
}
