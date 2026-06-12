import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { productSchema, ProductFormInput, ProductSchema } from '../validations/product.schema'
import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'
import { ImageUpload } from '@components/ui/ImageUpload'
import { useCreateProduct, useUpdateProduct } from '../hooks/useProducts'
import { useCategories } from '@modules/categories/hooks/useCategories'
import { uploadProductImage } from '@services/uploadService'
import { Product } from '@/types/product.types'
import { ROUTES } from '@/constants/routes'

interface ProductFormProps {
    product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
    const navigate = useNavigate()
    const isEditing = !!product

    const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct()
    const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct()
    const { data: categories } = useCategories()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormInput, unknown, ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: product
            ? {
                nome: product.nome,
                descricao: product.descricao,
                preco: product.preco,
                categoriaId: product.categoriaId,
                estoque: product.estoque,
                imagemUrl: product.imagemUrl,
            }
            : undefined,
    })

    const imagemUrl = watch('imagemUrl')

    async function handleUpload(file: File) {
        const tempId = product?.id ?? 'temp'
        return uploadProductImage(file, tempId, (progress) => {
            console.warn(`Upload progress: ${progress}%`)
        })
    }

    async function onSubmit(data: ProductSchema) {
        if (isEditing && product?.id) {
            await updateProduct({ id: product.id, data })
        } else {
            await createProduct(data)
        }
        navigate(ROUTES.PRODUCTS)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Nome do Produto" {...register('nome')} error={errors.nome?.message} />

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select
                        {...register('categoriaId')}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nome}
                            </option>
                        ))}
                    </select>
                    {errors.categoriaId && (
                        <p className="text-xs text-red-600">{errors.categoriaId.message}</p>
                    )}
                </div>

                <Input
                    label="Preço (R$)"
                    type="number"
                    step="0.01"
                    {...register('preco')}
                    error={errors.preco?.message}
                />

                <Input
                    label="Estoque inicial"
                    type="number"
                    {...register('estoque')}
                    error={errors.estoque?.message}
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                    {...register('descricao')}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                {errors.descricao && <p className="text-xs text-red-600">{errors.descricao.message}</p>}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Imagem do Produto</label>
                <ImageUpload
                    value={imagemUrl}
                    onChange={(url) => setValue('imagemUrl', url)}
                    onUpload={handleUpload}
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" type="button" onClick={() => navigate(ROUTES.PRODUCTS)}>
                    Cancelar
                </Button>
                <Button type="submit" loading={isCreating || isUpdating}>
                    {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
                </Button>
            </div>
        </form>
    )
}