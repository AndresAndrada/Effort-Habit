import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';
import { sessionService, userService } from '../../services';
import { Loader } from '../../module/core/Loader';

export const TrainerSessions = () => {
  const navigate = useNavigate();
  const { trainerId } = useParams();
  const { isTeacher } = useAuth();
  const { DarkMode } = useUiStore();
  const [sessions, setSessions] = useState([]);
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!trainerId || !isTeacher) return;
      setLoading(true);
      try {
        // Fetch trainer info
        const trainerResponse = await userService.get(trainerId);
        setTrainer(trainerResponse.data);

        // Fetch sessions for this trainer
        const sessionsResponse = await sessionService.list({ trainerId });
        setSessions(sessionsResponse.data || []);
      } catch (err) {
        setError('Error al cargar las sesiones del entrenador');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [trainerId, isTeacher]);

  const handleNavigate = (sessionId) => {
    navigate(`/sessions/${sessionId}`);
  };

  const handleCreateSession = () => {
    navigate(`/sessions/create?trainerId=${trainerId}`);
  };

  const getStatusLabel = (session) => {
    if (session.active) return { label: 'En curso', className: 'badge badge-info' };
    if (session.status) return { label: 'Completada', className: 'badge badge-success' };
    return { label: 'Pendiente', className: 'badge badge-warning' };
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/trainers')} className="btn btn-ghost btn-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <Title className={true}>Sesiones de {trainer?.name || 'Entrenador'}</Title>
              <p className="text-sm text-base-content/60">{trainer?.email || ''}</p>
            </div>
          </div>
          <button onClick={handleCreateSession} className="btn btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva sesión
          </button>
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
            <Title size="text-xl">No hay sesiones para este entrenador</Title>
            <p className="text-base-content/60 mt-2">Crea una nueva sesión para empezar</p>
            <button onClick={handleCreateSession} className="btn btn-primary mt-4">
              Crear primera sesión
            </button>
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
                    <p className="text-sm text-base-content/60">
                      Tipo: {session.type_exercise || 'No especificado'} · {session.exercises?.length || 0} ejercicios
                    </p>
                    <p className="text-xs text-base-content/50 mt-1">
                      {session.createdAt ? `Creada: ${new Date(session.createdAt).toLocaleDateString('es-ES')}` : ''}
                      {session.completedDate ? ` · Completada: ${new Date(session.completedDate).toLocaleDateString('es-ES')}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-4">
                    {session.active && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNavigate(session.id); }}
                        className="btn btn-primary btn-sm"
                      >
                        Ver en vivo
                      </button>
                    )}
                    {!session.active && !session.status && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNavigate(session.id); }}
                        className="btn btn-outline btn-sm"
                      >
                        Editar
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

export default TrainerSessions;