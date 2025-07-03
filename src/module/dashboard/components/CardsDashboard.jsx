/* eslint-disable react/prop-types */
import { useUiStore } from "../../../stores";

export const CardsDashboard = ({ children, onClick }) => {
    const { DarkMode } = useUiStore();
    return (
        <div onClick={onClick} className={`max-w-96 cursor-pointer ${DarkMode ? "bg-secondary hover:bg-slate-500" : "bg-tertiary hover:bg-gray-400/20"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center`}>
            {children}
        </div>
    )
}
