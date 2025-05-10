import { useState } from "react"

import ProductCards from "./ProductCards"
import ShopFiltering from "./ShopFiltering"

import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const filters = {
    categories: ['ver tudo', 'acessórios', 'vestidos', 'jóias', 'cosméticos', 'cuidados com a pele'],
    colors: ['ver tudo', 'preto', 'branco', 'vermelho', 'dourado', 'azul', 'prata', 'bege', 'verde'],
    priceRanges: [
        { label: 'até R$50', min: 0, max: 50 },
        { label: 'R$50 - R$100', min: 50, max: 100 },
        { label: 'R$100 - R$200', min: 100, max: 200 },
        { label: 'acima de R$200', min: 200, max: Infinity },
    ]
}

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'ver tudo',
        color: 'ver tudo',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [ProductsPerPage] = useState(8)

    const { category, color, priceRange } = filtersState
    const [minPrice, maxPrice] = priceRange.split('-').map(Number)

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'ver tudo' ? category : '',
        color: color !== 'ver tudo' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
    })

    //^ Atualiza filtros e reseta a página
    const updateFiltersState = (newState) => {
        setFiltersState(newState)
        setCurrentPage(1)
    }

    //^ Limpa os filtros e reseta a página
    const clearFilters = () => {
        setFiltersState({
            category: 'ver tudo',
            color: 'ver tudo',
            priceRange: ''
        })
        setCurrentPage(1)
    }

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>Error: {error.error}</h1>

    const startProduct = (currentPage - 1) * ProductsPerPage + 1
    const endProduct = startProduct + products.length - 1

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">Loja <i className="ri-shopping-cart-2-line"></i></h2>
                <p className="section__subheader">Descubra as escolhas mais quentes: eleve seu estilo com a nossa coleção com curadoria de produtos de moda femininos de tendência.</p>
            </section>

            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    {/* Filtros */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={updateFiltersState}
                        clearFilters={clearFilters}
                    />

                    {/* Produtos */}
                    <div>
                        <h3 className="text-1 font-medium mb-4">
                            Mostrando {startProduct} para {endProduct} de {totalProducts} produtos
                        </h3>
                        <ProductCards products={products} />

                        {/* Paginação */}
                        <div className="mt-6 flex justify-center">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-4 py-1.5 bg-gray-300 text-gray-700 rounded-md mr-2 cursor-pointer"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-1.5 bg-gray-300 text-gray-700 rounded-md mr-2 cursor-pointer
                                        ${index + 1 === currentPage ? 'bg-primary text-white' : ''}
                                    `}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-4 py-1.5 bg-gray-300 text-gray-700 rounded-md mr-2 cursor-pointer"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
