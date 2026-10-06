import { useUiStore } from "../stores";
import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/scrollToTop";
import Sections from "../module/home/components/Sections";
import { EffortRing } from "../module/core/ui/EffortRing";

export default function Home() {
  const { DarkMode } = useUiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    scrollToTop({ smooth: true });
    setMounted(true);
  }, []);

  return (
    <main className={`min-h-screen flex flex-col ${DarkMode ? "bg-primary" : "bg-secondary"} transition-colors duration-300`}>
      {/* Hero */}
      <section
        className="relative w-full min-h-screen flex items-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-banner bg-cover bg-center bg-no-repeat" />
          <div className={`absolute inset-0 ${DarkMode
            ? "bg-gradient-to-br from-secondary/95 via-secondary/85 to-secondary/60"
            : "bg-gradient-to-br from-primary/98 via-primary/90 to-primary/70"
          }`} />
          {/* Decorative gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-effort-500/10 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-track-500/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        <div className="section-container relative z-10 py-32 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content */}
            <div className={`flex-1 text-center lg:text-left ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-effort-500/15 text-effort-400 text-caption font-semibold uppercase tracking-wider mb-6 border border-effort-500/20">
                <span className="w-2 h-2 rounded-full bg-effort-500 animate-pulse-soft" />
                Plataforma de entrenamiento
              </span>

              <h1
                id="hero-title"
                className={`text-display-sm sm:text-display-md lg:text-display-lg font-extrabold tracking-tight mb-6 ${DarkMode ? "text-primary" : "text-secondary"} text-balance`}
              >
                El esfuerzo{" "}
                <span className="gradient-text-dark">se mide</span>
                <br />
                el progreso{" "}
                <span className="gradient-text-dark">se ve</span>
              </h1>

              <p className={`text-body-lg max-w-xl mx-auto lg:mx-0 mb-8 ${DarkMode ? "text-primary/70" : "text-secondary/70"} leading-relaxed`}>
                Plataforma de gestión de entrenamiento para profesores de Educación Física.
                Diseñada para planificar sesiones, rastrear el progreso de tus alumnos
                y fomentar un estilo de vida saludable.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="/sign-in"
                  className="btn btn-lg rounded-xl bg-effort-600 text-white hover:bg-effort-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-effort-600/25 border-0 font-semibold"
                >
                  Comenzar ahora
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#servicios"
                  className={`btn btn-lg rounded-xl border-2 font-semibold transition-all duration-200 active:scale-[0.98] ${
                    DarkMode
                      ? "border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5"
                      : "border-secondary/30 text-secondary hover:border-secondary/60 hover:bg-secondary/5"
                  }`}
                >
                  Ver servicios
                </a>
              </div>

              {/* Stats */}
              <div className={`flex flex-wrap gap-8 mt-12 pt-8 border-t ${DarkMode ? "border-primary/10" : "border-secondary/10"} justify-center lg:justify-start`}>
                {[
                  { value: "150+", label: "Ejercicios" },
                  { value: "3", label: "Tipos de usuario" },
                  { value: "60", label: "FPS garantizado" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-data-lg text-effort-400 font-bold">{stat.value}</div>
                    <div className={`text-caption uppercase tracking-wider ${DarkMode ? "text-primary/50" : "text-secondary/50"}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature: EffortRing */}
            <div className={`flex-shrink-0 ${mounted ? 'animate-slide-up animate-in-delay-3' : 'opacity-0'}`}>
              <div className="relative">
                {/* Glow behind ring */}
                <div className="absolute inset-0 scale-150 blur-3xl bg-effort-500/10 rounded-full" />
                <EffortRing
                  progress={78}
                  size={240}
                  strokeWidth={12}
                  showValue={true}
                  valueLabel="Esfuerzo"
                  variant="primary"
                  className="relative"
                />
                {/* Orbiting badges */}
                <div className="absolute -top-2 -right-2 w-14 h-14 rounded-xl bg-track-500 flex items-center justify-center shadow-lg shadow-track-500/30 rotate-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white dark:bg-base-800 shadow-lg border border-base-200 dark:border-base-700 rotate-[-4deg]">
                  <span className="text-data-sm text-track-500 font-bold">+24%</span>
                  <span className={`text-caption ml-1 ${DarkMode ? "text-primary/60" : "text-secondary/60"}`}>
                    progreso
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-soft">
          <span className={`text-caption uppercase tracking-wider ${DarkMode ? "text-primary/40" : "text-secondary/40"}`}>
            Desliza
          </span>
          <svg className={`w-5 h-5 ${DarkMode ? "text-primary/40" : "text-secondary/40"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <Sections />
    </main>
  )
}
