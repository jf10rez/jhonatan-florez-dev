"use client"

import { useLenis } from "@/hooks/use-lenis"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis()
  return <>{children}</>
}
