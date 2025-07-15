/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUiStore } from '../../../stores'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export const MenuExercise = ({
  options, // []
  onSelect, // () => { }
  darkMode, // false
  className, // string
  label // string
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { MenuOptionExercise, setMenuOptionExercise } = useUiStore();
  const handleMenuOption = (option) => {
    console.log(option, "option");
    onSelect(option)
    setMenuOptionExercise(option);
  }
  return (
    <details className="dropdown dropdown-content z-100 w-[3rem] flex md:hidden">
      <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={() => setOpenModal(!openModal)}>
        {!openModal
          ? <IoIosArrowDown size={20} className="inline-block transition-bg"
            color={darkMode ? "#79c2d0" : "#53a8b6"} />
          : <IoIosArrowUp size={20} className="inline-block transition-colors"
            color={darkMode
              ? "#79c2d0"
              : "#53a8b6"} />}
      </summary>
      <ul className={`menu z-[1] dropdown-content ${darkMode ? "bg-primary" : "bg-tertiary"} rounded-box z-1 w-52 p-2 shadow-4xl`}>
        <div className="max-h-72 overflow-y-scroll">
          {options.map((option) => (
            <div key={option.id}>
              {option.type === "title"
                ? (<li className="pointer-events-none select-none cursor-default opacity-80"><p className="font-bold">{option.title}</p></li>)
                : (<li className={`${darkMode ? "text-black" : "text-primary"} w-full text-left pl-3 my-1`}
                ><a onMouseDown={() => handleMenuOption(option.value)} className={`${darkMode ? "text-black" : "text-primary"}  ${MenuOptionExercise === option.value && "bg-slate-400/15"}`}>{option.label}</a></li>)}
              {/* < li > <p className={`font-bold text-primary`}>Ejercicio</p></li>
              <li className="text-primary w-full text-left pl-3 my-1"
              ><a onMouseDown={() => handleMenuOption(option.value)} className={`text-primary ${MenuOptionExercise === "todos" && "bg-slate-400/15"}`}>Todos</a></li> */}
            </div>
          ))}
        </div>

      </ul >
    </details >
  )
}


//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("add")} className={`text-primary ${MenuOptionExercise === "add" && "bg-slate-400/15"}`}>Agregar</a></li>
//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("upDate")} className={`text-primary ${MenuOptionExercise === "upDate" && "bg-slate-400/15"}`}>Modificar</a></li>
//   <li><p className={`font-bold text-primary`}>Estadisticas</p></li>
//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("strong")} className={`text-primary ${MenuOptionExercise === "stong" && "bg-slate-400/15"}`}>Fuerza</a></li>
//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("resistence")} className={`text-primary ${MenuOptionExercise === "resistence" && "bg-slate-400/15"}`}>Resistencia</a></li>
//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("flexibility")} className={`text-primary ${MenuOptionExercise === "flexibility" && "bg-slate-400/15"}`}>Flexibilidad</a></li>
//   <li><p className={`font-bold text-primary`}>Configuraciones</p></li>
//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("")} className={`text-primary ${MenuOptionExercise === "" && "bg-slate-400/15"}`}>Todos</a></li>
//   <li className="text-primary w-full text-left pl-3 my-1"
//   ><a onMouseDown={() => handleMenuOption("")} className={`text-primary ${MenuOptionExercise === "" && "bg-slate-400/15"}`}>Agregar</a></li>
// </div>
