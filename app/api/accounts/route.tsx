import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch(`https://frontend-test-api.yoldi.agency/api/user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: res.status }
    );
  }

  const resData = await res.json();
  return NextResponse.json(resData);
}
