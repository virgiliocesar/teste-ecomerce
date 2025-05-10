import { useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import UploadImage from './UploadImage'
import { useAddProductMutation } from '../../../../redux/features/products/productsApi'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
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
    { label: "Selecione a Cor", value: ""},
    { label: "preto", value: "preto"},
    { label: "branco", value: "branco"},
    { label: "vermelho", value: "vermelho"},
    { label: "dourado", value: "dourado"},
    { label: "azul", value: "azul"},
    { label: "prata", value: "prata"},
    { label: "bege", value: "bege"},
    { label: "verde",  value: "verde"},
]

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth)

    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        color: "",
    })
    const [image, setImage] = useState('')
    const [AddProduct, { isLoading, error }] = useAddProductMutation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.price || !product.description || !product.color) {
            toast.error('Por favor, preencha todos os campos necessários');
            return;
        }

        try {
            await AddProduct({ ...product, image, author: user?._id }).unwrap();
            toast.success('Produto adicionado com sucesso!');
            setProduct({
                name: '',
                category: '',
                color: '',
                price: '',
                description: ''
            })
            setImage('');
            navigate("/loja")
        } catch (error) {
            logger.error("Failed to submit product", error);
        }
    }

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
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
                    label="Cor"
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
                    placeholder="00.00"
                />
                <UploadImage
                    name="image"
                    id="image"
                    value={e => setImage(e.target.value)}
                    onChange={handleChange}
                    placeholder="Upload imagem"
                    setImage={setImage}
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
                        rows={4} //ajustar a altura aqui
                    ></textarea>
                </div>


                <button
                    type="submit"
                    className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600"
                    disabled={isLoading}
                >
                    {isLoading ? "Adicionando..." : "Adicionar Produto"}
                </button>
            </form>
        </div>
    )
}
export default AddProduct