/* eslint-disable react/prop-types */
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUiStore } from '../../../stores';
import { exercises } from "../../../utils/exercise";

export function AllExercises({ filteredExercises = exercises }) {
  const { DarkMode } = useUiStore();

  if (!filteredExercises.length) {
    return (
      <div className={`text-center py-16 px-8 rounded-xl border ${
        DarkMode ? "bg-base-100/60 border-base-300/40" : "bg-white border-base-200 shadow-card"
      }`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-effort-50 dark:bg-effort-950/40 flex items-center justify-center">
          <svg className="w-8 h-8 text-effort-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <h3 className={`text-heading-md font-semibold mb-2 ${DarkMode ? "text-secondary" : "text-primary"}`}>
          Sin resultados
        </h3>
        <p className={`text-body-sm ${DarkMode ? "text-secondary/60" : "text-primary/60"}`}>
          No se encontraron ejercicios que coincidan con tu búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredExercises.map((category) => (
        <section
          key={category.id}
          className={`rounded-xl border overflow-hidden ${
            DarkMode ? "bg-base-100/60 border-base-300/40" : "bg-white border-base-200 shadow-card"
          }`}
          aria-label={`Ejercicios de ${category.type_exercise}`}
        >
          <header className={`flex items-center justify-between px-6 py-4 border-b ${
            DarkMode ? "bg-base-200/50 border-base-300/40" : "bg-base-100 border-base-200"
          }`}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-effort-500" aria-hidden="true" />
              <h3 className={`text-heading-md font-semibold ${DarkMode ? "text-secondary" : "text-primary"}`}>
                {category.type_exercise}
              </h3>
            </div>
            <span className={`badge badge-sm rounded-full ${
              DarkMode ? "bg-base-300/50 text-secondary/70" : "bg-base-200 text-primary/70"
            }`}>
              {category.exercises.length} ejercicios
            </span>
          </header>

          <div className="overflow-x-auto scrollbar-hide">
            <table className="table w-full">
              <thead>
                <tr className={`border-b ${DarkMode ? "border-base-300/40" : "border-base-200"}`}>
                  <th className={`text-caption uppercase tracking-wider font-semibold ${DarkMode ? "text-secondary/50" : "text-primary/50"} px-6`}>
                    Nombre
                  </th>
                  <th className={`text-caption uppercase tracking-wider font-semibold ${DarkMode ? "text-secondary/50" : "text-primary/50"} px-6`}>
                    Descripción
                  </th>
                  <th className={`text-caption uppercase tracking-wider font-semibold ${DarkMode ? "text-secondary/50" : "text-primary/50"} px-6 text-center`}>
                    Variante
                  </th>
                  <th className={`text-caption uppercase tracking-wider font-semibold ${DarkMode ? "text-secondary/50" : "text-primary/50"} px-6 text-right`}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.exercises.map((exercise) => (
                  <tr
                    key={exercise.id}
                    className={`border-b transition-colors ${
                      DarkMode
                        ? "border-base-300/20 hover:bg-base-200/30"
                        : "border-base-100 hover:bg-base-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`font-medium text-body-sm ${DarkMode ? "text-secondary" : "text-primary"}`}>
                        {exercise.name_exercise}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-body-sm ${DarkMode ? "text-secondary/60" : "text-primary/60"}`}>
                      {exercise.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {exercise.variante && (
                        <span className="badge badge-sm rounded-full bg-track-50 text-track-700 dark:bg-track-950/40 dark:text-track-400">
                          {exercise.variante}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn btn-sm btn-ghost rounded-lg text-effort-500 hover:bg-effort-50 dark:hover:bg-effort-950/30"
                          aria-label={`Editar ${exercise.name_exercise}`}
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                          aria-label={`Eliminar ${exercise.name_exercise}`}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
