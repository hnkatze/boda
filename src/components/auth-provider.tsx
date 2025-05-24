"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User as FirebaseUser } from "firebase/auth"
import { getCurrentUser } from "@/api/auth"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        // Redirigir si es necesario
        if (pathname?.startsWith("/admin") && !currentUser) {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
