import { useNavigate } from "react-router-dom";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores";
import { CardsDashboard } from "../module/dashboard/components/CardsDashboard";
import { dashBoard, navigateToSection } from "../utils/dashboardUtils.helpers";

export default function Dashboard() {
  const navigate = useNavigate();
  const { DarkMode } = useUiStore();
  const handleNavigateOption = (option) => {
    console.log("🚀 ~ handleNavigateOption ~ option:", option)
    navigateToSection(option, navigate, null, false);
  }
  return (
    <div className={`min-h-screen flex flex-col items-center py-6 gap-2 ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <div className="pt-16">
        <Title className={true}>Panel de Control</Title>
      </div>
      <section
        id="servicios"
        className={`w-full px-4 md:flex-1 grid grid-cols-1 sm:grid-cols-2 md:flex justify-center items-center ${dashBoard.length > 3 && "lg:grid-cols-4"} gap-8`}
      >
        {dashBoard.map((item, index) => (
          <CardsDashboard key={index} onClick={() => handleNavigateOption(item.label)}>
            <img src="/src/assets/svg/mint.svg" alt="Entrenamiento personalizado" className="w-16 h-16 mb-4" />
            <Title>{item.title}</Title>
            <p className={`text-base-content text-center ${DarkMode ? "text-slate-300" : "text-stone-300"} transition-bg`}>
              {item.description}
            </p>
          </CardsDashboard>
        ))}
      </section>
    </div>
  )
}
