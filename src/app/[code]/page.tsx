"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RSVPForm } from "@/components/rsvp-form"
import type { Invitation } from "@/types/type"
import { getInvitationByCode } from "@/api/crude"

export default function RSVPPage({ params }: { params: Promise<{ code: string }> }) {
  const [guest, setGuest] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const { code } =await  params
        if (!code) {
          router.push("/")
          return
        }

        const guestData = await getInvitationByCode(code)
        if (guestData) {
          setGuest(guestData)
        } else {
          setError("Invitación no encontrada")
          // Opcional: redirigir después de un tiempo
          setTimeout(() => {
            router.push("/")
          }, 3000)
        }
      } catch (err) {
        console.error("Error al obtener invitación:", err)
        setError("Hubo un problema al cargar la invitación")
      } finally {
        setLoading(false)
      }
    }

    fetchGuest()
  }, [params, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 flex items-center justify-center">
        <div className="text-rose-800">Cargando invitación...</div>
      </main>
    )
  }

  if (error || !guest) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-rose-600 py-6 px-8 text-white text-center">
              <h1 className="font-dancing text-4xl mb-2">Bryan & Genesis</h1>
              <p className="font-serif">21 de Junio, 2025</p>
            </div>

            <div className="p-8 text-center">
              <h2 className="font-serif text-2xl text-rose-800 mb-4">¡Ups!</h2>
              <p className="text-rose-700 mb-4">{error || "No se encontró la invitación"}</p>
              <p className="text-rose-700">Serás redirigido a la página principal en unos segundos...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-rose-600 py-6 px-8 text-white text-center">
            <h1 className="font-dancing text-4xl mb-2">Bryan & Genesis</h1>
            <p className="font-serif">21 de Junio, 2025</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl text-rose-800 mb-4">¡Hola, {guest.name}!</h2>
              <p className="text-rose-700">
                Nos encantaría contar con tu presencia en nuestra boda. Por favor, confirma tu asistencia.
              </p>
            </div>

            <RSVPForm guestData={guest} code={guest.code} />
          </div>
        </div>
      </div>
    </main>
  )
}
