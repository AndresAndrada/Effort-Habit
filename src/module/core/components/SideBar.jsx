import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../../stores";
import { useState } from "react";
import { closeDrawer, siderBarAdmin, siderBarUser } from "../../../utils/sideBarUtils.helpers";
import { user } from "../../../utils/usersUtils.helpers";

export default function SideBar() {
  const { DarkMode } = useUiStore();
  const [opcionLocation, setOptionLocation] = useState("main");
  const navigate = useNavigate();

  const handleCloseDrawer = (option) => {
    closeDrawer(option, navigate, setOptionLocation);
  };

  return (
    <div className="flex-1 z-10">
      <div className="drawer flex flex-row items-center">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button" aria-label="open sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className={`menu min-h-full max-w-60 w-full p-4 ${DarkMode ? "bg-primary text-secondary" : "bg-secondary text-primary"} transition-bg`}>
            {user.role === "admin"
              ? siderBarAdmin.map((e, index) =>
                <li key={index} className={`${opcionLocation === e.label && "bg-gray-500/20 rounded-xl"}`}><a onClick={() => handleCloseDrawer(e.label)}>{e?.title}</a></li>
              )
              : siderBarUser.map((e, index) =>
                <li key={index} className={`${opcionLocation === e.label && "bg-gray-500/20 rounded-xl"}`}><a onClick={() => handleCloseDrawer(e.label)}>{e?.title}</a></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
