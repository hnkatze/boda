"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateInvitationRSVP } from "@/api/crude"
import type { Invitation } from "@/types/type"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface RSVPFormProps {
  guestData: Invitation
  code: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RSVPForm({ guestData, code }: RSVPFormProps) {

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: guestData.name,
    cellphone: guestData.cellphone,
    attendance: guestData.confirmation ? (guestData.isAssist ? "yes" : "no") : "yes",
    guests: guestData.confirmation ? String(guestData.countGuests) : "1",
    message: guestData.message || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, attendance: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      if (!guestData.id) {
        throw new Error("ID de invitación no disponible")
      }

      const isAssist = formData.attendance === "yes"
      const countGuests = isAssist ? Number.parseInt(formData.guests) || 1 : 0

      await updateInvitationRSVP(guestData.id, isAssist, countGuests, formData.message, formData.cellphone)

      setSuccessMessage("¡Gracias por confirmar! Hemos recibido tu confirmación de asistencia.")

      // Redirigir a la página principal después de 2 segundos
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Hubo un problema al enviar tu confirmación. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre Completo</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cellphone">Teléfono</Label>
        <Input id="cellphone" name="cellphone" value={formData.cellphone} onChange={handleChange} required disabled={guestData.cellphone != ''} />
      </div>

      <div className="space-y-2">
        <Label>¿Asistirás a nuestra boda?</Label>
        <RadioGroup value={formData.attendance} onValueChange={handleRadioChange} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Sí, asistiré</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No podré asistir</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.attendance === "yes" && (
        <div className="space-y-2">
          <Label htmlFor="guests">Número de Invitados (incluyéndote)</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max={guestData.maxGuests}
            value={formData.guests}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-muted-foreground">
            Máximo {guestData.maxGuests} {guestData.maxGuests === 1 ? "persona" : "personas"} (incluyéndote)
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje para los novios (opcional)</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} />
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}

      <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
      </Button>
    </form>
  )
}
