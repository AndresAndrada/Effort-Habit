import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';
import { sessionService } from '../../services';
import { Loader } from '../../module/core/Loader';

export const SessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { DarkMode } = useUiStore();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [exerciseLogs, setExerciseLogs] = useState({});

  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await sessionService.get(id);
        setSession(response.data);
        // Initialize exercise logs with default values
        if (response.data?.exercises) {
          const logs = {};
          response.data.exercises.forEach((exGroup, groupIndex) => {
            const items = exGroup.items_exercise || exGroup.exercises || [exGroup];
            items.forEach((item, itemIndex) => {
              const key = `${groupIndex}-${itemIndex}`;
              logs[key] = {
                completed: false,
                repetitions: item.repetitions || 0,
                series: item.series || 0,
                weight: 0,
                rpe: 0,
                notes: '',
              };
            });
          });
          setExerciseLogs(logs);
        }
      } catch (err) {
        setError('Sesión no encontrada');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  const handleLogChange = (key, field, value) => {
    setExerciseLogs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleComplete = async () => {
    if (!session || !user) return;
    setCompleting(true);
    try {
      // Flatten exercise logs for the API
      const logs = Object.entries(exerciseLogs).map(([key, log]) => {
        const [groupIndex, itemIndex] = key.split('-').map(Number);
        const exGroup = session.exercises[groupIndex];
        const items = exGroup.items_exercise || exGroup.exercises || [exGroup];
        const item = items[itemIndex];
        return {
          exerciseId: item.id,
          exerciseName: item.name_exercise || item.name,
          ...log,
        };
      }).filter((log) => log.completed);

      await sessionService.complete(session.id, logs);
      navigate('/my-sessions');
    } catch (err) {
      setError('Error al completar la sesión');
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  const handleBack = () => {
    navigate('/my-sessions');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <div className="text-center p-8">
          <Title size="text-xl">Sesión no encontrada</Title>
          <button onClick={handleBack} className="btn btn-primary mt-4">Volver</button>
        </div>
      </div>
    );
  }

  const isCompleted = session.status === true || session.status === 'completed';
  const isActive = session.active === true;

  const getExerciseGroups = () => {
    if (!session.exercises) return [];
    return session.exercises.map((group, groupIndex) => {
      const items = group.items_exercise || group.exercises || [group];
      return {
        groupName: group.type_exercise || group.name || `Grupo ${groupIndex + 1}`,
        items: items.map((item, itemIndex) => ({
          ...item,
          groupIndex,
          itemIndex,
          logKey: `${groupIndex}-${itemIndex}`,
        })),
      };
    });
  };

  const exerciseGroups = getExerciseGroups();
  const totalExercises = exerciseGroups.reduce((sum, g) => sum + g.items.length, 0);
  const completedExercises = Object.values(exerciseLogs).filter((log) => log.completed).length;

  return (
    <div className={`min-h-screen p-8 ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="btn btn-ghost btn-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Title className={true}>{session.name_sesion || session.name || 'Detalle de Sesión'}</Title>
          <div className="w-10" />
        </div>

        {/* Session Header */}
        <div className={`mb-6 p-4 rounded-xl ${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-base-content/50 uppercase tracking-wide">Tipo</p>
              <p className="font-medium text-base-content">{session.type_exercise || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-xs text-base-content/50 uppercase tracking-wide">Estado</p>
              <span className={`badge ${isCompleted ? 'badge-success' : isActive ? 'badge-info' : 'badge-warning'}`}>
                {isCompleted ? 'Completada' : isActive ? 'En curso' : 'Pendiente'}
              </span>
            </div>
            <div>
              <p className="text-xs text-base-content/50 uppercase tracking-wide">Progreso</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-base-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-letterPrimary transition-all"
                    style={{ width: totalExercises > 0 ? `${(completedExercises / totalExercises) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-sm font-mono text-base-content/70">{completedExercises}/{totalExercises}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Exercise Groups */}
        <div className="space-y-6">
          {exerciseGroups.map((group) => (
            <div key={group.groupName} className={`${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl overflow-hidden`}>
              <div className={`px-4 py-3 border-b ${DarkMode ? 'border-base-700' : 'border-base-200'} ${DarkMode ? 'bg-base-700/50' : 'bg-base-200/50'}`}>
                <h4 className="font-semibold text-base-content">{group.groupName}</h4>
              </div>
              <div className="divide-y divide-base-200 dark:divide-base-700">
                {group.items.map((item) => {
                  const log = exerciseLogs[item.logKey] || { completed: false, repetitions: 0, series: 0, weight: 0, rpe: 0, notes: '' };
                  return (
                    <div key={`${item.groupIndex}-${item.itemIndex}`} className="p-4 hover:bg-base-50 dark:hover:bg-base-700/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={log.completed}
                          onChange={(e) => handleLogChange(item.logKey, 'completed', e.target.checked)}
                          className="checkbox checkbox-primary mt-1 flex-shrink-0"
                          disabled={isCompleted}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-base-content truncate pr-2">
                              {item.name_exercise || item.name || 'Ejercicio'}
                            </h5>
                            {log.completed && (
                              <span className="badge badge-success badge-sm">Completado</span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-base-content/70 mb-3">
                            <div>
                              <span className="text-xs uppercase tracking-wide">Series</span>
                              <input
                                type="number"
                                value={log.series || item.series || 0}
                                onChange={(e) => handleLogChange(item.logKey, 'series', parseInt(e.target.value) || 0)}
                                className="input input-sm w-full mt-1"
                                disabled={isCompleted || !log.completed}
                              />
                            </div>
                            <div>
                              <span className="text-xs uppercase tracking-wide">Repeticiones</span>
                              <input
                                type="number"
                                value={log.repetitions || item.repetitions || 0}
                                onChange={(e) => handleLogChange(item.logKey, 'repetitions', parseInt(e.target.value) || 0)}
                                className="input input-sm w-full mt-1"
                                disabled={isCompleted || !log.completed}
                              />
                            </div>
                            <div>
                              <span className="text-xs uppercase tracking-wide">Peso (kg)</span>
                              <input
                                type="number"
                                step="0.5"
                                value={log.weight}
                                onChange={(e) => handleLogChange(item.logKey, 'weight', parseFloat(e.target.value) || 0)}
                                className="input input-sm w-full mt-1"
                                disabled={isCompleted || !log.completed}
                              />
                            </div>
                            <div>
                              <span className="text-xs uppercase tracking-wide">RPE (1-10)</span>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={log.rpe}
                                onChange={(e) => handleLogChange(item.logKey, 'rpe', Math.min(10, Math.max(1, parseInt(e.target.value) || 0)))}
                                className="input input-sm w-full mt-1"
                                disabled={isCompleted || !log.completed}
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <label className="label text-xs">
                              <span className="label-text">Notas</span>
                            </label>
                            <textarea
                              value={log.notes}
                              onChange={(e) => handleLogChange(item.logKey, 'notes', e.target.value)}
                              className="textarea textarea-sm w-full"
                              placeholder="Observaciones sobre el ejercicio..."
                              disabled={isCompleted || !log.completed}
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {exerciseGroups.length === 0 && (
            <div className={`text-center py-12 ${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl`}>
              <p className="text-base-content/60">Esta sesión no tiene ejercicios definidos</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isCompleted && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <button onClick={handleBack} className="btn btn-ghost" disabled={completing}>
              Volver
            </button>
            {isActive && (
              <button
                onClick={handleComplete}
                className="btn btn-primary"
                disabled={completing || completedExercises === 0}
              >
                {completing ? 'Completando...' : `Completar sesión (${completedExercises}/${totalExercises})`}
              </button>
            )}
            {!isActive && (
              <button
                onClick={handleComplete}
                className="btn btn-success"
                disabled={completing || completedExercises === 0}
              >
                {completing ? 'Iniciando y completando...' : `Iniciar y completar (${completedExercises}/${totalExercises})`}
              </button>
            )}
          </div>
        )}

        {isCompleted && (
          <div className="mt-6 p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-800 dark:text-green-200">
                Sesión completada el {session.completedDate ? new Date(session.completedDate).toLocaleString('es-ES') : 'fecha desconocida'}
              </span>
            </div>
            <button onClick={handleBack} className="btn btn-ghost btn-sm mt-3">Volver a mis sesiones</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionDetail;