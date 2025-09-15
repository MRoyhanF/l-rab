"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      toast.error("Username atau password salah")
    } else {
      toast.success("Login berhasil!")
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600">Login</h1>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner /> {/* Spinner muter */}
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  )
}
