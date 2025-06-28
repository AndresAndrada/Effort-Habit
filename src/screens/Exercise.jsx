import { exercises } from '../utils/exercise'
import { Link } from 'react-router-dom'
import { useUiStore } from '../stores'
import { useState } from 'react'
import { Acordion } from '../module/core/ui/Acordion'
import { ModeEditionExercise } from '../module/exercise/component/ModeEditionExercise'
import SearchBar from '../module/core/components/SearchBar'
import { useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Exercise() {
  const { DarkMode } = useUiStore();
  const [search, setSearch] = useState("todos");
  const [optionScreens, setOptionScreens] = useState("todos");

  useEffect(() => {
    if (search !== "todos") {
      exercises.map(e => e.exercises.filter(e => search === e.name_exercise));
    }
  }, [search])

  return (
    <div className={`flex flex-col md:flex-row min-h-screen items-start md:px-6 py-12 mt-12 w-full ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <div className={`hidden max-w-md w-full md:flex flex-col items-center justify-center ${DarkMode ? "bg-secondary shadow-xl" : "bg-tertiary"} transition-bg rounded-xl`}>
        <Acordion>
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold text-primary">Ejercicio</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("todos")}>Todos</Link>
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("add")}>Agregar</Link>
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("upDate")}> Modificar</Link>
          </div>
        </Acordion>
        {/* </div> */}
        <Acordion>
          {/* <div className="collapse collapse-arrow join-item"> */}
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold text-primary">Estadisticas</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("upDate")}>Fuerza</Link>
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("upDate")}>Flexibilidad</Link>
          </div>
        </Acordion>
        {/* </div> */}
        <Acordion>
          {/* <div className="collapse collapse-arrow join-item"> */}
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold text-primary">Configuraciones</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("upDate")}>Borrar sesión</Link>
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("upDate")}>Editar</Link>
          </div>
          {/* </div> */}
        </Acordion>
        {/* </div> */}
      </div >
      <div className='flex flex-col  w-full px-4 justify-center items-center gap-8'>
        <div className='w-full flex justify-between items-center gap-2'>
          <details className="dropdown">
            <summary className="btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg></summary>
            <ul className={`menu z-[1] dropdown-content ${DarkMode ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} rounded-box z-1 w-52 p-2 shadow-sm border`}>
              <di className="max-h-72 overflow-y-scroll">
                <li><p className={`font-bold text-primary`}>Ejercicio</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("todos")}><p className="text-primary">Todos</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("add")}><p className="text-primary">Agregar</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("upDate")}><p className="text-primary">Modificar</p></li>
                <li><p className={`font-bold text-primary`}>Estadisticas</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("strong")}><p className="text-primary">Fuerza</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("resistance")}><p className="text-primary">Resistencia</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("flexibility")}><p className="text-primary">Flexibilidad</p></li>
                <li><p className={`font-bold text-primary`}>Configuraciones</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("todos")}><p className="text-primary">Todos</p></li>
                <li className='pl-2' onClick={() => setOptionScreens("todos")}><p className="text-primary">Agregar</p></li>
              </di>
            </ul>
          </details>
          <SearchBar setSearch={setSearch} placeholder={"Buscar ejercicio"} />
        </div>
        {optionScreens === "todos" && <div className="flex justify-center gap-4 flex-wrap w-full h-full overflow-y-auto">
          {exercises.map((s) => (
            <Acordion key={s.id}>
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold text-primary">{s.type_exercise}</div>
              <div className="collapse-content text-sm flex flex-col gap-2">
                <p className="text-base-content mb-2"><span className="font-semibold">Tipo de ejercicio:</span> {s.type_exercise}</p>
                <table className='table'>
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
                      <tr key={exercise.id} className={`${DarkMode ? "hover:bg-tertiary" : "hover:bg-secondary"} cursor-pointer`}>
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
                          <button className={`btn ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}><FaRegEdit color={`${DarkMode ? "#142d4c" : "#ececec"}`} /></button>
                          <button className={`btn ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}><MdDelete color={`${DarkMode ? "#142d4c" : "#ececec"}`} /></button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Acordion >
          ))}
        </div>}
        {optionScreens === 'add' && (
          <ModeEditionExercise />
        )}
        {optionScreens === 'upDate' && (
          <ModeEditionExercise setOptionScreens={setOptionScreens} />
        )}
      </div>
    </div >
  )
}
