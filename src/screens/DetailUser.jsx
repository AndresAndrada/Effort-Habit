import { useState } from "react";
import { sesion } from "../utils/exercise";
import { useUiStore } from "../stores";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { user } from "../utils/users";
import { ModalEditSesion } from "../module/core/components/ModalEditSesion";

export default function DetailUser() {
  const { DarkMode } = useUiStore();
  const [modalEditSesión, setModalEditSesion] = useState(false)

  return (
    <div className={`flex items-start h-[80vh] px-6 pt-12 mt-12 w-full ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <div className="w-[30rem] flex flex-col items-center justify-center gap-4">
        {/* Contenido principal: datos del usuario */}
        <div className={`max-w-md w-full ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center`}>
          <img
            src={user?.avatar || "/src/assets/svg/userCircle.svg"}
            alt="Avatar del usuario"
            className="w-24 h-24 rounded-full mb-4 border-4 border-primary object-cover"
          />
          <h2 className="text-2xl font-bold mb-2 text-primary">{user?.name || 'Nombre de usuario'}</h2>
          <p className="text-base-content mb-1"><span className="font-semibold">Email:</span> {user?.email || 'No especificado'}</p>
          <p className="text-base-content mb-1"><span className="font-semibold">Teléfono:</span> {user?.phone || 'No especificado'}</p>
          <p className="text-base-content mb-1"><span className="font-semibold">Dirección:</span> {user?.address || 'No especificada'}</p>
        </div>
        <div className={`join join-vertical ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl w-full`}>
          <div className="collapse collapse-arrow join-item w-full">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold text-primary">Sesion</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className="hover:bg-secondary transition-colors w-full p-2" onClick={() => setModalEditSesion(true)}>Agregar sesión</Link>
              <Link className="hover:bg-secondary transition-colors w-full p-2">Modificar sesión</Link>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold text-primary">Estadisticas</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className="hover:bg-secondary transition-colors w-full p-2">Fuerza</Link>
              <Link className="hover:bg-secondary transition-colors w-full p-2">Flexibilidad</Link>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold text-primary">Configuraciones</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className="hover:bg-secondary transition-colors w-full p-2">Borrar sesión</Link>
              <Link className="hover:bg-secondary transition-colors w-full p-2">Editar</Link>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="flex justify-center gap-4 flex-wrap w-full h-full overflow-y-auto">
        {sesion?.map((s, index) => (
          <div key={s?.id ?? index} className={`max-w-md w-full min-h-64 bg-base-200 rounded-xl shadow-4xl p-8 mb-4 flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-colors ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg`}>
            <h2 className="text-xl font-bold mb-4 text-primary">{s?.name_sesion}</h2>
            <p className="text-base-content mb-2"><span className="font-semibold">Tipo de ejercicio:</span> {s?.type_exercise}</p>
            <ul className="list-disc list-inside mb-4">
              {s?.exercises?.map((exercise, index) => (
                <li key={exercise?.id ?? index} className="text-base-content">
                  {exercise?.name} - {exercise?.repetitions} repeticiones, {exercise?.series} series
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div onClick={() => setModalEditSesion(!modalEditSesión)} className="max-w-md w-full min-h-64 bg-gray-500/20 rounded-xl shadow-2xl p-8 mb-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-4xl transition-colors transition-bg">
          <ul className="list-disc list-inside mb-4">
            <FiPlusCircle size={40} />
          </ul>
        </div>
      </div>
      {
        modalEditSesión && (
          <ModalEditSesion setModalEditSesion={setModalEditSesion} />
        )
      }
    </div >
  )
}
