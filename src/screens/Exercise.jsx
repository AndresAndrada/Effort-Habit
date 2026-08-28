import { exercises, menuOptions } from '../utils/exercise'
import { useUiStore } from '../stores'
import { useState } from 'react'
import { ModeEditionExercise } from '../module/exercise/components/ModeEditionExercise'
import SearchBar from '../module/core/components/SearchBar'
import { useEffect } from 'react'
import { MenuExercise } from '../module/core/components/MenuExercise'
import { scrollToTop } from '../utils/scrollToTop'
import { MenuExerciseAcordion } from '../module/exercise/components/MenuExerciseAcordion'
import { AllExercises } from '../module/exercise/components/AllExercises'

const Exercise = () => {
  const { DarkMode, MenuOptionExercise, setMenuOptionExercise } = useUiStore();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("todos");
  // const [optionScreens, setOptionScreens] = useState("todos");

  const typesExercise = [...new Set(exercises.map((e) => e.type_exercise))];

  const filteredExercises = exercises
    .filter((e) => filterType === "todos" || e.type_exercise === filterType)
    .map((e) => ({
      ...e,
      exercises: e.exercises.filter((ex) =>
        ex.name_exercise.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((e) => e.exercises.length > 0);

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  return (
    <section className={`w-full min-h-screen flex flex-col md:flex-row items-start px-4 py-24  ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <MenuExerciseAcordion />
      <div className='flex flex-col w-full px-4 justify-center items-start gap-4'>
           <div className={`w-full flex flex-wrap gap-2 mb-4 p-6 rounded-xl  shadow-[0_2px_15px_0_#53a8b6]`}>
          {/* <MenuExercise /> */}
          {/* <MenuExercise
            options={menuOptions}
            onSelect={setMenuOptionExercise}
            darkMode={DarkMode}
          /> */}
          <SearchBar setSearch={setSearch} placeholder={"Buscar ejercicio"} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="select select-sm select-bordered w-full sm:w-40 border-letterPrimary text-letterPrimary bg-transparent self-center"
          >
            <option value="todos">Todos los tipos</option>
            {typesExercise.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
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
    </section >
  )
}

export default Exercise;
