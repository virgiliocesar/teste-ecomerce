import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router'
import { toast } from 'react-toastify';


const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation();
    if (!user) {
        toast.error(' Vocé precisa fazer login primeiro')
         return <Navigate to="/entrar" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        toast.error(' Vocé precisa fazer login primeiro')
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children
}

export default PrivateRoute