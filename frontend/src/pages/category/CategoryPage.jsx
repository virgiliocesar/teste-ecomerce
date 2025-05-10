import { useParams } from "react-router"
import { useState, useEffect } from "react"
import products from '../../data/products'
import ProductCards from "../shop/ProductCards"

const CategoryPage = () => {
  const { categoryName } = useParams()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const filtered = products.filter((product) => product.category === categoryName.toLowerCase())
    setFilteredProducts(filtered)
  }, [categoryName])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">Navegue por uma faixa diversificada o caterones, resulta em acessórios versáteis. Eleve seu estilo hoje!</p>
      </section>
      {/* <!-- Product card --> */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  )
}

export default CategoryPage