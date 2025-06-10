import { useState } from 'react';

export default function Users() {
  // Ejemplo de usuarios, reemplaza por tu fetch real
  const [users, setUsers] = useState([
    {
      id: 1,
      avatar: '',
      name: 'John Doe',
      email: 'martin@gmail.com',
      phone: '123456789',
      address: 'Calle Falsa 123',
      active: true
    },
    {
      id: 2,
      avatar: '',
      name: 'Jane Smith',
      email: 'jane@gmail.com',
      phone: '987654321',
      address: 'Avenida Siempre Viva 742',
      active: false
    }
  ]);

  // Handlers de ejemplo
  const handleEdit = (id) => alert(`Editar usuario ${id}`);
  const handleActivate = (id) => setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div className="flex flex-col items-center p-4 min-h-screen max-w-7xl mx-auto bg-base-100">
      <h1 className="text-3xl font-bold mb-6 w-full">Usuarios</h1>
      <div className="w-full flex flex-col items-center bg-secondary rounded-2xl shadow-lg p-6">
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
            {users?.map(() => {
              return (
                <>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                    </td>
                    <td>Purple</td>
                    <th className=''>
                      <button className="btn btn-ghost btn-xs">Activar</button>
                      <button className="btn btn-ghost btn-xs">Editar</button>
                      <button className="btn btn-ghost btn-xs">Eliminar</button>
                    </th>
                  </tr>
                </>
              )
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div >
    </div >
  );
}
