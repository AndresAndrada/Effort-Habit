import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../../stores";
import { siderBar } from "../../../utils/sidebar";

export default function SideBar() {
  const navigate = useNavigate();
  const { DarkMode } = useUiStore();
  const closeDrawer = (option) => {
    option === "main" ? navigate("/") :
      option === "perfil" ? navigate("/profile") :
        option === "exercise" ? navigate("/dashBoard") :
          option === "user" ? navigate("/users") : null;
    document.getElementById('my-drawer').checked = false
  }
  return (
    <div className="flex-1 -z-0">
      <div className="drawer flex flex-row items-center">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button" aria-label="open sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className={`menu bg-base-200 text-base-content min-h-full max-w-60 sm:w-80 p-4 ${DarkMode ? "bg-primary text-secondary" : "bg-secondary text-primary"} transition-bg`}>
            {siderBar.map((e, index) => <>
              <li key={index}><a onClick={() => closeDrawer(e.label)}>{e?.title}</a></li>
            </>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
