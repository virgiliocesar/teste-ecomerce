import { useSelector } from 'react-redux'
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi'
import { useNavigate } from 'react-router'

const UserReviews = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id)
    const navigate = useNavigate();
    if (isLoading) return <div className='text-center text-gray-500'>Loading...</div>
    { error && <div className='text-center text-red-500 mb-4'>Falha ao carregar avaliações!</div> }


    const handleCardClick = () => {
        navigate('/loja')
    }

  return (
      <div className='py-6'>
          <h2 className='text-2xl font-semibold mb-4'>Suas Avaliações</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
              {
                  reviews?.map((review, index) => (
                      <div key={index} className='bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200'>
                          <p className='text-lg fonte-semibold mb-2'> Avaliação: {review?.comment}</p>
                          <p className='mb-2'><strong>Comentário: </strong>{review?.comment}</p>
                          <p className='text-sm text-gray-500'><strong>ProdutoId: </strong>{review?.productId}</p>
                          <p className='text-sm text-gray-500'><strong>Data: </strong>{new Date(review?.createdAt).toLocaleDateString()}</p>
                          
                      </div>
                  ))
              }
              <div
                  onClick={handleCardClick}
                  className='bg-gray-100  text-black flex items-cente justify-center rounded-lg p-6 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200'>
                  <span>+</span>
                  <p>Adicionar Nova Avaliação</p>
                  
              </div>
          </div>
    </div>
  )
}

export default UserReviews