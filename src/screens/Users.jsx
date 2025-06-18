import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalEdit } from '../module/core/ui/ModalEdit';
import { useUiStore } from '../stores';
import { users } from '../utils/users';

export default function Users() {
  const navigate = useNavigate();
  const { DarkMode } = useUiStore();


  // Handlers de ejemplo
  // const handleEdit = (id) => alert(`Editar usuario ${id}`);
  // const handleActivate = (id) => setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  // const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg mt-12`}>
      <div className={`flex flex-col items-center p-4 min-h-screen max-w-7xl mx-auto ${DarkMode ? "bg-primary" : "bg-secondary"} pt-8 transition-bg`}>
        <h1 className={`text-3xl font-bold mb-6 w-full ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}>Usuarios</h1>
        <div className={`w-full flex flex-col items-center ${DarkMode ? "bg-secondary" : "bg-tertiary"} rounded-2xl shadow-4xl p-6`}>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    {/* <input type="checkbox" className="checkbox" /> */}
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user) => {
                return (
                  <>
                    <tr className={`${DarkMode ? "hover:bg-tertiary text-secondary" : "hover:bg-secondary text-slate-900"}`} key={user.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox border-2 border-primary" />
                        </label>
                      </th>
                      <td className='cursor-pointer' onClick={() => navigate(`/detail-user/${user.id}`)}>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="text-primary font-bold">Hart Hagerty</div>
                            <div className="text-primary text-sm opacity-50">United States</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-primary">
                        Zemlak, Daniel and Leannon
                        <br />
                        <span className="text-primary badge badge-ghost badge-sm">Desktop Support Technician</span>
                      </td>
                      <td className="text-primary">Purple</td>
                      <th className=''>
                        <button className="text-primary btn btn-ghost btn-xs">Activar</button>
                        <button className="text-primary btn btn-ghost btn-xs"
                          onClick={() => document.getElementById('my_modal_1').showModal()}
                        >Editar</button>
                        <button className="text-primary btn btn-ghost btn-xs">Eliminar</button>
                      </th>
                    </tr>
                  </>
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
