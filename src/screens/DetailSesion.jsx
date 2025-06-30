import { Link } from "react-router-dom";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores"
import { sesion } from "../utils/exercise"
import { shortenString } from "../utils/shortenString";

export default function SesionDetalle() {
  const { DarkMode } = useUiStore();
  // Busca la sesión con id 1
  const sesion1 = sesion.find(s => s.id === 1);

  if (!sesion1) return <div>No se encontró la sesión.</div>;

  return (
    <div className={`min-h-screen flex flex-col items-center md:items-start md:flex-row ${DarkMode ? "bg-primary" : "bg-secondary"} md:px-6 py-24 w-full transition-bg gap-4`}>
      <div className={`max-w-md w-full ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center h-full`}>
        <Title>{sesion1.name_sesion}</Title>
        <p className="mb-1 text-primary"><span className="font-semibold">Tipo:</span> {sesion1?.type_exercise || 'No especificado'}</p>
        <p className="flex flex-row mb-1 text-primary gap-2">
          <span className="font-semibold">Activa:</span>
          <span className={`w-24 flex justify-center rounded-full ${sesion1.status ? "bg-green-600 " : "bg-yellow-600"}`}>
            {sesion1.status ? "Realizado" : "Por realizar"}
          </span>
        </p>
        <p className="flex flex-row mb-1 text-primary gap-2">
          <span className="font-semibold">Estado:</span>
          <span className={`w-24 flex justify-center rounded-full ${sesion1.active ? "bg-green-600 " : "bg-red-600"}`}>
            {sesion1.active ? "Activo" : "Desactivado"}
          </span>
        </p>
      </div>
      {/* Tabla solo visible en md o mayor */}
      <table className={`hidden md:table table-auto w-full mb-8 rounded-xl overflow-hidden ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg shadow-4xl`}>
        <thead>
          <tr className="border-b-2 !border-primary">
            <th className="text-primary">Tipo de ejercicio</th>
            <th className="text-primary text-center">Ejercicios</th>
          </tr>
        </thead>
        <tbody>
          {sesion1.exercises.map(exercise => (
            <tr key={exercise.id} className={`${DarkMode ? "hover:bg-tertiary" : "hover:bg-secondary"} border-b-2 !border-primary`}>
              <td className="text-primary align-top">{exercise.type_exercise}</td>
              <td className="text-primary p-0" colSpan={5}>
                <table className="w-full bg-transparent">
                  <thead>
                    <tr className="border-b-2 !border-primary">
                      <th className="font-bold text-left text-primary">Nombre</th>
                      <th className="font-bold text-left text-primary">Series</th>
                      <th className="font-bold text-left text-primary">Rep.</th>
                      <th className="font-bold text-left text-primary">Imagen</th>
                      <th className="font-bold text-left text-primary">Video</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercise?.items_exercise?.map(item => (
                      <tr key={item.id} className="text-primary text-[0.65rem] !border-b-0">
                        <td className="text-left">{shortenString(item.name_exercise, 9)}</td>
                        <td className="text-left">{item.series}</td>
                        <td className="text-left">{item.repetitions}</td>
                        <td className="text-left">{!item.img_exercise ? <Link className="p-1 bg-blue-500 rounded-full">ver img</Link> : "No img"}</td>
                        <td className="text-left">{!item.video_exercise ? <Link className="p-1 bg-blue-500 rounded-full">ver video</Link> : "No img"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista móvil */}
      <div className="block md:hidden w-full px-8">
        <h3 className="text-lg font-semibold text-primary mb-2">Ejercicios</h3>
        <ul>
          {sesion1.exercises.map(items => (
            <li key={items.id} className="mb-4 p-3 rounded-lg shadow bg-white/10">
              <p className="text-primary font-bold">{items.name}</p>
              <p className="text-primary">Repeticiones: {items.repetitions}</p>
              <p className="text-primary">Series: {items.series}</p>
              <p className="text-primary">Imagen: {items.img_exercise || "-"}</p>
              <p className="text-primary">Video: {items.video_exercise || "-"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}