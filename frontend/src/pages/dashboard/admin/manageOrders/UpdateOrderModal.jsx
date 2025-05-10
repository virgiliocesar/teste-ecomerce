import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';
import logger from './../../../../../src/utils/logger';

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
    const [status, setStatus] = useState(order?.status);

    const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = async () => {
        try {
            await updateOrderStatus({ id: order?._id, status })
            onClose();
        } catch (error) {
            logger.error("Failed to update order status:", error);
        }
    }

    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-6 text-center '>Editar Status </h2>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700'>Acesso</label>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full">
                            <option value="entregue">Entregue</option>
                            <option value="enviado">Enviado</option>
                            <option value="processando">Processando</option>
                            <option value="pendente">Pendente</option>
                        </select>
                    </div>
                </div>

                <div className='flex justify-end gap-3'>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderModal
