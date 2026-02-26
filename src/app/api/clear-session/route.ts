import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ 
    success: true, 
    message: "Session cookies cleared" 
  });
  
  // Clear all next-auth cookies
  const cookiesToClear = [
    "next-auth.session-token",
    "next-auth.callback-url",
    "next-auth.csrf-token",
    "__Secure-next-auth.session-token",
    "__Secure-next-auth.callback-url",
    "__Host-next-auth.csrf-token",
  ];
  
  cookiesToClear.forEach((cookie) => {
    response.cookies.set(cookie, "", {
      maxAge: 0,
      path: "/",
    });
  });
  
  return response;
}
