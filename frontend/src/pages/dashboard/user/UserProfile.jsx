import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEditProfileMutation } from "../../../redux/features/auth/authApi"
import avatarImg from '../../../assets/avatar.png'
import { setUser } from "../../../redux/features/auth/authSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import logger from "../../../../src/utils/logger"

const UserProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [editProfile,{isLoading, isError, error,isSuccess }] = useEditProfileMutation()
    const [formData, setformData] = useState({
        username:'',
        profileImage: '',
        bio: '',
        profession: '',
        userId:''
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
            if(user) {
               setformData({
                username: user?.username || '',
                profileImage: user?.profileImage || '',
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId: user?._id || ''
               })
            }
        }, [user])
    
        const handleChange = (e) => {
            setformData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    
        const handleSubmit =async (e) => {
            e.preventDefault();
            const updatedUser = {
                username: formData.username,
                profileImage: formData.profileImage,
                bio: formData.bio,
                profession: formData.profession,
                userId: formData.userId
            }
            try {
                const response = await editProfile(updatedUser).unwrap();
                logger.info(response)
                dispatch(setUser(response.user));
                localStorage.setItem('user', JSON.stringify(response.user))
                toast.success("Perfil Atualizado com sucesso!");
            } catch (error) {
                logger.error("Failed to update profile", error)
                toast.error("Falha ao atualizar o perfil. Por favor, tente novamente")
            }
    
            setIsModalOpen(false)
        }
  return (
      <div className="container mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="w-32 h-32 object-cover rounded-full">
                  <img src={formData?.profileImage || avatarImg} alt="imagem de perfil" />
              </div>
              <div className="ml-6">
                  <h3 className="text-2xl font-semibold mb-2">Nome: {user?.username || 'N/A'}</h3>
                  <p className="text-gray-600">Biografia: {formData?.bio || 'N/A'}</p>
                  <p className="text-gray-600">Profissão: {formData?.profession || 'N/A'}</p>
              </div>
              <button
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer ml-auto text-blue-500 hover:text-blue-700"><i className="ri-side-bar-line"></i></button>
          </div>
          {/* show modal */}
          {
              isModalOpen && (
                  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                      <div className='bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative'>
                          <button
                              onClick={() => setIsModalOpen(false)}
                              className='absolute top-2 right-2 text-white cursor-pointer mt-1'><i className="ri-close-line size-8 p-2 bg-blue-500 rounded-full hover:bg-blue-600"></i></button>
                          <h2 className='text-2xl font-bold mb-4'>Editar Perfil</h2>
                          <form onSubmit={handleSubmit}>
                              <div className='mb-4'>
                                  <label htmlFor="username" className='block text-sm font-medium text-gray-700 '>Nome</label>
                                  <input type="text" name='username' value={formData?.username}
                                      onChange={handleChange}
                                      placeholder='username'
                                      className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                      required
                                  />
                              </div>
                              <div className='mb-4'>
                                  <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700 '>Imagem de perfil Url</label>
                                  <input type="text" name='profileImage' value={formData?.profileImage}
                                      onChange={handleChange}
                                      placeholder='profileImage url'
                                      className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                      required
                                  />
                              </div>
                              <div className='mb-4'>
                                  <label htmlFor="bio" className='block text-sm font-medium text-gray-700 '>Escreva sua biografia</label>
                                  <textarea name="bio"
                                      row="3"
                                      className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                      value={formData?.bio}
                                      onChange={handleChange}
                                      placeholder='add your bio'
                                  ></textarea>
                              </div>
                              <div className='mb-4'>
                                  <label htmlFor="profession" className='block text-sm font-medium text-gray-700 '>Profissão</label>
                                  <input type="text" name='profession' value={formData?.profession}
                                      onChange={handleChange}
                                      placeholder='profession'
                                      className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                      required
                                  />
                              </div>
                              <button className={`cursor-pointer mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  type='submit'
                                  disabled={isLoading}
                              >{isLoading ? 'Saving...' : 'Save Changes'}</button>
                              {isError && <p className='mt-2 text-red-500'>Falha ao atualizar o perfil. Por favor, tente novamente</p>}
                              {isSuccess && <p className='mt-2 text-green-500'>Perfil Atualizado com sucesso!</p>}
                          </form>
                      </div>
                  </div>
              )
          }
      </div>
  )
}

export default UserProfile