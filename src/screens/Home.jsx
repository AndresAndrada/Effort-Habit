import { useUiStore } from "../stores";
import { ButtonPrimary } from "../module/core/ui/button/ButtonPrimary";
import { Title } from "../module/core/ui/title/Title";
import homeUtils from "../utils/homeUtils.helpers.json";
import { useEffect } from "react";
import { scrollToTop } from "../utils/scrollToTop";

export default function Home() {
  const { DarkMode } = useUiStore();

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center pb-8 ${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg`}>
      <section className="w-full flex items-center justify-center text-center h-screen">
        <div className="md:flex-1 w-full h-full md:w-1/2 bg-banner overflow-hidden bg-cover bg-[position:center] md:overflow-visible md:bg-none md:bg-[position:unset] md:bg-black flex justify-center items-center px-4 pt-12">
          <div className="md:flex-1 max-w-[40rem] md:max-h-[30rem] h-[85%] flex flex-col justify-center items-center shadow-4xl bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl p-4">
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-stone-300 transition-bg`}>
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
        <div className="hidden md:flex md:flex-1 w-1/2 h-screen relative bg-banner overflow-hidden bg-cover bg-[position:center]">
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
        {homeUtils.map((items) => (
          <div key={items.id} className={`cursor-context-menu ${DarkMode ? "bg-secondary/40 hover:bg-secondary/45" : "bg-tertiary/30 hover:bg-tertiary/45"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center`}>
            <img src="/src/assets/svg/mint.svg" alt="Entrenamiento personalizado" className="w-16 h-16 mb-4" />
            <Title size={"text-2xl"}>{items.title}</Title>
            <p className={`text-center text-stone-300 transition-bg`}>{items.description}</p>
          </div>

        ))}
      </section>
      <section id="contacto" className={`mt-20 w-[90%] max-w-xl cursor-context-menu ${DarkMode ? "bg-secondary/40 hover:bg-secondary/45" : "bg-tertiary/30 hover:bg-tertiary/45"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center`}>
        <Title size={"text-2xl"}>Contáctanos</Title>
        <p className="text-slate-300 transition-bg pb-3">¿Tienes dudas o quieres comenzar? ¡Escríbenos!</p>
        <ButtonPrimary href={"#servicios"}>Enviar correo</ButtonPrimary>
      </section>
    </main>
  )
}