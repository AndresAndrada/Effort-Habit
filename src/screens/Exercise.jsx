import { exercises } from '../utils/exercise'
import { useUiStore } from '../stores'
import { useState, useMemo, useEffect } from 'react'
import { ModeEditionExercise } from '../module/exercise/components/ModeEditionExercise'
import SearchBar from '../module/core/components/SearchBar'
import { scrollToTop } from '../utils/scrollToTop'
import { MenuExerciseAcordion } from '../module/exercise/components/MenuExerciseAcordion'
import { AllExercises } from '../module/exercise/components/AllExercises'
import { Title } from '../module/core/ui/title/Title'

const Exercise = () => {
  const { DarkMode, MenuOptionExercise, setMenuOptionExercise } = useUiStore();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("todos");

  const typesExercise = useMemo(() =>
    [...new Set(exercises.map((e) => e.type_exercise))],
    []
  );

  const filteredExercises = useMemo(() =>
    exercises
      .filter((e) => filterType === "todos" || e.type_exercise === filterType)
      .map((e) => ({
        ...e,
        exercises: e.exercises.filter((ex) =>
          ex.name_exercise.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((e) => e.exercises.length > 0),
    [search, filterType]
  );

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  const menuOptions = [
    { id: "todos", label: "Todos", icon: "M4 6h16M4 12h16M4 18h16" },
    { id: "add", label: "Agregar", icon: "M12 4v16m8-8H4" },
    { id: "upDate", label: "Modificar", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  ];

  return (
    <section className={`w-full min-h-screen ${DarkMode ? "bg-primary" : "bg-secondary"} transition-colors duration-300`}>
      <div className="section-container pt-24 pb-16">
        <header className="max-w-2xl mb-8">
          <span className="inline-block text-caption font-semibold uppercase tracking-wider text-effort-500 dark:text-effort-400 mb-3">
            Catálogo
          </span>
          <Title size="display-sm" weight="bold" align="left" as="h1" className="mb-3">
            Ejercicios
          </Title>
          <p className={`text-body-lg ${DarkMode ? "text-secondary/60" : "text-primary/60"}`}>
            Explora y gestiona el catálogo completo de ejercicios organizados por tipo.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar menu */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 rounded-xl border overflow-hidden ${
              DarkMode ? "bg-base-100/60 border-base-300/40" : "bg-white border-base-200 shadow-card"
            }`}>
              <div className="p-4 border-b border-base-200 dark:border-base-700">
                <h2 className={`text-heading-sm font-semibold ${DarkMode ? "text-secondary" : "text-primary"}`}>
                  Navegación
                </h2>
              </div>
              <nav className="p-2" aria-label="Filtrar ejercicios">
                {menuOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMenuOptionExercise(opt.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-sm font-medium transition-all duration-200 focus-ring ${
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

              <div className="p-4 border-t border-base-200 dark:border-base-700">
                <h3 className={`text-caption font-semibold uppercase tracking-wider mb-3 ${DarkMode ? "text-secondary/50" : "text-primary/50"}`}>
                  Estadísticas
                </h3>
                <div className="space-y-2">
                  <div className={`flex justify-between text-body-sm ${DarkMode ? "text-secondary/70" : "text-primary/70"}`}>
                    <span>Tipos</span>
                    <span className="text-data-sm text-effort-500">{typesExercise.length}</span>
                  </div>
                  <div className={`flex justify-between text-body-sm ${DarkMode ? "text-secondary/70" : "text-primary/70"}`}>
                    <span>Resultados</span>
                    <span className="text-data-sm text-track-500">{filteredExercises.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Filters bar */}
            <div className={`flex flex-wrap gap-3 mb-6 p-4 rounded-xl border ${
              DarkMode ? "bg-base-100/60 border-base-300/40" : "bg-white border-base-200 shadow-card"
            }`}>
              <SearchBar setSearch={setSearch} placeholder={"Buscar ejercicio..."} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`select select-sm rounded-lg border-base-300 dark:border-base-600 min-w-48 ${
                  DarkMode ? "bg-base-200 text-secondary" : "bg-base-100 text-primary"
                }`}
                aria-label="Filtrar por tipo"
              >
                <option value="todos">Todos los tipos</option>
                {typesExercise.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="btn btn-sm btn-ghost rounded-lg text-effort-500 hover:bg-effort-50 dark:hover:bg-effort-950/30"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Mobile menu */}
            <div className="lg:hidden mb-6">
              <MenuExerciseAcordion />
            </div>

            {/* Content */}
            <div className="animate-fade-in">
              {MenuOptionExercise === "todos" && (
                <AllExercises filteredExercises={filteredExercises} />
              )}
              {MenuOptionExercise === "add" && (
                <ModeEditionExercise />
              )}
              {MenuOptionExercise === "upDate" && (
                <ModeEditionExercise />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Exercise;
