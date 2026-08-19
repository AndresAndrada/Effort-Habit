import { useUiStore } from "../../../stores";
import { ButtonPrimary } from "../../core/ui/button/ButtonPrimary";
import { Title } from "../../core/ui/title/Title";
import homeUtils from "../../../utils/homeUtils.helpers.json";

export default function Sections() {
  const { DarkMode } = useUiStore();

  return (
    <>
      <section id="servicios" className="mt-16 w-[90%] max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {homeUtils.map((items) => (
          <div key={items.id} className={`cursor-context-menu ${DarkMode ? "" : "bg-tertiary/30 hover:bg-tertiary/45"} transition-bg rounded-xl p-6 shadow-4xl flex flex-col items-center`}>
            <img src="/src/assets/svg/mint.svg" alt="Entrenamiento personalizado" className="w-16 h-16 mb-4" />
            <Title size="text-2xl">{items.title}</Title>
            <p className={`text-center text-stone-500 transition-bg`}>{items.description}</p>
          </div>

        ))}
      </section>
      <section id="contacto" className={`mt-20 w-[90%] max-w-xl cursor-context-menu ${DarkMode ? "" : "bg-tertiary/30 hover:bg-tertiary/45"} transition-bg rounded-xl p-8 shadow-4xl flex flex-col items-center`}>
        <Title size={"text-2xl"}>Contáctanos</Title>
        <p className="text-stone-500 transition-bg pb-3">¿Tienes dudas o quieres comenzar? ¡Escríbenos!</p>
        <ButtonPrimary href={"#servicios"}>Enviar correo</ButtonPrimary>
      </section>
    </>
  )
}