import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi'
import { Link } from 'react-router';


const UserOrder = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: orderdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email)
    const orders = orderdata?.orders

    if (isLoading) return <div className='text-center text-gray-500'>Carregando...</div>
    { error && <div className='text-center text-gray-500'>Sem pedidos disponíveis</div> }

  return (
      <section className="py-1">
          <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                      <div className="flex flex-wrap items-center">
                          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">Seus Pedidos</h3>
                          </div>
                      </div>
                  </div>

                  <div className="block w-full overflow-x-auto">
                      <table className="items-center bg-transparent w-full border-collapse ">
                          <thead>
                              <tr>
                                  <th className="px-6 border-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      #
                                  </th>
                                  <th className="px-6 border-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Pedidos ID
                                  </th>
                                  <th className="px-6 border-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Data
                                  </th>
                                  <th className="px-6 border-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Status
                                  </th>
                                  <th className="px-6 border-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Total
                                  </th>
                                  <th className="px-6 border-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Visualizar Pedido
                                  </th>
                              </tr>
                          </thead>

                          <tbody>
                              {
                                  orders && orders.map ((order, index) => (
                                      <tr key={index}>
                                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                              {index + 1}
                                          </th>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                              {order.orderId}
                                          </td>
                                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              {
                                                  new Date(order?.createdAt).toLocaleDateString()
                                              }
                                          </td>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              <span className={`py-[2px] px-2 rounded-full ${order.status === 'pendente'
                                                  ? 'bg-red-100 text-red-500'
                                                  : order.status === 'processando'
                                                      ? 'bg-yellow-100 text-yellow-500'
                                                      : order.status === 'enviado'
                                                          ? 'bg-blue-100 text-blue-500'
                                                          : 'bg-green-100 text-green-500'
                                                  }`}>
                                                  {order?.status}
                                              </span>
                                          </td>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              R$ {order.amount}
                                          </td>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                              <Link to={`/orders/${order?._id}`} className="underline hover:text-red-500 cursor-pointer">Visualizar</Link>
                                          </td>
                                      </tr>
                                  ))
                              }
                          </tbody>

                      </table>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default UserOrder