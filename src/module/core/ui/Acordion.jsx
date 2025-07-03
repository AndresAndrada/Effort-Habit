/* eslint-disable react/prop-types */
import { useUiStore } from '../../../stores'

export const Acordion = ({ children, darkMode }) => {
    const { DarkMode } = useUiStore();
    return (
        <>
            <div className={`join-vertical ${!darkMode ? DarkMode ? "bg-secondary/40" : "bg-tertiary/20" : ""} transition-bg rounded-xl w-full`}>
                {/* <input type="radio" name="my-accordion-4" defaultChecked /> */}
                <div className="collapse collapse-arrow join-item w-full">
                    {children}
                </div>
            </div>
        </>
    )
}
