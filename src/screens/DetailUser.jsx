import { useState } from "react";
import { sesion } from "../utils/exercise";
import { useUiStore } from "../stores";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { user } from "../utils/usersUtils.helpers";
import { ModalEditSesion } from "../module/core/components/ModalEditSesion";
import { Acordion } from "../module/core/ui/Acordion";
import { useNavigate } from 'react-router-dom'
import { CardUser } from "../module/core/ui/cards/CardUser";
import { useEffect } from "react";
import { scrollToTop } from "../utils/scrollToTop";

export default function DetailUser() {
  const navigate = useNavigate();
  const { DarkMode } = useUiStore();
  const [modalEditSesión, setModalEditSesion] = useState(false);

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  return (
    <div className={`flex flex-col sm:flex-row items-start min-h-screen px-4 pt-24 w-full ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg gap-4`}>
      <div className="max-w-[25rem] w-full flex flex-col items-center justify-center gap-4">
        {/* Contenido principal: datos del usuario */}
        <CardUser user={user} />
        <div className={`join join-vertical ${DarkMode ? "bg-secondary/40" : "bg-tertiary/20"} transition-bg rounded-xl w-full shadow-4xl`}>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold text-primary">Sesion</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className="hover:bg-secondary transition-colors w-full p-2 text-primary" onClick={() => setModalEditSesion(true)}>Agregar sesión</Link>
              <Link className="hover:bg-secondary transition-colors w-full p-2 text-primary">Modificar sesión</Link>
            </div>
          </Acordion>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold text-primary">Estadisticas</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className="hover:bg-secondary transition-colors w-full p-2 text-primary">Fuerza</Link>
              <Link className="hover:bg-secondary transition-colors w-full p-2 text-primary">Flexibilidad</Link>
            </div>
          </Acordion>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold text-primary">Configuraciones</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className="hover:bg-secondary transition-colors w-full p-2 text-primary">Borrar sesión</Link>
              <Link className="hover:bg-secondary transition-colors w-full p-2 text-primary">Editar</Link>
            </div>
          </Acordion>
        </div>
      </div>
      <div className="flex justify-center flex-wrap w-full h-full overflow-y-auto md:gap-4">
        {sesion?.map((sesion, index) => (
          <div key={sesion?.id ?? index} onClick={() => navigate(`/detail-sesion/${sesion.id}`)} className={`max-w-md w-full min-h-64 bg-base-200 rounded-xl shadow-4xl p-8 mb-4 flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-colors ${DarkMode ? "bg-secondary/40" : "bg-tertiary"} transition-bg`}>
            <h2 className="text-xl font-bold mb-4 text-primary">{sesion?.name_sesion}</h2>
            <p className="text-base-content mb-2"><span className="font-semibold">Tipo de ejercicio:</span> {sesion?.type_exercise}</p>
            <ul className="list-disc list-inside mb-4">
              {sesion?.exercises?.map((exercise, index) => (
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
