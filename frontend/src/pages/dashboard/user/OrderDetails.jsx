import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi'
import { useParams } from 'react-router'
import TimelineStep from '../../../components/TimelineStep'
import logger from '../../../../src/utils/logger'

const OrderDetails = () => {
    const { orderId } = useParams();
    logger.info(orderId);
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId)
    logger.info(order);

    if(isLoading) return <div>Loading...</div>
    if (error) return <div>No orders!</div>

    if (!order) { return <div>Loading...</div> }

    const isCompleted = (status) => {
        const statuses = ["pendente", "processando", "enviado", "entregue"];
        return statuses.indexOf(status) < statuses.indexOf(order.status);
    }

    const isCurrent = (status) => order.status === status;

    const steps = [
        {
            status: 'pendente',
            label: 'Pendente',
            description: 'Pedido criado. Aguardando início.',
            icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
        },
        {
            status: 'processando',
            label: 'Processando',
            description: 'Estamos preparando seu pedido.',
            icon: { iconName: 'loader-line', bgColor: 'yellow-500', textColor: 'yellow-800' },
        },
        {
            status: 'enviado',
            label: 'Enviado',
            description: 'Seu pedido saiu para entrega.',
            icon: { iconName: 'truck-line', bgColor: 'blue-500', textColor: 'blue-800' },
        },
        {
            status: 'entregue',
            label: 'Entregue',
            description: 'Pedido entregue com sucesso!',
            icon: { iconName: 'check-line', bgColor: 'green-500', textColor: 'green-900' },
        },
    ];

  return (
      <section className='section__container rounded p-6'>
          <h2 className='text-2xl font-semibold mb-4'>Detalhes do Pedido {order?.status}</h2>
          <p className='mb-4'>ID do pedido: {order?.orderId}</p>
          <p className='mb-8'>Status: {order?.status}</p>

          <ol className='sm:flex items-center relative'>
              {
                  steps.map((step, index) => (
                      <TimelineStep
                          key={index}
                          step={step}
                          order={order}
                          isCompleted={isCompleted(step.status)}
                          isCurrent={isCurrent(step.status)}
                          isLastStep={index === steps.length - 1}
                          icon={step.icon}
                          description={step.description}
                      />
                  ))
              }
          </ol>

      </section>
  )
}

export default OrderDetails