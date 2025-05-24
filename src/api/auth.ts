
import { auth, db } from "@/config/firebase"
import { User } from "@/types/type"
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
type User as FirebaseUser,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

// Iniciar sesión
export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    throw error
  }
}

// Cerrar sesión
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    throw error
  }
}

// Obtener el usuario actual
export function getCurrentUser(): Promise<FirebaseUser | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

// Obtener datos del usuario desde Firestore
export async function getUserData(uid: string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as User
    }

    return null
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error)
    return null
  }
}

// Crear un usuario en Firestore (para uso administrativo)
export async function createUserInFirestore(uid: string, email: string, role = "admin"): Promise<void> {
  try {
    const userRef = doc(db, "users", uid)
    await setDoc(userRef, {
      email,
      role,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error al crear usuario en Firestore:", error)
    throw error
  }
}
