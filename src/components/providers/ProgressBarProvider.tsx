"use client"

import { createContext, useContext, useEffect, useState } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

type ProgressContextType = {
  startTask: () => void
  endTask: () => void
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used inside ProgressBarProvider")
  return ctx
}

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const [activeTasks, setActiveTasks] = useState(0)

  useEffect(() => {
    if (activeTasks > 0) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [activeTasks])

  const startTask = () => setActiveTasks((t) => t + 1)
  const endTask = () => setActiveTasks((t) => Math.max(0, t - 1))

  return (
    <ProgressContext.Provider value={{ startTask, endTask }}>
      {children}
    </ProgressContext.Provider>
  )
}
