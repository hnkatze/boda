
import type { Invitation } from "@/types/type"
import { generateInvitationCode } from "@/lib/utils"
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/config/firebase"

// Colección de invitaciones
const invitationsCollection = collection(db, "invitations")

// Crear una nueva invitación
export async function createInvitation(invitationData: Partial<Invitation>): Promise<Invitation> {
  // Generar un código único para la invitación
  const code = generateInvitationCode()

  // Crear el objeto de invitación con valores por defecto
  const newInvitation = {
    code,
    name: invitationData.name || "",
    cellphone: invitationData.cellphone || "",
    maxGuests: invitationData.maxGuests || 1,
    confirmation: false,
    isAssist: false,
    countGuests: 0,
    message: "",
    createdAt: serverTimestamp(),
  }

  // Añadir a Firestore
  const docRef = await addDoc(invitationsCollection, newInvitation)

  // Devolver la invitación creada con su ID
  return {
    id: docRef.id,
    ...newInvitation,
    createdAt: new Date().toISOString(),
  }
}

// Obtener todas las invitaciones
export async function getAllInvitations(): Promise<Invitation[]> {
  const snapshot = await getDocs(invitationsCollection)

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    } as Invitation
  })
}

// Obtener una invitación por su código
export async function getInvitationByCode(code: string): Promise<Invitation | null> {
  const q = query(invitationsCollection, where("code", "==", code))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  const doc = snapshot.docs[0]
  const data = doc.data()

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
  } as Invitation
}

// Actualizar una invitación
export async function updateInvitation(id: string, updates: Partial<Invitation>): Promise<void> {
  const invitationRef = doc(db, "invitations", id)
  await updateDoc(invitationRef, updates)
}

// Eliminar una invitación
export async function deleteInvitation(id: string): Promise<void> {
  const invitationRef = doc(db, "invitations", id)
  await deleteDoc(invitationRef)
}

// Actualizar la confirmación de asistencia
export async function updateInvitationRSVP(
  id: string,
  isAssist: boolean,
  countGuests: number,
  message: string,
  cellphone: string,
): Promise<void> {
  const invitationRef = doc(db, "invitations", id)
  await updateDoc(invitationRef, {
    confirmation: true,
    isAssist,
    countGuests,
    message,
    cellphone,
  })
}
