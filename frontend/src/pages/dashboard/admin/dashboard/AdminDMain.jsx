import { useSelector } from 'react-redux'
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi'
import AdminStats from './AdminStats'
import AdminStatsChart from './AdminStatsChart'
const AdminDMain = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, error, isLoading } = useGetAdminStatsQuery()
    if (isLoading) return <div className='text-center text-gray-500'>Loading...</div>
    if(!stats) return <div className='text-center text-gray-500'>No stats avaliable.</div>
    if(error) return <div className='text-center text-gray-500'>Failed to load stats!</div>
  return (
      <div className="p-1">
          <div>
              <h1 className="text-2xl font-semibold mb-4">Painel</h1>
              <p className='text-gray-500'>Olá, {user?.username}! Bem - vindo ao seu painel de Administrador.</p>
              <AdminStats stats={stats} />
              <AdminStatsChart stats={stats} />
          </div>
    </div>
  )
}

export default AdminDMain