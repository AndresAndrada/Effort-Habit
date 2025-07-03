/* eslint-disable react/prop-types */
import { useUiStore } from '../../../stores'

export const Acordion = ({ children }) => {
    const { DarkMode } = useUiStore();
    return (
        <>
            <div className={`join-vertical ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl w-full`}>
                {/* <input type="radio" name="my-accordion-4" defaultChecked /> */}
                <div className="collapse collapse-arrow join-item w-full">
                    {children}
                </div>
            </div>
        </>
    )
}
