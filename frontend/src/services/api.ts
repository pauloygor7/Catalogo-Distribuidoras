import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { firebaseAuth } from './firebase'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de REQUEST — injeta o token automaticamente
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = firebaseAuth.currentUser

    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor de RESPONSE — trata erros globais
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status
    const message = error.response?.data?.message

    if (status === 401) {
      firebaseAuth.signOut()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (status === 403) {
      toast.error('Você não tem permissão para realizar esta ação.')
      return Promise.reject(error)
    }

    if (status === 404) {
      toast.error('Recurso não encontrado.')
      return Promise.reject(error)
    }

    if (status && status >= 500) {
      toast.error('Erro interno do servidor. Tente novamente.')
      return Promise.reject(error)
    }

    if (message) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)