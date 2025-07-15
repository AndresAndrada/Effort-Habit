/* eslint-disable react/prop-types */
import { useUiStore } from "../../../../stores";

export const Title = ({ children, className, size }) => {
    const { DarkMode } = useUiStore();
    return (
        <h2 className={`${className ? (DarkMode ? "text-secondary" : "text-letterSecondary") : "text-letterSecondary"} transition-bg ${size ? size : "text-3xl"} font-bold mb-2 text-center`}>{children}</h2>
    )
}
