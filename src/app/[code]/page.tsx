import { notFound } from "next/navigation"
import { RSVPForm } from "@/components/rsvp-form"

// Esta función simularía la obtención de datos de invitados desde una base de datos
async function getGuestByCode(code: string) {
  // Simulación de datos - en una implementación real, esto vendría de una base de datos
  const guests = {
    dfswq21: { name: "Carlos Rodríguez", email: "carlos@example.com", maxGuests: 2 },
    abc123: { name: "María López", email: "maria@example.com", maxGuests: 1 },
    xyz789: { name: "Juan Pérez", email: "juan@example.com", maxGuests: 4 },
  }

  // Verificar si el código existe
  if (code in guests) {
    return guests[code as keyof typeof guests]
  }

  return null
}

export default async function RSVPPage({ params }: { params:Promise<{ code: string }> }) {
  const { code } = await params
  const guest = await getGuestByCode(code)

  // Si no se encuentra el invitado, mostrar página 404
  if (!guest) {
    notFound()
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

            <RSVPForm guestData={guest} code={code} />
          </div>
        </div>
      </div>
    </main>
  )
}
