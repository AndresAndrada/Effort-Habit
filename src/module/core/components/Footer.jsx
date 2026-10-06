import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { useUiStore } from '../../../stores'

export default function Footer() {
  const { DarkMode } = useUiStore();

  return (
    <footer className={`mt-auto ${DarkMode ? "bg-secondary" : "bg-primary"} transition-colors duration-300`}>
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-effort-600 text-white font-extrabold text-base">
                E
              </span>
              <span className={`text-heading-sm font-bold tracking-tight ${DarkMode ? 'text-primary' : 'text-secondary'}`}>
                Effort<span className="text-effort-500">&</span>Habit
              </span>
            </div>
            <p className={`text-body-sm ${DarkMode ? 'text-primary/70' : 'text-secondary/70'} leading-relaxed max-w-xs`}>
              Gestión de entrenamiento para profesores de Educación Física. Diseñado para mejorar la calidad de vida a través de la actividad física.
            </p>
          </div>

          {/* Sobre nosotros */}
          <nav aria-label="Sobre nosotros">
            <h3 className={`text-heading-sm font-semibold mb-4 ${DarkMode ? 'text-primary' : 'text-secondary'}`}>
              Sobre nosotros
            </h3>
            <p className={`text-body-sm ${DarkMode ? 'text-primary/70' : 'text-secondary/70'} leading-relaxed`}>
              Somos un grupo de Profesores de Educación Física dedicados a mejorar la calidad de vida de las personas.
            </p>
          </nav>

          {/* Enlaces */}
          <nav aria-label="Enlaces rápidos">
            <h3 className={`text-heading-sm font-semibold mb-4 ${DarkMode ? 'text-primary' : 'text-secondary'}`}>
              Enlaces
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Panel de control', to: '/dashboard' },
                { label: 'Ejercicios', to: '/ejercicios' },
                { label: 'Inicio de sesión', to: '/sign-in' },
              ].map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className={`text-body-sm ${DarkMode ? 'text-primary/70 hover:text-effort-400' : 'text-secondary/70 hover:text-effort-600'} transition-colors duration-200`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <nav aria-label="Contacto">
            <h3 className={`text-heading-sm font-semibold mb-4 ${DarkMode ? 'text-primary' : 'text-secondary'}`}>
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/pf._entrenamiento/?hl=es-la"
                className={`flex items-center gap-3 text-body-sm ${DarkMode ? 'text-primary/70 hover:text-effort-400' : 'text-secondary/70 hover:text-effort-600'} transition-colors duration-200`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-effort-50 dark:bg-effort-950/40 text-effort-500">
                  <RiInstagramFill className="text-lg" />
                </span>
                Instagram
              </a>
              <a
                href="https://twitter.com/?lang=en"
                className={`flex items-center gap-3 text-body-sm ${DarkMode ? 'text-primary/70 hover:text-effort-400' : 'text-secondary/70 hover:text-effort-600'} transition-colors duration-200`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-base-100 dark:bg-base-800 text-base-700 dark:text-base-300">
                  <FaXTwitter className="text-lg" />
                </span>
                X / Twitter
              </a>
              <a
                href="mailto:andradaandrespf@gmail.com"
                className={`flex items-center gap-3 text-body-sm ${DarkMode ? 'text-primary/70 hover:text-effort-400' : 'text-secondary/70 hover:text-effort-600'} transition-colors duration-200`}
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-track-50 dark:bg-track-950/40 text-track-500">
                  <SiGmail className="text-lg" />
                </span>
                Email
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${DarkMode ? 'border-primary/10' : 'border-secondary/10'}`}>
        <div className="section-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`text-caption ${DarkMode ? 'text-primary/50' : 'text-secondary/50'}`}>
            © {new Date().getFullYear()} Effort&Habit. Todos los derechos reservados.
          </p>
          <p className={`text-caption ${DarkMode ? 'text-primary/50' : 'text-secondary/50'}`}>
            Hecho con esfuerzo por profesores de Educación Física
          </p>
        </div>
      </div>
    </footer>
  )
}
