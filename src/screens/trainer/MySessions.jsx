import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';
import { sessionService } from '../../services';
import { Loader } from '../../module/core/Loader';

export const MySessions = () => {
  const navigate = useNavigate();
  const { user, isTrainer } = useAuth();
  const { DarkMode } = useUiStore();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user?.id || !isTrainer) return;
      setLoading(true);
      try {
        const response = await sessionService.list({ trainerId: user.id });
        setSessions(response.data || []);
      } catch (err) {
        setError('Error al cargar las sesiones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [user, isTrainer]);

  const handleNavigate = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  const getStatusLabel = (session) => {
    if (session.active) return { label: 'En curso', className: 'badge badge-info' };
    if (session.status) return { label: 'Completada', className: 'badge badge-success' };
    return { label: 'Pendiente', className: 'badge badge-warning' };
  };

  const getStatusDescription = (session) => {
    if (session.active) return 'Sesión en progreso';
    if (session.status) return `Completada el ${session.completedDate ? new Date(session.completedDate).toLocaleDateString('es-ES') : 'fecha desconocida'}`;
    return 'Pendiente de iniciar';
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Title className={true}>Mis Sesiones</Title>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 p-4 rounded-full bg-base-200 w-16 h-16 flex items-center justify-center">
              <svg className="w-8 h-8 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <Title size="text-xl">No tienes sesiones asignadas</Title>
            <p className="text-base-content/60 mt-2">Tu profesor te asignará sesiones pronto</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => {
              const status = getStatusLabel(session);
              return (
                <div
                  key={session.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl gap-4 ${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex-1 min-w-0" onClick={() => handleNavigate(session.id)} style={{ cursor: 'pointer' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-base-content truncate">{session.name_sesion || session.name || 'Sesión sin nombre'}</h3>
                      <span className={status.className}>{status.label}</span>
                    </div>
                    <p className="text-sm text-base-content/60">{getStatusDescription(session)}</p>
                    <p className="text-xs text-base-content/50 mt-1">
                      Tipo: {session.type_exercise || 'No especificado'} · {session.exercises?.length || 0} ejercicios
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-4">
                    {session.active && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNavigate(session.id); }}
                        className="btn btn-primary btn-sm"
                      >
                        Continuar
                      </button>
                    )}
                    {!session.active && !session.status && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNavigate(session.id); }}
                        className="btn btn-outline btn-sm"
                      >
                        Ver detalles
                      </button>
                    )}
                    {session.status && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNavigate(session.id); }}
                        className="btn btn-ghost btn-sm"
                      >
                        Ver resultado
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessions;