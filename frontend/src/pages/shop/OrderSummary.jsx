import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';

import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from '../../utils/baseUrl.js';
import logger from '../../../src/utils/logger.js';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const products = useSelector((store) => store.cart.products);

  const {
    selectedItems,
    totalPrice,
    tax,
    taxRate,
    grandTotalPrice
  } = useSelector((store) => store.cart);

  //^ clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //^ payment integration
  const makePayment = async (e) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    const body = {
      products: products,
      userId: user?._id,
    }
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch(`${getBaseUrl()}/api/orders/create-checkout-session`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })

    const session = await response.json();
    logger.info("session", session);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
    logger.info("result", result);
    if (result.error) {
      logger.error("error", result.error);
    }
  }

  return (
    <div className="bg-primary-light rounded text-base">
      <div className='px-6 py-4 space-y-5'>
        <h2 className='text-xl font-bold'>Order Summary</h2>
        <p className='mt-2'>Item selecionado: {selectedItems}</p>
        <p>Total: R${totalPrice.toFixed(2)}</p>
        <p>Tax ({taxRate * 100}%): R${tax.toFixed(2)}</p>
        <h3 className='font-bold'>Valor Final: R${grandTotalPrice.toFixed(2)}</h3>
        <div className='px-4 mb-6'>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 cursor-pointer'
          >
            <span className='mr-2'>Limpar Carrinho</span>
            <i className='ri-delete-bin-7-line'></i>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              makePayment();
            }}
            className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 cursor-pointer'
          >
            <span className='mr-2'>Ir para Checkout</span>
            <i className='ri-bank-card-line'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;