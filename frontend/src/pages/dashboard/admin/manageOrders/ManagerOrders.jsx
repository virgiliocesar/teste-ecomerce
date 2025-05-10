import React, { useState } from 'react'
import { Link } from 'react-router';
import UpdateOrderModal from './UpdateOrderModal';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import { toast } from 'react-toastify';
import logger from '../../../../../src/utils/logger';


const ManageOrders = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteOrder] = useDeleteOrderMutation();

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            toast.success("Order deleted successfully");
            refetch();

        } catch (error) {
            logger.error("Failed to delete order:", error);
        }
    }

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Something went wrong!</div>

    return (
        <>
            <section className="py-1 bg-blueGray-50 w-full">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Pedidos</h3>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            <i className="ri-file-list-line"></i>
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Pedido ID
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            cliente
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            status
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Data
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Ver <i className="ri-eye-line"></i>
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Editar <i className="ri-pencil-line"></i>
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-1  border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Deletar <i className="ri-delete-bin-2-line"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, index) => (
                                            <tr className="text-gray-700" key={order._id || index}>
                                                <th
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {index + 1}
                                                </th>
                                                <td
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {order?.orderId || 'N/A'}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {order?.email || 'N/A'}
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
                                                    {order?.updatedAt && new Date(order.updatedAt).toLocaleDateString() || 'N/A'}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer">
                                                    <Link
                                                        to={`#`}
                                                        className="cursor-pointer hover:text-indigo-500" >
                                                        Ver <i className="ri-eye-line"></i>
                                                    </Link>

                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full cursor-pointer"
                                                        onClick={() => handleEditOrder(order)}>
                                                        Editar
                                                        <i className="ri-pencil-line"></i>
                                                    </button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDeleteOrder(order?._id)}
                                                        className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer'>
                                                        Excluir <i className="ri-delete-bin-2-line"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal */}
            {
                selectedOrder && (
                    <UpdateOrderModal
                        order={selectedOrder}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                )
            }
        </>
    )
}

export default ManageOrders