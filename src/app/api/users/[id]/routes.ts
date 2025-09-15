import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/hash"

// ✅ GET by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      select: { id: true, username: true, fullname: true, role: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// ✅ PATCH (Update user)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { username, fullname, password, role } = body

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        ...(username && { username }),
        ...(fullname && { fullname }),
        ...(password && { password: await hashPassword(password) }),
        ...(role && { role }),
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
