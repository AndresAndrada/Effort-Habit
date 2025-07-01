import { useNavigate } from "react-router-dom";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores";
import { dashBoard } from "../utils/dashboard";
import { closeDrawer } from "../utils/sideBarUtils.helpers";

export default function Dashboard() {
  const navigate = useNavigate();
  const { DarkMode } = useUiStore();
  const handleNavigate = (option) => {
    closeDrawer(option, navigate, null);
  }
  return (
    <div className={`min-h-screen flex flex-col items-center py-8 ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <div className="pt-16">
        <Title>Panel de Control</Title>
      </div>
      <section id="servicios" className={`mt-16 w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:flex justify-center ${dashBoard.length > 3 && "lg:grid-cols-4"} gap-8`}>
        {dashBoard.map((item, index) => (
          <div key={index} onClick={() => handleNavigate(item.label)} className={`max-w-96 cursor-pointer ${DarkMode ? "bg-secondary hover:bg-slate-500" : "bg-tertiary hover:bg-gray-400/20"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center animate-accordion-up`}>
            <img src="/src/assets/svg/mint.svg" alt="Entrenamiento personalizado" className="w-16 h-16 mb-4 animate-accordion-up" />
            <Title>{item.title}</Title>
            <p className={`text-base-content text-center ${DarkMode ? "text-slate-300" : "text-stone-300"} transition-bg`}>
              Planes adaptados a tus objetivos y necesidades, guiados por profesionales.
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
