// src/module/exercise/components/AllExercises.jsx
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUiStore } from '../../../stores';
import { Acordion } from "../../core/ui/Acordion";
import { exercises } from "../../../utils/exercise";


export function AllExercises({ filteredExercises = exercises }) {
  const { DarkMode } = useUiStore();
  return (
    <div className={`hidden w-full md:flex flex-col items-center h-auto transition-bg rounded-xl shadow-[0_2px_15px_0_#53a8b6]`}>
      {filteredExercises.map((s) => (
        <Acordion key={s.id}>
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold text-letterPrimary">{s.type_exercise}</div>
          <div className="collapse-content text-sm flex w-full flex-col gap-2 overflow-x-scroll">
            <p className="mb-2 text-letterPrimary"><span className="font-semibold">Tipo de ejercicio:</span> {s.type_exercise}</p>
            <table className='table w-full'>
              <thead>
                <tr className={`${DarkMode ? "bg-primary text-letterPrimary" : "bg-secondary text-letterPrimary"} transition-bg`}>
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
                  <tr key={exercise.id} className={`${DarkMode ? "hover:bg-tertiary/15" : "hover:bg-secondary"} text-letterPrimary cursor-pointer`}>
                    <th>{exercise.name_exercise}</th>
                    <th>{exercise.description}</th>
                    <th>{exercise.variante}</th>
                    <th>{exercise.image}</th>
                    <th>{exercise.video}</th>
                    <th className='flex gap-2'>
                      <button className={`btn ${DarkMode ? "bg-primary hover:bg-gray-300" : "bg-secondary hover:bg-gray-300"} transition-bg border-letterPrimary`}><FaRegEdit color={`${DarkMode ? "#53a8b6" : "#ececec"}`} /></button>
                      <button className={`btn ${DarkMode ? "bg-primary hover:bg-gray-300" : "bg-secondary hover:bg-gray-300"} transition-bg border-letterPrimary`}><MdDelete color={`${DarkMode ? "#53a8b6" : "#ececec"}`} /></button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Acordion>
      ))}
    </div>
  );
}