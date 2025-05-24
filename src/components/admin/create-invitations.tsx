"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Invitation } from "@/types/type"
import { createInvitation } from "@/api/crude"

interface CreateInvitationFormProps {
  onSuccess: (invitation: Invitation) => void
}

export function CreateInvitationForm({ onSuccess }: CreateInvitationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    cellphone: "",
    maxGuests: 2,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxGuests" ? Number.parseInt(value) || 1 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const newInvitation = await createInvitation(formData)
      setSuccess(`Invitación creada con éxito. Código: ${newInvitation.code}`)
      setFormData({
        name: "",
        cellphone: "",
        maxGuests: 2,
      })
      onSuccess(newInvitation)
    } catch (err) {
      console.error("Error al crear invitación:", err)
      setError("Hubo un problema al crear la invitación. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif text-rose-800">Crear Nueva Invitación</CardTitle>
        <CardDescription>Completa el formulario para generar una nueva invitación con código único</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Invitado</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cellphone">Número de Teléfono</Label>
            <Input
              id="cellphone"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              placeholder="+504 9999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxGuests">Número Máximo de Invitados</Label>
            <Input
              id="maxGuests"
              name="maxGuests"
              type="number"
              min="1"
              max="10"
              value={formData.maxGuests}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground">Incluye al invitado principal en este número</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md">
              <p>{success}</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full bg-rose-600 hover:bg-rose-700" disabled={loading}>
          {loading ? "Creando..." : "Crear Invitación"}
        </Button>
      </CardFooter>
    </Card>
  )
}
