import { useUiStore } from "../../../../stores";

/* eslint-disable react/prop-types */
export const SubTitle = ({ children }) => {
    const { DarkMode } = useUiStore();
    return (
        <div className={`collapse-title font-semibold ${DarkMode ? "text-letterSecondary" : "text-letterPrimary"}`}>{children}</div>

    )
}
