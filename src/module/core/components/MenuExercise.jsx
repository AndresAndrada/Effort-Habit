/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUiStore } from '../../../stores'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export const MenuExercise = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);
    const { DarkMode } = useUiStore();
    return (
        <details className="dropdown w-full flex md:hidden">
            <summary onClick={() => setOpenModal(!openModal)} className="text-primary px-4 flex cursor-pointer">
                {!openModal ? <IoIosArrowDown size={20} className={`inline-block ${DarkMode ? "bg-primary" : "bg-secondary"} transition-colors`} /> : <IoIosArrowUp />}
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                    <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg> */}
            </summary>
            <ul className={`menu z-[1] dropdown-content ${DarkMode ? "bg-secondary border-primary" : "bg-tertiary border-secondary"} rounded-box z-1 w-52 p-2 shadow-sm border`}>
                <di className="max-h-72 overflow-y-scroll">
                    {children}
                </di>
            </ul>
        </details>
    )
}
