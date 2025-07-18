/* eslint-disable react/prop-types */
import { useUiStore } from "../../../../stores";

export function ButtonPrimary({ href, onClick, children }) {
    const { DarkMode } = useUiStore();
    return (
        <a href={href && href} onClick={onClick && onClick} className={`btn btn-outline ${DarkMode ? " bg-tertiary text-letterPrimary" : "bg-secondary text-letterSecondary"} btn-md transition-bg`}>{children}</a>
    )
}
