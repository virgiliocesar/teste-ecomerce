import React, { useEffect, useState } from 'react'
import SelectInput from '../addProduct/SelectInput'
import UploadImage from '../addProduct/UploadImage'
import TextInput from '../addProduct/TextInput'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import logger from '../../../../../src/utils/logger'


const categories = [
    { label: "Selecione a Categoria", value: "" },
    { label: "Acessórios", value: "acessórios" },
    { label: "vestidos", value: "vestidos" },
    { label: "Jóias", value: "jóias" },
    { label: "Cosméticos", value: "cosméticos" },
    { label: "Cuidados com a pele", value: "cuidados com a pele" },
]

const colors = [
    { label: "Selecione a Cor", value: "" },
    { label: "preto", value: "preto" },
    { label: "branco", value: "branco" },
    { label: "vermelho", value: "vermelho" },
    { label: "dourado", value: "dourado" },
    { label: "azul", value: "azul" },
    { label: "prata", value: "prata" },
    { label: "bege", value: "bege" },
    { label: "verde", value: "verde" },
]


const UpdateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        color: "",
        description: "",
        image: "",
    })

    const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id)

    const [newImage, setNewImage] = useState(null)

    const { name, category, color, price, image: imageUrl, description } = productData?.product || {}

    const [UpdateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation()

    useEffect(() => {
        if (productData) {
            setProduct({
                name: name || "",
                category: category || "",
                color: color || "",
                price: price || "",
                image: imageUrl || "",
                description: description || "",
            })
        }
    }, [productData])

    const handleChange =  (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleImageChange = (image) => {
        setNewImage(image)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image,
            author: user?._id
        };
        try {
            await UpdateProduct({ id: id, ...updatedProduct })
            await refetch()
            navigate("/painel/gerenciar-produtos")
        } catch (error) {
            logger.log("Failed to update product", error)
        }
    }

    if (isProductLoading) return <div>Carregando...</div>
    if (fetchError) return <div>Falha ao buscar o produto</div>
    return (
        <div className='container mx-auto mt-8'>
            <div className='container mx-auto mt-8'>
                <h2 className='text-2xl font-bold mb-6'>Atualizar Produto</h2>
                <form onSubmit={handleSubmit} className='space-y-4' >
                    <TextInput
                        label="Nome do Produto"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Nome do Produto"
                    />

                    <SelectInput
                        label="Categoria"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        options={categories}
                    />
                    <SelectInput
                        label="Color"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        options={colors}
                    />
                    <TextInput
                        label="Preço"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="R$ 00,00"
                    />
                    <UploadImage
                        name="image"
                        id="image"
                        value={newImage || product.image}
                        placeholder="Upload imagem"
                        setImage={handleImageChange}
                    />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Escreva uma descrição do produto"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={4} // você pode ajustar a altura aqui
                        ></textarea>
                    </div>


                    <button
                        type="submit"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isUpdating ? "Atualizando..." : "Atualizar Produto"}

                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct