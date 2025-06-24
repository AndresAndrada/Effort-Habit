// import LOGO from '../../../assets/svg/negativo.svg'
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { useUiStore } from '../../../stores'


export default function Footer() {
  const { DarkMode } = useUiStore();

  return (
    <footer>
      <footer className={`footer p-10 ${DarkMode ? "bg-primary" : "bg-secondary"} text-base-content justify-around text-center transition-bg shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.2)]`}>
        <aside>
          <h1 className={`text-[20px] font-normal ${DarkMode ? "text-secondary" : "text-primary"} text-center transition-bg`}>Effort&Habit</h1>
          {/* <img src={LOGO} alt="Logo" className="w-48" /> */}
        </aside>
        <nav className="flex flex-col items-center">
          <h6 className={`text-[20px] font-black ${DarkMode ? "text-secondary" : "text-primary"} text-center transition-bg`}>
            Sobre nosotros
          </h6>
          <p className={`w-52 ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}>
            {' '}
            Somos un grupo de Profesores de Educación Física que nos dedicamos a mejorar la calidad de vida de las personas. Nuestro objetivo es fomentar un estilo de vida saludable y activo a través de la actividad física.
          </p>
        </nav>
        <nav className="flex flex-col items-center">
          <h6 className={`text-[20px] font-black ${DarkMode ? "text-secondary" : "text-primary"} text-center transition-bg`}>
            Mantente Contectado
          </h6>
          <div className="grid gap-4 mt-2">
            <a
              href="https://www.instagram.com/pf._entrenamiento/?hl=es-la"
              className={`flex gap-3 ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}
              target="_blank"
              rel="noreferrer"
            >
              <RiInstagramFill className="text-2xl" /> Instagram
            </a>
            <a
              href="https://twitter.com/?lang=en"
              className={`flex gap-3 ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter className="text-2xl" /> X
            </a>
            <a
              href="mailto:andradaandrespf@gmail.com"
              className={`flex gap-3 ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}
              target="_blank"
              rel="noreferrer"
            >
              <SiGmail className="text-2xl" /> andradaandrespf@gmail.com
            </a>
          </div>
        </nav>
        <nav className="flex flex-col items-center w-44 gap-y-3">
          <h6 className={`text-[20px] font-black ${DarkMode ? "text-secondary" : "text-primary"} transition-bg`}>Contactanos</h6>
          <p className={`${DarkMode ? "text-secondary" : "text-primary"} text-center transition-bg`}>
            Por favor contáctenos si tiene alguna idea o solicitud específica.
          </p>
          <p className="text-secondary">ejemplo@ejemplo.com</p>
        </nav>
      </footer>
      <div className={`text-center ${DarkMode ? "bg-primary text-secondary" : "bg-secondary text-primary"} pb-2 transition-bg`}>
        Copyright © nombre. All Rights Reserved
      </div>
    </footer>
  )
}