import { exercises, menuOptions } from '../utils/exercise'
import { useUiStore } from '../stores'
import { useState } from 'react'
import { ModeEditionExercise } from '../module/exercise/components/ModeEditionExercise'
import SearchBar from '../module/core/components/SearchBar'
import { useEffect } from 'react'
import { MenuExercise } from '../module/core/components/MenuExercise'

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
        {MenuOptionExercise === "todos" && <div className="flex -z-0 justify-center gap-4 flex-col w-full h-full">
          {exercises.map((s) => (
            <Acordion key={s.id}>
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold text-primary">{s.type_exercise}</div>
              <div className="collapse-content text-sm flex w-full flex-col gap-2 overflow-x-scroll">
                <p className="text-base-content mb-2"><span className="font-semibold">Tipo de ejercicio:</span> {s.type_exercise}</p>
                <table className='table w-full'>
                  <thead>
                    <tr className={`${DarkMode ? "bg-primary text-secondary" : "bg-secondary text-primary"} transition-bg`}>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Variante</th>
                      <th>Imagen</th>
                      <th>Video</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.exercises.map((exercise) => (
                      <tr key={exercise.id} className={`${DarkMode ? "hover:bg-tertiary" : "hover:bg-secondary"} text-stone-300 cursor-pointer`}>
                        <th>
                          {exercise.name_exercise}
                        </th>
                        <th>
                          {exercise.description}
                        </th>
                        <th>
                          {exercise.variante}
                        </th>
                        <th>
                          {exercise.image}
                        </th>
                        <th>
                          {exercise.video}
                        </th>
                        <th className='flex gap-2'>
                          <button className={`btn ${DarkMode ? "bg-primary hover:bg-gray-300" : "bg-secondary hover:bg-gray-300"} transition-bg`}><FaRegEdit color={`${DarkMode ? "#142d4c" : "#ececec"}`} /></button>
                          <button className={`btn ${DarkMode ? "bg-primary hover:bg-gray-300" : "bg-secondary hover:bg-gray-300"} transition-bg`}><MdDelete color={`${DarkMode ? "#142d4c" : "#ececec"}`} /></button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Acordion >
          ))}
        </div>}
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
