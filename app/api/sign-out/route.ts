import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("/sign-in");

  response.headers.set(
    "Set-Cookie",
    "ohlura_session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax"
  );

  return response;
}
