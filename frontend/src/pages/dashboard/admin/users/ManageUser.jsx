import { toast } from "react-toastify";
import { useDeleteUserMutation, useGetUserQuery } from "../../../../redux/features/auth/authApi";
import UpdateUserModal from "./UpdateUserModal";
import { useState } from "react";
import logger from "../../../../../src/utils/logger";

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("Usuário deletado com sucesso!");
      refetch();
    } catch (error) {
      logger.log("Failed to delete user", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {isLoading && <div className='text-center text-gray-500'>Carregando...</div>}
      {error && <div className='text-center text-gray-500'>Falha ao carregar usuários!</div>}

      <section className="py-1 bg-blueGray-50 w-full">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Todos os Usuários</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 text-blueGray-500 align-middle border-1 border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 text-blueGray-500 align-middle border-1 border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      E-mail <i className="ri-mail-line"></i> {/* Corrigido class para className */}
                    </th>
                    <th className="px-6 text-blueGray-500 align-middle border-1 border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Acesso <i className="ri-pencil-ruler-2-line"></i>
                    </th>
                    <th className="px-6 text-blueGray-500 align-middle border-1 border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Editar <i className="ri-pencil-line"></i>
                    </th>
                    <th className="px-6 text-blueGray-500 align-middle border-1 border-gray-300 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Deletar <i className="ri-delete-bin-2-line"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users?.length > 0 && users.map((user, index) => (
                      <tr className="text-gray-700" key={user._id || index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {user?.email}
                        </td>
                        <td className="px-6 py-4 text-xs whitespace-nowrap align-middle">
                          <span
                            className={`inline-block px-3 py-1 rounded-full font-semibold capitalize
                              ${user?.role === 'admin'
                                ? 'bg-blue-700 text-white'
                                : 'bg-amber-400 text-white'}`}>
                            {user?.role || 'N/A'}
                          </span>
                        </td>

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => handleEditUser(user)} className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                            Editar <i className="ri-pencil-line"></i>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => handleDeleteUser(user?._id)} className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer'>
                            Excluir <i className="ri-delete-bin-2-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={handleModalClose}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
