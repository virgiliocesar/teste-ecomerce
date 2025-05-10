import React from 'react'

const UserStats = ({stats}) => {
  return (
      <div className='my-5 space-y-4'>
          <div className='grid gap-4 md:grid-cols-2  lg:grid-cols3 grid-cols-1'>
              <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 
              hover:border-primary-color cursor-pointer hover:scale-105 transition-all duration-200'>
                  <h2 className='text-xl font-semibold mb-2'>Pagamento Total</h2>
                  <p className='text-2xl font-bold'>R$ {stats?.totalPaymentsAmount.toFixed(2)}</p>
              </div>
              <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 
              hover:border-primary-color cursor-pointer hover:scale-105 transition-all duration-200'>
                  <h2 className='text-xl font-semibold mb-2'>Total de Avaliações</h2>
                  <p className='text-2xl font-bold'>{stats?.totalReviews}</p>
              </div>
              <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 
              hover:border-primary-color cursor-pointer hover:scale-105 transition-all duration-200'>
                  <h2 className='text-xl font-semibold mb-2'>Total de Compras</h2>
                  <p className='text-2xl font-bold'>{stats?.totalPurchasedProducts}</p>
              </div>
          </div>
    </div>
  )
}

export default UserStats