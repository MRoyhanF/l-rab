"use client"

import { useEffect, useState } from "react"
import LogoutButton from "@/components/auth/LogoutButton"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { useProgress } from "@/components/providers/ProgressBarProvider" // pastikan path sesuai

type User = {
  id: number
  username: string
  fullname: string
  role: string
}

export default function DashboardClient({ session }: { session: any }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { startTask, endTask } = useProgress()

  useEffect(() => {
    const fetchUsers = async () => {
      startTask() // mulai progress
      try {
        const res = await fetch("/api/users")
        const data = await res.json()
        await new Promise((resolve) => setTimeout(resolve, 3000)) // simulasi lambat
        setUsers(data)
      } catch (err) {
        console.error("Failed to fetch users", err)
      } finally {
        setLoading(false)
        endTask() // selesai progress
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {session.user.username}</h1>
          <p className="text-gray-500">Role: {session.user.role}</p>
        </div>
        <LogoutButton />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-green-600">
          <LoadingSpinner /> Loading users...
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">All Users</h2>
          <ul className="list-disc list-inside">
            {users.map((user) => (
              <li key={user.id}>
                {user.fullname} (<span className="text-gray-500">{user.role}</span>)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
