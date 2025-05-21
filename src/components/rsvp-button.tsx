"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function RSVPButton() {
  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "yes",
    guests: "0",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, attendance: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para enviar los datos a un servidor
    console.log("Form submitted:", formData)

    // Mostrar mensaje de confirmación
    setShowSuccess(true)

    // Cerrar el diálogo después de 2 segundos
    setTimeout(() => {
      setOpen(false)
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="px-8 py-6 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-lg font-serif"
      >
        Confirmar Asistencia
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-dancing text-rose-800">Confirma tu Asistencia</DialogTitle>
            <DialogDescription>
              Por favor, completa el formulario para confirmar tu asistencia a nuestra boda.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
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
                  max="5"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje para los novios (opcional)</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} />
            </div>

            {showSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mt-4">
                <p className="text-center">¡Gracias por confirmar! Hemos recibido tu confirmación de asistencia.</p>
              </div>
            )}

            <DialogFooter>
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
