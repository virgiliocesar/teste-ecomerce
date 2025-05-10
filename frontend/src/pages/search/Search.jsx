import { useState } from "react"
import productsData from "../../data/products"
import ProductCards from "../shop/ProductCards"

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(productsData)

    const handleSearch = () => {
        const query = searchQuery.toLowerCase()

        const filtered = productsData.filter((product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))
        setFilteredProducts(filtered)
    }

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">Search Products</h2>
                <p className="section__subheader">Navegue entre uma variedade de categorias, de vestidos chiques a acessórios versáteis. Eleve seu estilo hoje!</p>
            </section>

            <section className="section__container">
                <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
                    <input type="text"
                        value={searchQuery}
                        placeholder="Procure produtos..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar w-full max-w-4xl p-2 border rounded" />
                    <button
                        onClick={handleSearch}
                        className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded">
                        Search
                    </button>

                </div>
                <ProductCards products={filteredProducts} />
            </section>
        </>
    )
}

export default Search