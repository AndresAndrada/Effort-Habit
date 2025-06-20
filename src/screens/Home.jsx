import { useUiStore } from "../stores";
import img from "../assets/svg/login.svg";

export default function Home() {
  const { DarkMode } = useUiStore();
  return (
    <main className={`min-h-screen flex flex-col items-center justify-center px-4 mt-12 pb-4 ${DarkMode ? "bg-primary" : "bg-secondary"} pt-8 transition-bg`}>
      <section className={`max-w-2xl w-full text-center space-y-6}`}>
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary-content ${DarkMode ? "text-black" : "text-stone-300"} transition-bg`}>
          ¡Bienvenido a Effort&Habit!
        </h1>
        <p className={`text-lg md:text-xl text-base-content mb-6 ${DarkMode ? "text-slate-600" : "text-stone-500"} transition-bg`}>
          Somos un grupo de Profesores de Educación Física dedicados a mejorar la calidad de vida de las personas. Nuestro objetivo es fomentar un estilo de vida saludable y activo a través de la actividad física.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#servicios" className={`btn btn-outline ${DarkMode ? "bg-secondary" : "bg-tertiary"} btn-lg transition-bg`}>Ver servicios</a>
          <a href="#contacto" className={`btn btn-outline ${DarkMode ? "bg-secondary" : "bg-tertiary"} btn-lg transition-bg`}>Contáctanos</a>
        </div>
      </section>
      <section id="servicios" className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center`}>
          <img src="/src/assets/svg/mint.svg" alt="Entrenamiento personalizado" className="w-16 h-16 mb-4" />
          <h2 className="text-stone-300 transition-bg text-xl font-bold mb-2 text-center">Entrenamiento Personalizado</h2>
          <p className={`text-base-content text-center ${DarkMode ? "text-slate-300" : "text-stone-300"} transition-bg`}>Planes adaptados a tus objetivos y necesidades, guiados por profesionales.</p>
        </div>
        <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center`}>
          <img src="/src/assets/svg/login.svg" alt="Clases grupales" className="w-16 h-16 mb-4" />
          <h2 className="text-stone-300 transition-bg text-xl font-bold mb-2">Clases Grupales</h2>
          <p className="text-stone-300 transition-bg">Motívate y entrena en grupo con actividades dinámicas y divertidas.</p>
        </div>
        <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center`}>
          <img src={img} alt="Asesoramiento nutricional" className="w-16 h-16 mb-4" />
          <h2 className="text-stone-300 transition-bg text-xl font-bold mb-2 text-center">Asesoramiento Nutricional</h2>
          <p className="text-stone-300 transition-bg">Complementa tu entrenamiento con consejos de alimentación saludable.</p>
        </div>
      </section>
      <section id="contacto" className={`mt-20 w-full max-w-xl ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center`}>
        <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
        <p className="text-slate-300 transition-bg pb-3">¿Tienes dudas o quieres comenzar? ¡Escríbenos!</p>
        <a href="#servicios" className={`btn btn-outline ${DarkMode ? " bg-tertiary" : "bg-secondary"} btn-lg transition-bg`}>Enviar correo</a>
      </section>
    </main>
  )
}