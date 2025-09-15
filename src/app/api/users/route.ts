import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/hash"

// ✅ GET All (dengan query param filter)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const role = searchParams.get("role")
    const username = searchParams.get("username")

    const users = await prisma.user.findMany({
      where: {
        ...(role ? { role: role as any } : {}),
        ...(username ? { username: { contains: username, mode: "insensitive" } } : {}),
      },
      select: { id: true, username: true, fullname: true, role: true },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// ✅ POST (Create user baru)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, fullname, password, role } = body

    if (!username || !fullname || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        username,
        fullname,
        password: hashedPassword,
        role: role || "murid",
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
