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
    <div className={`flex flex-col min-h-screen items-start px-6 py-12 mt-12 w-full ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <div className={`hidden max-w-md w-full md:flex flex-col items-center justify-center ${DarkMode ? "bg-secondary shadow-xl" : "bg-tertiary"} transition-bg rounded-xl`}>
        <Acordion>
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold text-primary">Ejercicio</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("todos")}>Todos los ejericios</Link>
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("add")}>Agregar</Link>
            <Link className={`${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setOptionScreens("upDate")}> Modificar</Link>
          </div>
        </Acordion>
        {/* <div className={`max-w-md w-full ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center`}>
          <img
            src={user?.avatar || "/src/assets/svg/userCircle.svg"}
            alt="Avatar del usuario"
            className="w-24 h-24 rounded-full mb-4 border-4 border-primary object-cover"
          />
          <h2 className="text-2xl font-bold mb-2 text-primary">{user?.name || 'Nombre de usuario'}</h2>
          <p className="text-base-content mb-1"><span className="font-semibold">Email:</span> {user?.email || 'No especificado'}</p>
          <p className="text-base-content mb-1"><span className="font-semibold">Teléfono:</span> {user?.phone || 'No especificado'}</p>
          <p className="text-base-content mb-1"><span className="font-semibold">Dirección:</span> {user?.address || 'No especificada'}</p>
        </div> */}
        {/* <div className={`join join-vertical ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl w-full`}>
          <div className="collapse collapse-arrow join-item w-full"> */}

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
      <div className='flex flex-col w-full px-4 justify-center items-center gap-8'>
        <div className='w-full'>
          <SearchBar setSearch={setSearch} />
        </div>
        {optionScreens === "todos" && <div className="flex justify-center gap-4 flex-wrap w-full h-full overflow-y-auto">
          {exercises.map((s) => (
            <>
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
                        <>
                          <tr className={`${DarkMode ? "hover:bg-tertiary" : "hover:bg-secondary"} cursor-pointer`}>
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
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Acordion >
            </>
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
