import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { ROUTES } from '@/constants/routes'

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(data: LoginForm) {
        try {
            await signIn(data)
            navigate(ROUTES.DASHBOARD)
        } catch {
            toast.error('Email ou senha incorretos')
        }
    }

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
                <p className="text-sm text-gray-500 mt-2">Acesse o painel do catálogo</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                />

                <Input
                    label="Senha"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                />

                <Button type="submit" loading={isSubmitting} className="w-full">
                    Entrar
                </Button>
            </form>
        </div>
    )
}