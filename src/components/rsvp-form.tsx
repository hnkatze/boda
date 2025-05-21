"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface GuestData {
  name: string
  email: string
  maxGuests: number
}

interface RSVPFormProps {
  guestData: GuestData
  code: string
}

export function RSVPForm({ guestData, code }: RSVPFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: guestData.name,
    email: guestData.email,
    phone: "",
    attendance: "yes",
    guests: "1",
    message: "",
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
      // Aquí iría la lógica para enviar los datos a un servidor
      // Simulamos una petición con un timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted:", { ...formData, code })

      // Mostrar mensaje de confirmación
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
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
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
