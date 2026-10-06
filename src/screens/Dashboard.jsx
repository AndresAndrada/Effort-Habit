import { useNavigate, useLocation } from "react-router-dom";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores";
import { useAuth } from "../hooks/useAuth.js";
import { CardsDashboard } from "../module/dashboard/components/CardsDashboard";
import { dashboardOptions, navigateToSection } from "../utils/dashboardUtils.helpers";
import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/scrollToTop";

const optionIcons = {
  users: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  exercises: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5v9m10.5-9v9M3.75 10.5h16.5M6.75 16.5h.008v.008H6.75v-.008zm10.5 0h.008v.008h-.008v-.008z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h2.25l.75 13.5h12L18.75 6H21" />
    </svg>
  ),
  sessions: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  trainers: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  "my-sessions": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  progress: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  dashboard: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
};

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { DarkMode } = useUiStore();
  const { isAdmin, isTeacher, isTrainer } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    scrollToTop({ smooth: true });
    setMounted(true);
  }, []);

  const handleNavigateOption = (option) => {
    navigateToSection(option, navigate, location);
  };

  let options = dashboardOptions.default;
  if (isAdmin) options = dashboardOptions.admin;
  else if (isTeacher) options = dashboardOptions.teacher;
  else if (isTrainer) options = dashboardOptions.trainer;

  return (
    <div className={`min-h-screen ${DarkMode ? "bg-primary" : "bg-secondary"} transition-colors duration-300`}>
      <div className="section-container pt-24 pb-16">
        <header className="max-w-2xl mb-10">
          <span className="inline-block text-caption font-semibold uppercase tracking-wider text-effort-500 dark:text-effort-400 mb-3">
            {isAdmin ? "Administración" : isTeacher ? "Profesor" : "Entrenador"}
          </span>
          <Title size="display-sm" weight="bold" align="left" as="h1" className="mb-3">
            Panel de control
          </Title>
          <p className={`text-body-lg ${DarkMode ? "text-secondary/60" : "text-primary/60"}`}>
            Gestiona usuarios, ejercicios y sesiones de entrenamiento desde un solo lugar.
          </p>
        </header>

        <section
          id="servicios"
          aria-label="Opciones del panel de control"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {options.map((item, index) => (
            <div
              key={item.id}
              className={mounted ? `animate-slide-up` : "opacity-0"}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardsDashboard
                onClick={() => handleNavigateOption(item.label)}
                className="group h-full"
              >
                {/* Icon header */}
                <div className="relative flex items-center justify-center h-36 overflow-hidden bg-base-100 dark:bg-base-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-effort-500/10 to-track-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative text-effort-500 dark:text-effort-400 group-hover:scale-110 transition-transform duration-300">
                    {optionIcons[item.label] || optionIcons.dashboard}
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-effort-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Title size="heading-md" weight="bold" align="left" className="mb-2 group-hover:text-effort-500 dark:group-hover:text-effort-400 transition-colors">
                      {item.title}
                    </Title>
                    <p className={`text-body-sm ${DarkMode ? "text-secondary/60" : "text-primary/60"} leading-relaxed`}>
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-base-200 dark:border-base-700">
                    <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-effort-500 dark:text-effort-400 group-hover:gap-2.5 transition-all duration-200">
                      Abrir
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </CardsDashboard>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
