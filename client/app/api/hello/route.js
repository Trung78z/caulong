import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    console.log(request.body);
    return new NextResponse("Hello", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
