import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { sesion } from "../utils/exercise";
import { useUiStore } from "../stores";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { ModalCreateSession } from "../module/core/components/ModalCreateSession";
import { Acordion } from "../module/core/ui/Acordion";
import { CardUser } from "../module/core/ui/cards/CardUser";
import { scrollToTop } from "../utils/scrollToTop";
import { userService } from "../services";
import { Loader } from "../module/core/Loader";

export default function DetailUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: authUser, isTrainer } = useAuth();
  const { DarkMode, setMenuOptionUserPerfil, MenuOptionUserPerfil } = useUiStore();
  const [modalCreateSession, setModalCreateSession] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateSession = async (sessionData) => {
    console.log('Crear sesión:', sessionData);
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const targetId = id || (isTrainer ? authUser?.id : null);
      console.log("🚀 ~ fetchUser ~ targetId:", targetId)
      // if (!targetId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await userService.get(targetId);
        setUser(response.data);
      } catch (err) {
        setError('Usuario no encontrado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, authUser, isTrainer]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-letterPrimary">{error || 'Usuario no encontrado'}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row items-start min-h-screen px-4 pt-24 w-full ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg gap-4`}>
      <div className="max-w-[25rem] w-full flex flex-col items-center justify-center gap-4">
        {/* Contenido principal: datos del usuario */}
        <CardUser user={user} />
        <div className={`join join-vertical ${DarkMode ? "  " : "bg-tertiary/20"} transition-bg rounded-xl w-full`}>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold text-letterPrimary">Sesion</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
              <Link className={`${MenuOptionUserPerfil === "AddSession" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionUserPerfil("addSession")}>Agregar sesión</Link>
               <Link className={`${MenuOptionUserPerfil === "upDAta" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionUserPerfil("upDAta")}>Modificar sesión</Link>
            </div>
          </Acordion>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold text-letterPrimary">Estadisticas</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
               <Link className={`${MenuOptionUserPerfil === "strong" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionUserPerfil("strong")}>Fuerza</Link>
               <Link className={`${MenuOptionUserPerfil === "flexibility" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionUserPerfil("flexibility")}>Flexibilidad</Link>
            </div>
          </Acordion>
          <Acordion darkMode={true}>
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold text-letterPrimary">Configuraciones</div>
            <div className="collapse-content text-sm flex flex-col gap-2">
               <Link className={`${MenuOptionUserPerfil === "deleteSesion" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionUserPerfil("deleteSesion")}>Borrar sesión</Link>
               <Link className={`${MenuOptionUserPerfil === "edit" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionUserPerfil("edit")}>Editar</Link>
            </div>
          </Acordion>
        </div>
      </div>
      <div className="flex justify-center flex-wrap w-full h-full overflow-y-auto md:gap-4">
        {sesion?.map((sesion, index) => (
          <div key={sesion?.id ?? index} onClick={() => navigate(`/detail-sesion/${sesion.id}`)} className={`max-w-md w-full min-h-64 rounded-xl shadow-xl p-8 mb-4 flex flex-col items-center cursor-pointer hover:shadow-4xl transition-colors ${DarkMode ? "" : "bg-tertiary/20"} transition-bg`}>
            <h2 className="text-xl font-bold mb-4 text-letterPrimary">{sesion?.name_sesion}</h2>
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
        <button onClick={() => setModalCreateSession(true)} className={`max-w-md w-full min-h-64 rounded-xl shadow-2xl p-8 mb-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-4xl transition-colors transition-bg ${!DarkMode && "bg-tertiary/20"}`}>
          <FiPlusCircle size={40} className="text-letterPrimary" />
          <span className="mt-2 text-letterPrimary font-medium">Crear sesión</span>
        </button>
      </div>
      {modalCreateSession && <ModalCreateSession setModalCreateSession={setModalCreateSession} onSubmit={handleCreateSession} />}
    </div >
  )
}