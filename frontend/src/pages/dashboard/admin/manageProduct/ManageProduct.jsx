import { useState } from 'react'
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import logger from '../../../../../src/utils/logger'

const ManageProduct = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [ProductsPerPage, setProductsPerPage] = useState(10)
    const { data, error, isLoading, refetch } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: ProductsPerPage,
    })


    const { products = [], totalPages, totalProducts } = data || {}

    const startProduct = (currentPage - 1) * ProductsPerPage + 1
    const endProduct = startProduct + products.length - 1

    const [deleteProduct] = useDeleteProductMutation()
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await deleteProduct(productId).unwrap();
            toast.success("Produto deletado com sucesso!");
            await refetch();
        } catch (error) {
            logger.error("Erro ao deletar produto:", error);
        }
    }

    return (
        <>
            {
                isLoading && <div className='text-center text-gray-500'>Carregando...</div>
            }
            {
                error && <div className='text-center text-gray-500'>Falha ao carregar produtos!</div>
            }
            <section className="py-1 bg-blueGray-50 w-full">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Todos os Produtos</h3>
                                </div>
                            </div>
                            <p className="text-xs text-blueGray-400 mt-2 ">Mostrando {startProduct} para {endProduct} de {totalProducts} produtos </p>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            <i className="ri-file-list-line"></i>
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Nome do Produto
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Data da Publicação
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Editar <i className="ri-pencil-line"></i>
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Deletar
                                            <i className="ri-delete-bin-2-line"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product, index) => (
                                            <tr className="text-gray-700" key={product._id || index}>
                                                <th
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {index + 1}
                                                </th>
                                                <td
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {product?.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {product?.updatedAt && new Date(product.updatedAt).toLocaleDateString() || 'N/A'}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer">
                                                    <Link
                                                        to={`/painel/atualizar-produto/${product._id}`}
                                                        className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full cursor-pointer" >
                                                        Editar
                                                        <i className="ri-pencil-line"></i>
                                                    </Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                        className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer'> Excluir <i className="ri-delete-bin-2-line"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* pagination */}

                <div className="mt-6 flex justify-center">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`px-4 py-1.5 rounded-md mr-2
                        ${currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-300 text-gray-700 cursor-pointer'}
                                `}>
                        Anterior
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = pageNumber === currentPage;

                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`px-4 py-1.5 rounded-md mr-2
                                        ${isActive
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-300 text-gray-700 cursor-pointer'}
                                `}>
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`px-4 py-1.5 rounded-md
                        ${currentPage === totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-300 text-gray-700 cursor-pointer'}
                            `}>
                        Próximo
                    </button>
                </div>

            </section>
        </>
    )
}

export default ManageProduct