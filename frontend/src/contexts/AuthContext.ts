import { createContext, useEffect, useState, ReactNode } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth'
import { firebaseAuth } from '@services/firebase'
import { AuthUser, LoginCredentials } from '@types/user.types'
import { api } from '@services/api'

interface AuthContextData {
  user: AuthUser | null
  loading: boolean
  signIn: (credentials: LoginCredentials) => Promise<void>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken()
          
          // Busca dados do usuário no backend (nome, role, etc.)
          try {
            const response = await api.get('/auth/me', {
              headers: { Authorization: `Bearer ${token}` },
            })

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              nome: response.data.nome,
              role: response.data.role,
              token,
            })
          } catch {
            setUser(null)
          }
        } else {
          setUser(null)
        }

        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  async function signIn({ email, password }: LoginCredentials) {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  async function handleSignOut() {
    await signOut(firebaseAuth)
    setUser(null)
  }

  async function sendPasswordReset(email: string) {
    await sendPasswordResetEmail(firebaseAuth, email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut: handleSignOut,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}