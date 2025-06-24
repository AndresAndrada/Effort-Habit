import { useUiStore } from "../stores";

export default function DetailUserAdmin() {
  const { DarkMode } = useUiStore();
  const user = {
    avatar: "",
    name: "John Doe",
    email: "martin@gmail.com"
  }
  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} flex items-start justify-center transition-bg mt-16 pt-8 w-full h-screen`}>
      <div className="flex flex-col w-[90%] sm:w-full items-center justify-center">
        {/* Contenido principal: datos del usuario */}
        <div className="max-w-md w-full bg-base-200 rounded-xl shadow-md p-8 flex flex-col items-center">
          <img
            src={user?.avatar || "/src/assets/svg/userCircle.svg"}
            alt="Avatar del usuario"
            className="w-24 h-24 rounded-full mb-4 border-4 border-primary object-cover"
          />
          <h2 className="text-2xl font-bold mb-2 text-primary-content">{user?.name || 'Nombre de usuario'}</h2>
          <p className="text-base-content mb-1"><span className="font-semibold">Email:</span> {user?.email || 'No especificado'}</p>
          <p className="text-base-content mb-1"><span className="font-semibold">Teléfono:</span> {user?.phone || 'No especificado'}</p>
          <p className="text-base-content mb-1"><span className="font-semibold">Dirección:</span> {user?.address || 'No especificada'}</p>
        </div>
      </div>
    </div>
  );
}
