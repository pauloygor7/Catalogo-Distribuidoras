import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@components/ui/Button'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary capturou:', error, info)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                    <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
                    <h2 className="text-lg font-semibold text-gray-900">Algo deu errado</h2>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm">
                        Ocorreu um erro inesperado. Tente recarregar a página.
                    </p>
                    <Button
                        className="mt-6"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Tentar novamente
                    </Button>
                </div>
            )
        }

        return this.props.children
    }
}