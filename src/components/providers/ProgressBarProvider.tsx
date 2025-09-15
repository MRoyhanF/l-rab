"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Start progress bar setiap route berubah
    NProgress.start()
    // Jangan panggil NProgress.done() di sini
  }, [pathname])

  return <>{children}</>
}
