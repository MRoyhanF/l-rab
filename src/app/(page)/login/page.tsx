"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { useTopLoader } from "nextjs-toploader";

export default function LoginPage() {
  const loader = useTopLoader();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    loader.start(); 
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      loader.done();
      toast.error("Username atau password salah")
    } else {
      toast.success("Login berhasil!")

      // Fetch session setelah login untuk dapat role
      const session = await fetch("/api/auth/session").then((res) => res.json())

      if (session?.user?.role) {
        router.push(`/${session.user.role}/dashboard`) // ✅ client-side navigation
        loader.done();
      } else {
        router.push("/login") // ✅ client-side navigation
        loader.done();
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-blue-600">Login</CardTitle>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner className="h-4 w-4" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
