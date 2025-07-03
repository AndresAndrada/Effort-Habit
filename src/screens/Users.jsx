import { useNavigate } from 'react-router-dom';
import { ModalEdit } from '../module/core/ui/modal/ModalEdit';
import { useUiStore } from '../stores';
import { users } from '../utils/usersUtils.helpers';
import { Acordion } from '../module/core/ui/Acordion';
import { Link } from 'react-router-dom';
import { Title } from '../module/core/ui/title/Title';

export default function Users() {
  const navigate = useNavigate();
  const { DarkMode, setMenuOptionUser } = useUiStore();

  // Handlers de ejemplo
  // const handleEdit = (id) => alert(`Editar usuario ${id}`);
  // const handleActivate = (id) => setUsers(users.map(u => u.id === id ? { ...u, status: !u.status } : u));
  // const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} min-h-screen transition-bg pt-16`}>
      <div className={`flex items-start mx-4 pt-8 transition-bg`}>
        <div className={`hidden max-w-md w-full md:flex flex-col items-center shadow-4xl ${DarkMode ? "bg-secondary/40" : "bg-tertiary/20"} h-auto transition-bg rounded-xl`}>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold text-primary">Ejercicio</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className={`${DarkMode ? "text-primary hover:bg-gray-500" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("todos")}>Todos</Link>
              <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("add")}>Agregar</Link>
              <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("upDate")}> Modificar</Link>
            </div>
          </Acordion>
          {/* </div> */}
          <Acordion darkMode={true}>
            {/* <div className="collapse collapse-arrow join-item"> */}
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold text-primary">Estadisticas</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("upDate")}>Fuerza</Link>
              <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("upDate")}>Flexibilidad</Link>
            </div>
          </Acordion>
          {/* </div> */}
          <Acordion darkMode={true}>
            {/* <div className="collapse collapse-arrow join-item"> */}
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold text-primary">Configuraciones</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("upDate")}>Borrar sesión</Link>
              <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionUser("upDate")}>Editar</Link>
            </div>
            {/* </div> */}
          </Acordion>
          {/* </div> */}
        </div >
        <div className='flex flex-col max-w-7xl w-full px-4 items-center'>
          <div className='w-full flex'>
            <Title className={true}>Usuarios</Title>
          </div>
          <div className={`w-full flex flex-col items-center ${DarkMode ? "bg-secondary/50" : "bg-tertiary"} rounded-2xl shadow-4xl px-6 overflow-x-auto bg-red-600`}>
            <table className="table">
              {/* head */}
              <thead>
                <tr className='border-b border-white text-primary'>
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
                      <td><p className={`text-primary text-center rounded-full ${user?.status ? "bg-green-600" : "bg-red-600"}`}>{user?.status ? "Activo" : "Inactivo"}</p></td>
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
        </div>
        <ModalEdit />
      </div >
    </div>
  );
}
