import { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import logger from './../../../../../src/utils/logger';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [updateUserRole] = useUpdateUserRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap();
            toast.success('Acesso atualizado com sucesso!');
            onRoleUpdate();
            onClose();
        } catch (error) {
            logger.error("Falha ao atualizar o papel do usuário", error);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-6 text-center '>Editar Acesso </h2>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>E-mail</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className='mt-1 bg-gray-100 text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    />
                </div>

                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700'>Acesso</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='block w-full bg-gray-100 text-black shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    >
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div className='flex justify-end gap-3'>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
