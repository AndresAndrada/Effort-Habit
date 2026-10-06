import { useUiStore } from "../../../stores";

export const MenuExerciseAcordion = () => {
  const { DarkMode, setMenuOptionExercise, MenuOptionExercise } = useUiStore();

  const options = [
    { id: "todos", label: "Todos los ejercicios", icon: "M4 6h16M4 12h16M4 18h16" },
    { id: "add", label: "Agregar ejercicio", icon: "M12 4v16m8-8H4" },
    { id: "upDate", label: "Modificar ejercicio", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
    { id: "strong", label: "Estadísticas de fuerza", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" },
  ];

  return (
    <div className={`rounded-xl border overflow-hidden lg:hidden ${
      DarkMode ? "bg-base-100/60 border-base-300/40" : "bg-white border-base-200 shadow-card"
    }`}>
      <div className={`px-5 py-4 border-b ${DarkMode ? "border-base-300/40 bg-base-200/50" : "border-base-200 bg-base-100"}`}>
        <h2 className={`text-heading-sm font-semibold ${DarkMode ? "text-secondary" : "text-primary"}`}>
          Ejercicios
        </h2>
      </div>
      <nav className="p-2 space-y-1" aria-label="Filtrar ejercicios">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMenuOptionExercise(opt.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-body-sm font-medium transition-all duration-200 focus-ring ${
              MenuOptionExercise === opt.id
                ? "bg-effort-600 text-white shadow-sm"
                : DarkMode
                  ? "text-secondary/70 hover:bg-base-200/50 hover:text-secondary"
                  : "text-primary/70 hover:bg-base-100 hover:text-primary"
            }`}
            aria-current={MenuOptionExercise === opt.id ? "page" : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={opt.icon} />
            </svg>
            {opt.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
