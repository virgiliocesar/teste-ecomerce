import { Link } from "react-router";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";


const ProductCards = ({ products }) => {
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        toast.success('Produto adicionado ao carrinho')
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product, index) => (
                <div key={product._id ||index} className="product__card">
                    <div className="relative">
                        <Link to={`/loja/${product._id}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h96 md:h-64 w-full objexct-cover hover:scale-105 transition-all duration-300"
                            />
                        </Link>
                        <div className="hover:block absolute top-4 right-3">
                            <button onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCart(product)
                            }}>
                                <i className="ri-shopping-cart-line bg-primary p-1.5 pad-10
                                text-white hover:bg-primary-dark cursor-pointer"></i>
                            </button>
                        </div>
                    </div>
                    {/* product description */}
                    <div className="product__card__content">
                        <h4>{product.name}</h4>
                        <p>R${product.price} {product?.oldprice ? <s>{product?.oldprice}</s> : null}</p>
                        <RatingStars rating={product.rating} />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ProductCards;