import { useState, useCallback, DragEvent, ChangeEvent } from 'react'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import { cn } from '@utils/cn'

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    onUpload: (file: File) => Promise<string>
}

export function ImageUpload({ value, onChange, onUpload }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    async function handleFile(file: File) {
        if (!file.type.startsWith('image/')) {
            alert('Apenas imagens são permitidas.')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Imagem deve ter no máximo 5MB.')
            return
        }

        setUploading(true)
        try {
            const url = await onUpload(file)
            onChange(url)
        } finally {
            setUploading(false)
            setProgress(0)
        }
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    return (
        <div className="space-y-2">
            {value ? (
                <div className="relative w-40 h-40">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ) : (
                <label
                    className={cn(
                        'flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed',
                        'cursor-pointer transition-colors',
                        isDragging
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 bg-gray-50 hover:bg-gray-100',
                    )}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                            <p className="text-sm text-gray-500">{progress}%</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <UploadCloud className="h-8 w-8 text-gray-400" />
                            <p className="text-sm text-gray-500">Clique ou arraste uma imagem</p>
                            <p className="text-xs text-gray-400">PNG, JPG até 5MB</p>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                        disabled={uploading}
                    />
                </label>
            )}
        </div>
    )
}