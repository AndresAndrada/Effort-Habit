import { useNavigate, useLocation } from "react-router-dom";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores";
import { useAuth } from "../hooks/useAuth.js";
import { CardsDashboard } from "../module/dashboard/components/CardsDashboard";
import { dashboardOptions, navigateToSection } from "../utils/dashboardUtils.helpers";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { DarkMode } = useUiStore();
  const { isAdmin, isTeacher, isTrainer } = useAuth();

  const handleNavigateOption = (option) => {
    navigateToSection(option, navigate, location);
  };

  let options = dashboardOptions.default;
  if (isAdmin) options = dashboardOptions.admin;
  else if (isTeacher) options = dashboardOptions.teacher;
  else if (isTrainer) options = dashboardOptions.trainer;

  return (
    <div className={`min-h-screen flex flex-col items-center py-6 gap-2 ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <div className="pt-16">
        <Title className={true}>Panel de Control</Title>
      </div>
      <section
        id="servicios"
        className={`w-full px-4 md:flex-1 grid grid-cols-1 sm:grid-cols-2 md:flex justify-center items-center ${options.length > 3 && "lg:grid-cols-4"} gap-8`}
      >
        {options.map((item) => (
          <CardsDashboard key={item.id} onClick={() => handleNavigateOption(item.label)}>
            <img
              src={item.img}
              alt={item.title}
              className="hidden sm:flex rounded-t-xl mb-4"
              loading="lazy"
              width={400}
              height={225}
              decoding="async"
            />
            <div className="m-2 gap-4">
            <Title size={"text-2xl"}>{item.title}</Title>
            <p className={`text-base-content text-center ${DarkMode ? "text-slate-300" : "text-stone-300"} transition-bg`}>
              {item.description}
            </p>
            </div>
          </CardsDashboard>
        ))}
      </section>
    </div>
  );
}