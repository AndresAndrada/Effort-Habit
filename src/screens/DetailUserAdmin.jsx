import { Acordion } from "../module/core/ui/Acordion";
import { CardUser } from "../module/core/ui/cards/CardUser";
import { Title } from "../module/core/ui/title/Title";
import { useUiStore } from "../stores";
import { user } from "../utils/usersUtils.helpers";

export default function DetailUserAdmin() {
  const { DarkMode } = useUiStore();

  return (
    <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} min-h-screen flex justify-start transition-bg px-4 pt-24 w-full`}>
      <div className={"flex flex-col max-w-[25rem] w-full h-auto justify-start gap-4 mb-8"}>
        {/* Contenido principal: datos del usuario */}
        <CardUser user={user} />
        <Acordion>
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold text-primary">Detalles del usuario</div>
          <div className="collapse-content text-sm flex flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <p className="text-base-content"><span className="font-semibold">Fecha de nacimiento:</span> {user?.birthDate || 'No especificada'}</p>
              <p className="text-base-content"><span className="font-semibold">Edad:</span> {user?.age || 'No especificada'}</p>
              <p className="text-base-content"><span className="font-semibold">Peso:</span> {user?.weight ? user.weight + ' kg' : 'No especificado'}</p>
              <p className="text-base-content"><span className="font-semibold">Altura:</span> {user?.height ? user.height + ' cm' : 'No especificada'}</p>
              <p className="text-base-content"><span className="font-semibold">Profesión:</span> {user?.profession || 'No especificada'}</p>
              <p className="text-base-content"><span className="font-semibold">Días de entrenamiento:</span> {user?.trainingDays || 'No especificados'}</p>
              <p className="text-base-content"><span className="font-semibold">Horario de entrenamiento:</span> {user?.trainingHours || 'No especificado'}</p>
              <p className="text-base-content"><span className="font-semibold">Deporte principal:</span> {user?.sport || 'No especificado'}</p>
              <p className="text-base-content"><span className="font-semibold">Objetivo:</span> {user?.goal || 'No especificado'}</p>
              <p className="text-base-content"><span className="font-semibold">Lesiones previas:</span> {user?.injuries || 'No especificadas'}</p>
              <p className="text-base-content"><span className="font-semibold">Condiciones médicas:</span> {user?.medicalConditions || 'No especificadas'}</p>
              <p className="text-base-content"><span className="font-semibold">Experiencia deportiva:</span> {user?.experience || 'No especificada'}</p>
              <p className="text-base-content"><span className="font-semibold">Motivación:</span> {user?.motivation || 'No especificada'}</p>
            </div>
          </div>
        </Acordion>
      </div>
      <div className="w-full mx-4">
        <div className="w-full flex text-left">
          <Title>Perfil User</Title>
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
