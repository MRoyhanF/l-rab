import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/login", "/register", "/forgot-password"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/api")) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized or invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const role = token.role as string
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url))
  }
  if (pathname.startsWith("/guru") && role !== "guru") {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url))
  }
  if (pathname.startsWith("/murid") && role !== "murid") {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url))
  }

  return NextResponse.next()
}

// Middleware akan kena semua route kecuali _next, static, dll
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
