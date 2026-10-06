import { useUiStore } from "../../../stores";
import { Title } from "../../core/ui/title/Title";
import homeUtils from "../../../utils/homeUtils.helpers.json";

const serviceIcons = [
  <svg key="dumbbell" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5v9m10.5-9v9M3.75 10.5h16.5M6.75 16.5h.008v.008H6.75v-.008zm10.5 0h.008v.008h-.008v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h2.25l.75 13.5h12L18.75 6H21M6.75 6V4.5A1.5 1.5 0 018.25 3h7.5a1.5 1.5 0 011.5 1.5V6" />
  </svg>,
  <svg key="users" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  <svg key="heart" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>,
];

export default function Sections() {
  const { DarkMode } = useUiStore();

  return (
    <>
      <section
        id="servicios"
        aria-labelledby="servicios-title"
        className={`py-20 sm:py-24 ${DarkMode ? "bg-secondary" : "bg-primary"} transition-colors duration-300`}
      >
        <div className="section-container">
          <header className="max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-wider text-effort-400 mb-4">
              Nuestros servicios
            </span>
            <Title size="display-sm" weight="bold" as="h2" id="servicios-title" className="mb-4">
              Entrena con propósito
            </Title>
            <p className={`text-body-lg ${DarkMode ? "text-primary/60" : "text-secondary/60"} text-balance`}>
              Herramientas diseñadas para que los profesores de Educación Física gestionen
              sus sesiones de forma eficiente.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeUtils.map((items, index) => (
              <article
                key={items.id}
                className={`group relative p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                  DarkMode
                    ? "bg-base-100/50 border-base-300/50 hover:border-effort-500/40"
                    : "bg-white border-base-200 hover:border-effort-300"
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-effort-500 to-track-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  DarkMode
                    ? "bg-effort-500/15 text-effort-400 group-hover:bg-effort-500/25"
                    : "bg-effort-50 text-effort-600 group-hover:bg-effort-100"
                }`}>
                  {serviceIcons[index % serviceIcons.length]}
                </div>
                <Title size="heading-md" weight="bold" as="h3" align="left" className="mb-3">
                  {items.title}
                </Title>
                <p className={`text-body-sm ${DarkMode ? "text-primary/60" : "text-secondary/60"} leading-relaxed`}>
                  {items.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacto"
        aria-labelledby="contacto-title"
        className={`py-20 sm:py-24 ${DarkMode ? "bg-secondary" : "bg-primary"} transition-colors duration-300`}
      >
        <div className="section-container">
          <div className={`max-w-3xl mx-auto text-center p-10 sm:p-14 rounded-2xl border relative overflow-hidden ${
            DarkMode
              ? "bg-base-100/60 border-base-300/40"
              : "bg-white border-base-200 shadow-card"
          }`}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-effort-500/10 blur-3xl" />
            <div className="relative">
              <Title size="display-sm" weight="bold" as="h2" id="contacto-title" className="mb-4">
                ¿Listo para empezar?
              </Title>
              <p className={`text-body-lg ${DarkMode ? "text-primary/60" : "text-secondary/60"} mb-8 text-balance`}>
                Únete a Effort&Habit y transforma la forma en que gestionas
                el entrenamiento de tus alumnos.
              </p>
              <a
                href="/sign-in"
                className="btn btn-lg rounded-xl bg-effort-600 text-white hover:bg-effort-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-effort-600/25 border-0 font-semibold"
              >
                Crear cuenta gratis
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
