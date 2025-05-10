import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { logout } from '../../redux/features/auth/authSlice'
import { Link, NavLink } from 'react-router'
import logger from '../../../src/utils/logger'

const navItems = [
    {
        path: "/painel/admin",
        label: "Painel"
    }, {
        path: "adicionar-produto",
        label: "Add Produto"
    }, {
        path: "gerenciar-produtos",
        label: "Produtos"
    }, {
        path: "usuarios",
        label: "Usuários"
    }, {
        path: "gerenciar-pedidos",
        label: "Pedidos"
    },
]


const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handledLogout = async () => {
        try {
          await logoutUser().unwrap();
          dispatch(logout());
          navigate("/");
        } catch (error) {
          logger.error("Failed to logout",error);
        }
      }
  return (
      <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
          <div>
              <div className='nav__logo'>
                  <Link>Fashion <span>.</span></Link>
                  <p className='text-xs italic'>Painel de Usuário</p>
              </div>
              <hr className='mt-5' />
              <ul className='space-y-5 pt-5'>
                  {
                      navItems.map((item, index) => (
                          <li key={index}>
                              <NavLink
                                  className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}
                                  end
                                  to={item.path}>
                                  {item.label}
                              </NavLink>
                          </li>
                      ))
                  }
              </ul>
          </div>

          <div className='mb-3 space-y-3'>
              <hr className='mb-3' />
              <button
                  onClick={handledLogout}
                  className='cursor-pointer text-white bg-red-500 hover:bg-red-600 transition-colors font-medium px-5 py-2 rounded-md w-full flex items-center justify-center gap-2'>
                  <i className="ri-logout-box-r-line text-lg"></i>
                  <span>Sair</span>
              </button>
              <button
                  onClick={() => navigate("/loja")}
                  className='cursor-pointer flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 transition-colors font-medium px-5 py-2 rounded-md w-full justify-center'>
                  <i className="ri-store-line text-lg"></i>
                  <span>Loja</span>
              </button>
          </div>
      </div>
  )
}

export default AdminDashboard