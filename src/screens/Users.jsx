import { useNavigate } from 'react-router-dom';
import { ModalEdit } from '../module/core/ui/modal/ModalEdit';
import { useUiStore } from '../stores';
import { users } from '../utils/users';

export default function Users() {
  const navigate = useNavigate();
  const { DarkMode } = useUiStore();


  // Handlers de ejemplo
  // const handleEdit = (id) => alert(`Editar usuario ${id}`);
  // const handleActivate = (id) => setUsers(users.map(u => u.id === id ? { ...u, status: !u.status } : u));
  // const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} min-h-screen transition-bg pt-12`}>
      <div className={`flex flex-col items-center p-4 min-h-screen max-w-7xl mx-auto ${DarkMode ? "bg-primary" : "bg-secondary"} pt-8 transition-bg`}>
        <h1 className={`text-3xl font-bold mb-6 ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}>Usuarios</h1>
        <div className={`w-full flex flex-col items-center ${DarkMode ? "bg-secondary" : "bg-tertiary"} rounded-2xl shadow-4xl px-6 overflow-x-auto bg-red-600`}>
          <table className="table">
            {/* head */}
            <thead>
              <tr className='border-b border-white'>
                <th>
                  <label>
                    {/* <input type="checkbox" className="checkbox" /> */}
                  </label>
                </th>
                <th>Name</th>
                <th className='hidden sm:flex'>Detalles</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user) => {
                return (
                  <tr className={`${DarkMode ? "hover:bg-tertiary text-secondary" : "hover:bg-secondary text-slate-900"} border-white border-b-0 px-8`} key={user.id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox size-4 border-2 border-primary" />
                      </label>
                    </th>
                    <td className='cursor-pointer' onClick={() => navigate(`/detail-user/${user.id}`)}>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-primary text-xs sm:text-sm font-bold">Hart Hagerty</div>
                          <div className="text-primary text-xs sm:text-sm opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:flex flex-col text-primary">
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="text-primary badge badge-ghost badge-sm">Desktop Support Technician</span>
                    </td>
                    <td className="text-primary">{user?.status ? "Activo" : "Inactivo"}</td>
                    <th className=''>
                      <button className="text-primary btn btn-ghost btn-xs">{user?.status ? "Desactivar" : "Activar"}</button>
                      <button className="text-primary btn btn-ghost btn-xs"
                        onClick={() => document.getElementById('my_modal_1').showModal()}
                      >Editar</button>
                      <button className="text-primary btn btn-ghost btn-xs">Eliminar</button>
                    </th>
                  </tr>
                )
              })}
            </tbody>
            {/* foot */}
          </table>
        </div >
        <ModalEdit />
      </div >
    </div>
  );
}
