"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { signOut } from "@/api/auth"

import { InvitationsTable } from "@/components/admin/invitations-table"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { CreateInvitationForm } from "@/components/admin/create-invitations"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/admin")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  const handleInvitationCreated = () => {
    // Incrementar el trigger para refrescar la tabla
    setRefreshTrigger((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-rose-100">
        <p className="text-rose-800">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return null // Redirigiendo a login
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-dancing text-4xl text-rose-800">Panel de Administración</h1>
          <Button variant="outline" className="flex items-center space-x-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span>Cerrar sesión</span>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <CreateInvitationForm onSuccess={handleInvitationCreated} />
          </div>
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-serif text-xl text-rose-800 mb-4">Instrucciones</h2>
              <ul className="space-y-2 text-rose-700 list-disc pl-5">
                <li>Crea invitaciones completando el formulario a la izquierda.</li>
                <li>Cada invitación generará un código único de 8 caracteres.</li>
                <li>Comparte el enlace personalizado con tus invitados.</li>
                <li>Monitorea las respuestas en la tabla de abajo.</li>
                <li>
                  El enlace para cada invitado será:{" "}
                  <span className="font-mono bg-rose-50 px-1 rounded">tudominio.com/CÓDIGO</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <InvitationsTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  )
}
