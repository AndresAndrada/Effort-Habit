/* eslint-disable react/prop-types */
import { useUiStore } from "../../../../stores";

export const Title = ({ children, className }) => {
    const { DarkMode } = useUiStore();
    return (
        <h2 className={`${className ? (DarkMode ? "text-secondary" : "text-stone-300") : "text-stone-300"} transition-bg text-3xl font-bold mb-2 text-center`}>{children}</h2>
    )
}
