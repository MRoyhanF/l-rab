import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const PUBLIC_PATHS = ["/login", "/register", "/api/auth", "/api/users"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Biarkan public path lolos
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Ambil token user
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Kalau tidak ada token → redirect ke login
  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js)).*)", // semua kecuali asset statis
  ],
}
