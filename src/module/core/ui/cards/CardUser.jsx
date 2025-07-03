/* eslint-disable react/prop-types */
import { useUiStore } from '../../../../stores';

export const CardUser = ({ user }) => {
  const { DarkMode } = useUiStore();
  return (
    <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} w-full rounded-xl shadow-md p-8 flex flex-col items-center bg-red-600`}>
      <img
        src={user?.avatar || "/src/assets/svg/userCircle.svg"}
        alt="Avatar del usuario"
        className={`w-24 h-24 rounded-full mb-4 border-4 ${DarkMode ? "border-primary" : "border-secondary"} object-cover`}
      />
      <hr className="my-4 w-full border-gray-400/30" />
      <h2 className="text-2xl text-white font-bold mb-2">{user?.name || 'Nombre de usuario'}</h2>
      <p className="text-base-content mb-1"><span className="font-semibold">Email:</span> {user?.email || 'No especificado'}</p>
      <p className="text-base-content mb-1"><span className="font-semibold">Teléfono:</span> {user?.phone || 'No especificado'}</p>
      <p className="text-base-content mb-1"><span className="font-semibold">Dirección:</span> {user?.address || 'No especificada'}</p>
    </div>
  )
}
