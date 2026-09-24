import { useNavigate } from 'react-router-dom';
import { useUiStore } from '../stores';
import { Acordion } from '../module/core/ui/Acordion';
import { Link } from 'react-router-dom';
import { Title } from '../module/core/ui/title/Title';
import { useEffect, useState, useCallback } from 'react';
import { scrollToTop } from '../utils/scrollToTop';
import { SubTitle } from '../module/core/ui/title/SubTitle';
import { userService } from '../services';
import { ModalUsers } from '../module/core/ui/modal/ModalUsers';
import toast, { Toaster } from 'react-hot-toast';

export default function Users() {
  const navigate = useNavigate();
  const { DarkMode, MenuOptionUsers, setMenuOptionUser } = useUiStore();
  const [filterName, setFilterName] = useState("");
  const [filterDocumento, setFilterDocumento] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterRole, setFilterRole] = useState("todos");
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, teachersRes] = await Promise.all([
        userService.list(),
        userService.list({ role: 'teacher' }),
      ]);
      setUsers(usersRes.data?.data || []);
      setTeachers(teachersRes.data?.data || []);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  const filteredUsers = users?.filter((u) =>
    u.name.toLowerCase().includes(filterName.toLowerCase()) &&
    String(u.documento).includes(filterDocumento) &&
    (filterStatus === "todos" || u.status === (filterStatus === "activo")) &&
    (filterRole === "todos" || u.role === filterRole)
  );

  const handleActivate = async (id, currentStatus) => {
    try {
      await userService.update(id, { status: !currentStatus });
      toast.success('Estado actualizado');
      fetchUsers();
    } catch (err) {
      toast.error('Error al actualizar estado');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await userService.delete(id);
      toast.success('Usuario eliminado');
      fetchUsers();
    } catch (err) {
      toast.error('Error al eliminar usuario');
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (selectedUser) {
      await userService.update(selectedUser.id, values);
    } else {
      await userService.create(values);
    }
    fetchUsers();
  };

  const handleMenuOption = (option) => {
    setMenuOptionUser(option);
    if (option === 'add') {
      handleCreate();
    }
  };

  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} min-h-screen transition-bg pt-16`}>
      <Toaster position="top-center" />
      <div className={`flex items-start mx-4 pt-8 transition-bg`}>
        <div className={`hidden max-w-md w-full md:flex flex-col items-center h-auto transition-bg rounded-xl shadow-[0_2px_15px_0_#53a8b6]`}>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-3" defaultChecked />
            <SubTitle>Usuarios</SubTitle>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className={`${MenuOptionUsers === "todos" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => handleMenuOption("todos")}>Todos</Link>
              <Link className={`${MenuOptionUsers === "add" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => handleMenuOption("add")}>Agregar</Link>
            </div>
          </Acordion>
        </div >
        <div className='flex flex-col max-w-7xl w-full px-4 items-center'>
          <div className='w-full flex'>
            <Title className={true}>Usuarios</Title>
          </div>
          <div className={`w-full flex flex-wrap gap-2 mb-4 p-6 rounded-xl  shadow-[0_2px_15px_0_#53a8b6]`}>
            <input
              type="text"
              placeholder="Filtrar por nombre"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className={`input input-sm input-bordered w-full sm:w-44 border-letterPrimary ${DarkMode ? "text-black" : "text-white"} bg-transparent duration-500`}
            />
            <input
              type="text"
              placeholder="Filtrar por documento"
              value={filterDocumento}
              onChange={(e) => setFilterDocumento(e.target.value)}
              className={`input input-sm input-bordered w-full sm:w-44 border-letterPrimary ${DarkMode ? "text-black" : "text-white"} bg-transparent duration-500`}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select select-sm select-bordered w-full sm:w-40 border-letterPrimary text-letterPrimary bg-transparent"
            >
              <option value="todos">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="select select-sm select-bordered w-full sm:w-40 border-letterPrimary text-letterPrimary bg-transparent"
            >
              <option value="todos">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="teacher">Profesor</option>
              <option value="trainer">Entrenador</option>
            </select>
          </div>
          <div className={`w-full flex flex-col items-center rounded-2xl px-6 overflow-x-auto duration-500 shadow-[0_2px_15px_0_#53a8b6]`}>
            {loading ? (
              <div className="flex justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-letterPrimary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : (
              <table className="table">
                <thead>
                  <tr className='border-b border-letterPrimary text-letterPrimary'>
                    <th></th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Documento</th>
                    <th className='hidden sm:table-cell'>Profesor asignado</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user) => {
                    const assignedTeacher = teachers.find(t => t.id === user.assignedTeacherId);
                    return (
                      <tr className={`${DarkMode ? "hover:bg-gray-500/35 text-secondary" : "hover:bg-secondary text-slate-900"} border-white border-b-0 px-8`} key={user.id}>
                        <td>
                          <label>
                            <input type="checkbox" className="checkbox size-4 border-2 border-letterPrimary" />
                          </label>
                        </td>
                        <td className='cursor-pointer' onClick={() => navigate(`/admin/profile/${user.id}`)}>
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={user.avatar || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                  alt={`Avatar de ${user.name}`}
                                  loading="lazy"
                                  width={48}
                                  height={48}
                                  decoding="async"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="text-letterPrimary text-xs sm:text-sm font-bold">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-letterPrimary text-sm">{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'badge-error' : user.role === 'teacher' ? 'badge-primary' : 'badge-info'}`}>
                            {user.role === 'admin' ? 'Admin' : user.role === 'teacher' ? 'Profesor' : 'Entrenador'}
                          </span>
                        </td>
                        <td className="text-letterPrimary text-sm">{user.documento}</td>
                        <td className="hidden sm:table-cell text-letterPrimary text-sm">
                          {assignedTeacher ? assignedTeacher.name : user.role === 'trainer' ? 'Sin asignar' : '—'}
                        </td>
                        <td>
                          <p className={`text-white text-center rounded-full ${user?.status ? "bg-green-600" : "bg-red-600"} px-3 py-1`}>
                            {user?.status ? "Activo" : "Inactivo"}
                          </p>
                        </td>
                        <td className='flex gap-1'>
                          <button
                            onClick={() => handleActivate(user.id, user.status)}
                            className="text-letterPrimary btn btn-ghost btn-xs"
                          >
                            {user?.status ? "Desactivar" : "Activar"}
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-letterPrimary btn btn-ghost btn-xs"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-error btn btn-ghost btn-xs"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div >
        </div>
        <ModalUsers
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          initialValues={selectedUser}
          onSubmit={handleSubmit}
          title={selectedUser ? 'Editar Usuario' : 'Crear Usuario'}
          teachers={teachers}
        />
      </div >
    </div>
  );
}