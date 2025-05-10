import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth)
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const renderDashboard = () => {
switch (user?.role) {
  case 'admin':
    return <AdminDashboard/>;
  case 'user':
    return <UserDashboard/>;
  default:
    return <Navigate to="/login" replace />;
}
  }


  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
      <header className='lg:w-1/6 sm:w-2/6 w-full border-1 border-gray-300'>{renderDashboard()}</header>
      <main className='p-8 bg-white w-full border-1 border-gray-300 mt-5 mb-5'>
          <Outlet />
      </main>
      </div>
  )
}

export default DashboardLayout