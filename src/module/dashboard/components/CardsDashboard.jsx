/* eslint-disable react/prop-types */
import { useUiStore } from "../../../stores";

export const CardsDashboard = ({ children, onClick }) => {
    const { DarkMode } = useUiStore();
    return (
        <div onClick={onClick} className={`max-w-96 h-20 sm:h-auto flex flex-col items-center justify-start cursor-pointer ${DarkMode ? "bg-secondary/40 hover:bg-secondary/45" : "bg-tertiary/30 hover:bg-tertiary/45"} transition-bg sm:rounded-xl p-2 md:p-6 shadow-4xl`}>
            {children}
        </div>
    )
}
