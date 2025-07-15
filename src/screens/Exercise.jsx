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

export default function Exercise() {
  const { DarkMode, MenuOptionExercise, setMenuOptionExercise } = useUiStore();
  const [search, setSearch] = useState("todos");
  // const [optionScreens, setOptionScreens] = useState("todos");

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  useEffect(() => {
    if (search !== "todos") {
      exercises.map(e => e.exercises.filter(e => search === e.name_exercise));
    }
  }, [search])

  return (
    <section className={`w-full min-h-screen flex flex-col md:flex-row items-start px-4 py-24  ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <MenuExerciseAcordion />
      <div className='flex flex-col w-full px-4 justify-center items-start gap-4'>
        <div className='max-w-full w-full flex items-center gap-2'>
          {/* <MenuExercise /> */}
          <MenuExercise
            options={menuOptions}
            onSelect={setMenuOptionExercise}
            darkMode={DarkMode}
          />
          <SearchBar setSearch={setSearch} placeholder={"Buscar ejercicio"} />
        </div>
        {MenuOptionExercise === "todos" && (
          <AllExercises />
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
