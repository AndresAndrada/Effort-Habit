import { useState } from 'react';
import { useUiStore } from '../../../stores'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export const MenuExercise = () => {
  const [openModal, setOpenModal] = useState(false);
  const { DarkMode, setMenuOptionExercise } = useUiStore();
  const handleMenuOption = (option) => {
    setMenuOptionExercise(option);
  }
  return (
    <div className="dropdown z-50 w-full flex md:hidden">
      <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={() => setOpenModal(!openModal)}>
        {!openModal
          ? <IoIosArrowDown size={20} className={`inline-block ${DarkMode
            ? "bg-primary"
            : "bg-secondary"} transition-bg`}
            color={DarkMode ? "black" : "white"} />
          : <IoIosArrowUp size={20} className={`inline-block ${DarkMode
            ? "bg-primary"
            : "bg-secondary"} transition-colors`}
            color={DarkMode
              ? "black"
              : "white"} />}
      </summary>
      <ul className={`menu z-[1] dropdown-content ${DarkMode ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} rounded-box z-1 w-52 p-2 shadow-sm border`}>
        <div className="max-h-72 overflow-y-scroll">
          <li><p className={`font-bold text-primary`}>Ejercicio</p></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("todos")} className="text-primary">Todos</a></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("add")} className="text-primary">Agregar</a></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("upDate")} className="text-primary">Modificar</a></li>
          <li><p className={`font-bold text-primary`}>Estadisticas</p></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("strong")} className="text-primary">Fuerza</a></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("resistence")} className="text-primary">Resistencia</a></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("flexibility")} className="text-primary">Flexibilidad</a></li>
          <li><p className={`font-bold text-primary`}>Configuraciones</p></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("")} className="text-primary">Todos</a></li>
          <li className="text-primary w-full text-left pl-6 my-1"
          ><a onMouseDown={() => handleMenuOption("")} className="text-primary">Agregar</a></li>
        </div>
      </ul>
    </div>
  )
}
