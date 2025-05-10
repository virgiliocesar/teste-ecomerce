import { useSelector } from "react-redux"
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi"



const UserPayments = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: ordersdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email)

    if (isLoading) return <div className='text-center text-gray-500'>Loading...</div>
    if (error) return <div className='text-center text-gray-500'>Nenhum pedido encontrado.</div>
    const orders = ordersdata?.orders || {}
    const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);
  return (
      <div className="py-6 px-4 ">
          <h3 className="text-xl font-semibold mb-4">
              Pagamentos totais
          </h3>
          <div className="">
              <p>Gasto Total: R$ {totalPayment ? totalPayment : 0}</p>
              <ul>
                  {
                      orders?.map((order, index) => (
                          <li key={order._id} className="mb-4 shadow-lg p-4">
                              <h5 className="font-semibold text-gray-800 mb-2">Ordem #{index + 1}
                                  <br /><span className="text-gray-400">
                                  {order.orderId}
                              </span></h5>
                              <div>
                                  <span className="text-gray-600">
                                      <p>Valor R$ {order.amount.toFixed(2)}</p>
                                  </span>
                              </div>
                              <div className="flex md:flex-row items-center space-x-2">
                                  <span className="text-gray-600">
                                     Date: {new Date(order?.createdAt).toLocaleString()}
                                  </span>
                                  <p className="text-gray-600">
                                      Status: <span className={`ml-2 py-[2px] px-2 rounded-full ${order.status === 'pendente'
                                    ? 'bg-red-100 text-red-500'
                                    : order.status === 'processando'
                                    ? 'bg-yellow-100 text-yellow-500'
                                    : order.status === 'enviado'
                                    ? 'bg-blue-100 text-blue-500'
                                    : 'bg-green-100 text-green-500'
                                          }`}>
                                          {order.status}
                                      </span>
                                  </p>

                              </div>
                          </li>
                      ))
                  }
              </ul>
          </div>
    </div>
  )
}

export default UserPayments