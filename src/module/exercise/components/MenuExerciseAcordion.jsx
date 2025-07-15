import { Link } from "react-router-dom"
import { Acordion } from "../../core/ui/Acordion"
import { SubTitle } from "../../core/ui/title/SubTitle"
import { useUiStore } from "../../../stores";

export const MenuExerciseAcordion = () => {
    const { DarkMode, setMenuOptionExercise, MenuOptionExercise } = useUiStore();
    return (
        <div className={`hidden max-w-md w-full md:flex flex-col items-center justify-center shadow-4xl ${DarkMode ? "bg-secondary/40" : "bg-tertiary/20"} transition-bg rounded-xl`}>
            <Acordion darkMode={true}>
                <input type="radio" name="my-accordion-3" defaultChecked />
                <SubTitle>Ejercicio</SubTitle>
                <div className="collapse-content text-sm flex flex-col gap-2">
                    <Link className={`${MenuOptionExercise === "todos" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("todos")}>Todos</Link>
                    <Link className={`${MenuOptionExercise === "add" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("add")}>Agregar</Link>
                    <Link className={`${MenuOptionExercise === "upDate" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("upDate")}> Modificar</Link>
                </div>
            </Acordion>
            {/* </div> */}
            <Acordion darkMode={true}>
                {/* <div className="collapse collapse-arrow join-item"> */}
                <input type="radio" name="my-accordion-3" />
                <SubTitle>Estadisticas</SubTitle>
                <div className="collapse-content text-sm flex flex-col gap-2">
                    <Link className={`${MenuOptionExercise === "upDate" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("upDate")}>Fuerza</Link>
                    <Link className={`${MenuOptionExercise === "upDate" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("upDate")}>Flexibilidad</Link>
                </div>
            </Acordion>
            {/* </div> */}
            <Acordion darkMode={true}>
                {/* <div className="collapse collapse-arrow join-item"> */}
                <input type="radio" name="my-accordion-3" />
                <SubTitle>Configuraciones</SubTitle>
                <div className="collapse-content text-sm flex flex-col gap-2">
                    <Link className={`${MenuOptionExercise === "upDate" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("upDate")}>Borrar sesión</Link>
                    <Link className={`${MenuOptionExercise === "upDate" ? "bg-gray-500/50" : ""} ${DarkMode ? "text-primary hover:bg-tertiary" : "text-primary hover:bg-secondary"} transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("upDate")}>Editar</Link>
                </div>
                {/* </div> */}
            </Acordion>
            {/* </div> */}
        </div >
    )
}
