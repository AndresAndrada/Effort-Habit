/* eslint-disable react/prop-types */
import { useUiStore } from "../../../stores";

export const CardsDashboard = ({ children, onClick }) => {
    const { DarkMode } = useUiStore();
    return (
        <div onClick={onClick} className={`max-w-96 h-20 sm:h-auto flex flex-col items-center justify-start cursor-pointer min-h-[26rem] ${DarkMode ? "" : "bg-tertiary/30 hover:bg-tertiary/45"} transition-bg rounded-xl shadow-4xl hover:scale-105 transition-transform`}>
            {children}
        </div>
    )
}
