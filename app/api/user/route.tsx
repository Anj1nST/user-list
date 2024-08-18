import { NextResponse } from "next/server";

interface UserData {
  name: "string";
  email: "string";
  slug: "string";
  description: "string";
  image: {
    id: "string";
    url: "string";
    width: "string";
    height: "string";
  };
  cover: {
    id: "string";
    url: "string";
    width: "string";
    height: "string";
  };
}

export async function GET(request: Request) {
  console.log("request", request);
  const data: UserData = await request.json();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/:slug`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const resData = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: res.status }
    );
  }

  return NextResponse.json(resData);
}
