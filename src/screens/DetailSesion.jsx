import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores"
import { sesion } from "../utils/exercise"

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
          <tr className={`${DarkMode ? "bg-tertiary" : "bg-tertiary text-primary"}`}>
            {/* <th className=" text-primary">Ejercicio</th> */}
            <th className="text-primary">Repeticiones</th>
            <th className="text-primary">Series</th>
            <th className="text-primary">Imagen</th>
            <th className="text-primary">Video</th>
          </tr>
        </thead>
        <tbody>
          {sesion1.exercises.map(ej => (
            <tr key={ej.id} className={`${DarkMode ? "hover:bg-tertiary" : "hover:bg-secondary"}`}>
              <td className="text-primary">{ej.name}</td>
              <td className="text-primary">{ej.repetitions}</td>
              <td className="text-primary">{ej.series}</td>
              <td className="text-primary">{ej.img_exercise || "-"}</td>
              <td className="text-primary">{ej.video_exercise || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista móvil */}
      <div className="block md:hidden w-full px-8">
        <h3 className="text-lg font-semibold text-primary mb-2">Ejercicios</h3>
        <ul>
          {sesion1.exercises.map(ej => (
            <li key={ej.id} className="mb-4 p-3 rounded-lg shadow bg-white/10">
              <p className="text-primary font-bold">{ej.name}</p>
              <p className="text-primary">Repeticiones: {ej.repetitions}</p>
              <p className="text-primary">Series: {ej.series}</p>
              <p className="text-primary">Imagen: {ej.img_exercise || "-"}</p>
              <p className="text-primary">Video: {ej.video_exercise || "-"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}