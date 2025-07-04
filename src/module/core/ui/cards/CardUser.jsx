/* eslint-disable react/prop-types */
import { useUiStore } from '../../../../stores';
import { FaEdit } from "react-icons/fa";

export const CardUser = ({ user, edit }) => {
  const { DarkMode } = useUiStore();
  return (
    <section className={`${DarkMode ? "bg-secondary/40" : "bg-tertiary/20"} w-full rounded-xl shadow-lg p-8 flex flex-col items-center bg-red-600 `}>
      {edit && <div className='w-full flex justify-end cursor-pointer hover:text-secondary transition-colors'>
        <FaEdit color="white" size="1.5rem" className='hover:shadow-4xl' />
      </div>}
      <img
        src={user?.avatar || "/src/assets/svg/userCircle.svg"}
        alt="Avatar del usuario"
        className={`w-24 h-24 rounded-full mb-4 border-4 ${DarkMode ? "border-primary" : "border-secondary"} object-cover`}
      />
      <hr className={`my-4 w-full ${DarkMode ? "bg-secondary/40" : "border-white"}`} />
      <h2 className="text-2xl text-white font-bold mb-2">{user?.name || 'Nombre de usuario'}</h2>
      <p className="text-stone-300 mb-1"><span className="font-semibold">Email:</span> {user?.email || 'No especificado'}</p>
      <p className="text-stone-300 mb-1"><span className="font-semibold">Teléfono:</span> {user?.phone || 'No especificado'}</p>
      <p className="text-stone-300 mb-1"><span className="font-semibold">Dirección:</span> {user?.address || 'No especificada'}</p>
    </section>
  )
}
