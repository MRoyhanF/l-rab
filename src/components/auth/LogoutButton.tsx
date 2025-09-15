"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut({ callbackUrl: "/login" })
    setLoading(false)
  }

  return (
    <Button onClick={handleLogout} disabled={loading}>
      {loading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner /> Logging out...
        </div>
      ) : (
        "Logout"
      )}
    </Button>
  )
}
