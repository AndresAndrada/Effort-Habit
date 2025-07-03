/* eslint-disable react/prop-types */
import { useUiStore } from "../../../../stores";

export const Title = ({ children, className }) => {
    const { DarkMode } = useUiStore();
    return (
        <h2 className={`${className ? (DarkMode ? "text-secondary" : "text-primary") : "text-secondary"} transition-bg text-3xl font-bold mb-2 text-center`}>{children}</h2>
    )
}
