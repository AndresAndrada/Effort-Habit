import { useUiStore } from "../stores";
import img from "../assets/svg/login.svg";
import { ButtonPrimary } from "../module/core/ui/button/ButtonPrimary";

export default function Home() {
  const { DarkMode } = useUiStore();
  return (
    <main className={`min-h-screen flex flex-col items-center justify-center pb-8 ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <section className="w-full flex items-center justify-center text-center space-y-6 h-screen">
        <div className="md:flex-1 w-full h-full md:w-1/2 bg-banner overflow-hidden bg-cover bg-[position:center] md:overflow-visible md:bg-none md:bg-[position:unset] md:bg-black flex justify-center items-center px-4 pt-12">
          <div className="md:flex-1 max-w-[40rem] md:max-h-[30rem] h-[85%] flex flex-col justify-center items-center shadow-4xl bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl p-4">
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary-content ${DarkMode ? "text-stone-400" : "text-stone-300"} transition-bg`}>
              ¡Bienvenido a Effort&Habit!
            </h1>
            <p className={`text-base md:text-xl text-base-content mb-6 ${DarkMode ? "text-primary" : "text-primary"} transition-bg`}>
              Somos un grupo de Profesores de Educación Física dedicados a mejorar la calidad de vida de las personas. Nuestro objetivo es fomentar un estilo de vida saludable y activo a través de la actividad física.
            </p>
            <div className="flex gap-2 justify-center">
              <a href="#servicios" className={`btn btn-outline bg-secondary btn-md transition-bg`}>Ver servicios</a>
              <a href="#contacto" className={`btn btn-outline bg-secondary btn-md transition-bg`}>Contáctanos</a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:flex-1 w-1/2 h-full max-h-[48rem] relative bg-banner overflow-hidden bg-cover bg-[position:center]">
          <div
            className="absolute left-0 top-0 h-full w-24 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,2.95), rgba(0,0,0,0.9), rgba(0,0,0,0.7), transparent)",
            }}
          />
        </div>
      </section>
      <section id="servicios" className="mt-16 w-[90%] max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section id="contacto" className={`mt-20 w-[90%] max-w-xl ${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center`}>
        <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
        <p className="text-slate-300 transition-bg pb-3">¿Tienes dudas o quieres comenzar? ¡Escríbenos!</p>
        <ButtonPrimary href={"#servicios"}>Enviar correo</ButtonPrimary>
      </section>
    </main>
  )
}