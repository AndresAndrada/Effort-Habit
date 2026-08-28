import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';

export const SessionBuilder = () => {
  const { user, role } = useAuth();
  const { DarkMode } = useUiStore();

  return (
    <div className={`min-h-screen p-8 ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
      <Title className={true}>Crear / Editar Sesión</Title>
      <div className="mt-6 p-6 rounded-xl bg-base-200">
        <p>Próximamente: Constructor de sesiones para {user?.name} ({role})</p>
        <p className="text-sm text-base-content/60 mt-2">Esta pantalla se implementará en la Fase 4</p>
      </div>
    </div>
  );
};

export default SessionBuilder;