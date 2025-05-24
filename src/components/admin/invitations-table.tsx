"use client"

import { useState, useEffect } from "react"
import { getAllInvitations, deleteInvitation } from "@/api/crude"
import type { Invitation } from "@/types/type"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface InvitationsTableProps {
  refreshTrigger: number
}

export function InvitationsTable({ refreshTrigger }: InvitationsTableProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true)
      try {
        const data = await getAllInvitations()
        setInvitations(data)
        setError(null)
      } catch (err) {
        console.error("Error al obtener invitaciones:", err)
        setError("No se pudieron cargar las invitaciones")
      } finally {
        setLoading(false)
      }
    }

    fetchInvitations()
  }, [refreshTrigger])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Código copiado",
      description: `El código ${code} ha sido copiado al portapapeles`,
    })
  }

  const handleCopyLink = (code: string) => {
    const link = `${window.location.origin}/${code}`
    navigator.clipboard.writeText(link)
    toast({
      title: "Enlace copiado",
      description: "El enlace de invitación ha sido copiado al portapapeles",
    })
  }

  const handleDelete = async (id: string) => {
    if (!id) return

    if (window.confirm("¿Estás seguro de que deseas eliminar esta invitación?")) {
      try {
        await deleteInvitation(id)
        setInvitations((prev) => prev.filter((inv) => inv.id !== id))
        toast({
          title: "Invitación eliminada",
          description: "La invitación ha sido eliminada correctamente",
        })
      } catch (err) {
        console.error("Error al eliminar invitación:", err)
        toast({
          title: "Error",
          description: "No se pudo eliminar la invitación",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif text-rose-800">Invitaciones</CardTitle>
        <CardDescription>Lista de todas las invitaciones creadas y sus respuestas</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Cargando invitaciones...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
            <p>{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Máx. Invitados</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Asistencia</TableHead>
                  <TableHead>Invitados Confirmados</TableHead>
                  <TableHead>Fecha Creación</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No hay invitaciones creadas
                    </TableCell>
                  </TableRow>
                ) : (
                  invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell className="font-medium">{invitation.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{invitation.code}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyCode(invitation.code)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{invitation.cellphone}</TableCell>
                      <TableCell>{invitation.maxGuests}</TableCell>
                      <TableCell>
                        {invitation.confirmation ? (
                          <Badge className="bg-green-500">Respondido</Badge>
                        ) : (
                          <Badge variant="outline">Pendiente</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {invitation.confirmation ? (
                          invitation.isAssist ? (
                            <Badge className="bg-green-500">Asistirá</Badge>
                          ) : (
                            <Badge variant="destructive">No asistirá</Badge>
                          )
                        ) : (
                          <Badge variant="outline">Pendiente</Badge>
                        )}
                      </TableCell>
                      <TableCell>{invitation.confirmation ? invitation.countGuests : "-"}</TableCell>
                      <TableCell>{formatDate(invitation.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleCopyLink(invitation.code)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(invitation.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
