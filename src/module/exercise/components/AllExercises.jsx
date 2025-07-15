// src/module/exercise/components/AllExercises.jsx
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUiStore } from '../../../stores';
import { Acordion } from "../../core/ui/Acordion";
import { exercises } from "../../../utils/exercise";


export function AllExercises() {
  const { DarkMode } = useUiStore();
  return (
    <div className={`${DarkMode ? "border border-letterPrimary" : "border border-letterPrimary"} flex -z-0 justify-center gap-4 flex-col w-full h-full p-2 rounded-xl shadow-[0_4px_20px_0_#53a8b6]`}>
      {exercises.map((s) => (
        <Acordion key={s.id}>
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold text-primary">{s.type_exercise}</div>
          <div className="collapse-content text-sm flex w-full flex-col gap-2 overflow-x-scroll">
            <p className="mb-2 text-white"><span className="text-white font-semibold">Tipo de ejercicio:</span> {s.type_exercise}</p>
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
                  <tr key={exercise.id} className={`${DarkMode ? "hover:bg-tertiary" : "hover:bg-secondary"} text-white cursor-pointer`}>
                    <th>{exercise.name_exercise}</th>
                    <th>{exercise.description}</th>
                    <th>{exercise.variante}</th>
                    <th>{exercise.image}</th>
                    <th>{exercise.video}</th>
                    <th className='flex gap-2'>
                      <button className={`btn ${DarkMode ? "bg-primary hover:bg-gray-300" : "bg-secondary hover:bg-gray-300"} transition-bg`}><FaRegEdit color={`${DarkMode ? "#142d4c" : "#ececec"}`} /></button>
                      <button className={`btn ${DarkMode ? "bg-primary hover:bg-gray-300" : "bg-secondary hover:bg-gray-300"} transition-bg`}><MdDelete color={`${DarkMode ? "#142d4c" : "#ececec"}`} /></button>
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