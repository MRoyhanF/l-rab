import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/hash"

// ✅ GET All (dengan query param filter)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const role = searchParams.get("role")
    const username = searchParams.get("username")

    // pagination params
    const limit = parseInt(searchParams.get("limit") || "10", 10)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const skip = (page - 1) * limit

    // filter
    const where = {
      ...(role ? { role: role as any } : {}),
      ...(username
        ? { username: { contains: username, mode: "insensitive" as const } }
        : {}),
    }

    // query
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: { id: true, username: true, fullname: true, role: true },
      }),
      prisma.user.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data: users,
    })
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
