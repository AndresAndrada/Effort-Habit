import { Link } from "react-router-dom"
import { Acordion } from "../../core/ui/Acordion"
import { SubTitle } from "../../core/ui/title/SubTitle"
import { useUiStore } from "../../../stores";

export const MenuExerciseAcordion = () => {
    const { DarkMode, setMenuOptionExercise, MenuOptionExercise } = useUiStore();
    return (
        <div className={`hidden max-w-md w-full md:flex flex-col items-center justify-center shadow-4xl ${DarkMode ? "" : "bg-tertiary/20"} transition-bg rounded-xl shadow-[0_2px_10px_0_#53a8b6]`}>
            <Acordion darkMode={true}>
                <input type="radio" name="my-accordion-3" defaultChecked />
                <SubTitle>Ejercicio</SubTitle>
                <div className="collapse-content text-sm flex flex-col gap-2">
                    <Link className={`${MenuOptionExercise === "todos" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("todos")}>Todos</Link>
                    <Link className={`${MenuOptionExercise === "add" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("add")}>Agregar</Link>
                    <Link className={`${MenuOptionExercise === "notification" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("notification")}> Modificar</Link>
                </div>
            </Acordion>
            {/* </div> */}
            <Acordion darkMode={true}>
                {/* <div className="collapse collapse-arrow join-item"> */}
                <input type="radio" name="my-accordion-3" />
                <SubTitle>Estadisticas</SubTitle>
                <div className="collapse-content text-sm flex flex-col gap-2">
                <Link className={`${MenuOptionExercise === "strong" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("strong")}>Fuerza</Link>
                <Link className={`${MenuOptionExercise === "flexibility" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("flexibility")}>Flexibilidad</Link>
            </div>
            </Acordion>
            {/* </div> */}
            <Acordion darkMode={true}>
                {/* <div className="collapse collapse-arrow join-item"> */}
                <input type="radio" name="my-accordion-3" />
                <SubTitle>Configuraciones</SubTitle>
                <div className="collapse-content text-sm flex flex-col gap-2">
                <Link className={`${MenuOptionExercise === "delete" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("delete")}>Borrar sesión</Link>
                <Link className={`${MenuOptionExercise === "upDate" ? "border border-letterPrimary" : ""} ${DarkMode ? "text-letterPrimary hover:bg-gray-500/35" : "text-primary hover:bg-gray-500/35"} rounded-xl transition-colors w-full p-2`} onClick={() => setMenuOptionExercise("upDate")}>Editar</Link>
                </div>
            </Acordion>
        </div >
    )
}
