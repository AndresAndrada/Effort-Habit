import { useEffect } from "react";
import { Acordion } from "../module/core/ui/Acordion";
import { CardUser } from "../module/core/ui/cards/CardUser";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores";
import { user } from "../utils/usersUtils.helpers";
import { scrollToTop } from "../utils/scrollToTop";

export default function DetailUserAdmin() {
  const { DarkMode } = useUiStore();

  useEffect(() => {
    scrollToTop({ smooth: true });
  }, []);

  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} min-h-screen flex flex-col md:flex-row justify-start items-center md:items-start transition-bg px-4 pt-24 pb-8 w-full`}>
      <div className="w-full flex justify-center md:hidden">
        <Title className={true}>Perfil User</Title>
      </div>
      <div className={"flex flex-col justify-start max-w-[25rem] w-full h-auto  gap-4 mb-8"}>
        {/* Contenido principal: datos del usuario */}
        <CardUser user={user} />
        <Acordion>
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold text-primary">Detalles del usuario</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <p className="text-white"><span className="font-semibold">F. de Nac.:</span> {user?.birthDate || 'No especificada'}</p>
              <p className="text-white"><span className="font-semibold">Edad:</span> {user?.age || 'No especificada'}</p>
              <p className="text-white"><span className="font-semibold">Peso:</span> {user?.weight ? user.weight + ' kg' : 'No especificado'}</p>
              <p className="text-white"><span className="font-semibold">Altura:</span> {user?.height ? user.height + ' cm' : 'No especificada'}</p>
              <p className="text-white"><span className="font-semibold">Profesión:</span> {user?.profession || 'No especificada'}</p>
              <p className="text-white"><span className="font-semibold">Entrenamientos:</span> {user.trainingDays.length > 0 ? user?.trainingDays?.map((items, index) => <p key={index} className="px-2">{items}</p>) : 'No especificados'}</p>
              <p className="text-white"><span className="font-semibold">Horario:</span> {user?.trainingHours || 'No especificado'}</p>
              <p className="text-white"><span className="font-semibold">Deporte:</span> {user.sport.length > 0 ? user?.sport?.map((items, index) => <p key={index} className="px-2">{items}</p>) : 'No especificados'}</p>
              <p className="text-white"><span className="font-semibold">Objetivo:</span> {user?.goal || 'No especificado'}</p>
              <p className="text-white"><span className="font-semibold">Lesiones:</span> {user?.injuries || 'No especificadas'}</p>
              <p className="text-white"><span className="font-semibold">Patologias:</span> {user?.medicalConditions || 'No especificadas'}</p>
              <p className="text-white"><span className="font-semibold">Experiencia dep.:</span> {user?.experience || 'No especificada'}</p>
              <p className="text-white"><span className="font-semibold">Motivación:</span> {user?.motivation || 'No especificada'}</p>
            </div>
          </div>
        </Acordion>
      </div>
      <div className="w-full md:mx-4">
        <div className="w-full hidden md:flex text-left">
          <Title className={true}>Perfil User</Title>
        </div>
        <Acordion>
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold text-primary">Sesiones</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <p className="text-base-content">Aquí puedes agregar, modificar o eliminar sesiones de entrenamiento.</p>
            {/* Aquí podrías agregar más opciones o enlaces relacionados con las sesiones */}
          </div>
        </Acordion>
      </div>
    </div>
  );
}
