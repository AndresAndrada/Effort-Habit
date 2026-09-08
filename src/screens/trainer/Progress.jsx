import { useEffect, useState } from 'react';
import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';
import { sessionService } from '../../services';
import { Loader } from '../../module/core/Loader';

const Icons = {
  Sessions: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Completed: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Exercises: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Volume: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Back: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  Check: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Add: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Delete: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ArrowRight: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  User: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

export const Progress = () => {
  const { user, isTrainer } = useAuth();
  const { DarkMode } = useUiStore();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    totalExercises: 0,
    completedExercises: 0,
    totalVolume: 0,
    avgRPE: 0,
    byType: {},
    byWeek: {},
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id || !isTrainer) return;
      setLoading(true);
      try {
        const response = await sessionService.list({ trainerId: user.id });
        const sessionList = response.data || [];
        setSessions(sessionList);
        calculateStats(sessionList);
      } catch (err) {
        setError('Error al cargar el progreso');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [user, isTrainer]);

  const calculateStats = (sessionList) => {
    let total = sessionList.length;
    let completed = 0;
    let pending = 0;
    let inProgress = 0;
    let totalExercises = 0;
    let completedExercises = 0;
    let totalVolume = 0;
    let rpeSum = 0;
    let rpeCount = 0;
    const byType = {};
    const byWeek = {};

    sessionList.forEach((session) => {
      if (session.status === true || session.status === 'completed') {
        completed++;
      } else if (session.active === true) {
        inProgress++;
      } else {
        pending++;
      }

      const type = session.type_exercise || 'Sin tipo';
      byType[type] = (byType[type] || 0) + 1;

      const date = session.completedDate ? new Date(session.completedDate) : session.createdAt ? new Date(session.createdAt) : new Date();
      const weekKey = `${date.getFullYear()}-W${String(Math.ceil(date.getDate() / 7)).padStart(2, '0')}`;
      byWeek[weekKey] = (byWeek[weekKey] || 0) + 1;

      if (session.exercises) {
        session.exercises.forEach((group) => {
          const items = group.items_exercise || group.exercises || [group];
          items.forEach((item) => {
            totalExercises++;
            if (item.completed) {
              completedExercises++;
              if (item.weight && item.repetitions && item.series) {
                totalVolume += item.weight * item.repetitions * item.series;
              }
              if (item.rpe) {
                rpeSum += item.rpe;
                rpeCount++;
              }
            }
          });
        });
      }
    });

    setStats({
      total,
      completed,
      pending,
      inProgress,
      totalExercises,
      completedExercises,
      totalVolume,
      avgRPE: rpeCount > 0 ? (rpeSum / rpeCount).toFixed(1) : 0,
      byType,
      byWeek,
    });
  };

  const getCompletionRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  const getExerciseCompletionRate = () => {
    if (stats.totalExercises === 0) return 0;
    return Math.round((stats.completedExercises / stats.totalExercises) * 100);
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
        <Title className={true} mb-6>Mi Progreso</Title>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Sesiones totales" value={stats.total} icon={Icons.Sessions} color="letterPrimary" DarkMode={DarkMode} />
          <StatCard title="Completadas" value={stats.completed} subtitle={`${getCompletionRate()}% completadas`} icon={Icons.Completed} color="success" DarkMode={DarkMode} />
          <StatCard title="Ejercicios hechos" value={stats.completedExercises} subtitle={`${getExerciseCompletionRate()}% de ${stats.totalExercises}`} icon={Icons.Exercises} color="info" DarkMode={DarkMode} />
          <StatCard title="Volumen total (kg)" value={stats.totalVolume.toLocaleString('es-ES')} subtitle={`RPE medio: ${stats.avgRPE}`} icon={Icons.Volume} color="warning" DarkMode={DarkMode} />
        </div>

        {/* Charts / Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sessions by Type */}
          <div className={`${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl p-6`}>
            <h3 className="text-lg font-semibold text-base-content mb-4">Sesiones por tipo</h3>
            {Object.keys(stats.byType).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(stats.byType)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-letterPrimary" />
                        <span className="text-base-content">{type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-base-200 dark:bg-base-700 rounded-full overflow-hidden">
                          <div className="h-full bg-letterPrimary" style={{ width: `${(count / stats.total) * 100}%` }} />
                        </div>
                        <span className="text-sm font-mono text-base-content/70 w-12 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-base-content/60 text-center py-8">No hay datos de tipos de sesión</p>
            )}
          </div>

          {/* Weekly Activity */}
          <div className={`${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl p-6`}>
            <h3 className="text-lg font-semibold text-base-content mb-4">Actividad semanal</h3>
            {Object.keys(stats.byWeek).length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(stats.byWeek)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .slice(0, 8)
                  .map(([week, count]) => (
                    <div key={week} className="flex items-center justify-between">
                      <span className="text-sm text-base-content/70 font-mono">{week}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-base-200 dark:bg-base-700 rounded-full overflow-hidden">
                          <div className="h-full bg-letterPrimary" style={{ width: `${(count / Math.max(...Object.values(stats.byWeek))) * 100}%` }} />
                        </div>
                        <span className="text-sm font-mono text-base-content/70 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-base-content/60 text-center py-8">No hay actividad reciente</p>
            )}
          </div>

          {/* Recent Sessions */}
          <div className="lg:col-span-2 ${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl p-6">
            <h3 className="text-lg font-semibold text-base-content mb-4">Sesiones recientes</h3>
            {sessions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className={`${DarkMode ? 'bg-base-700/50' : 'bg-base-200/50'}`}>
                      <th>Sesión</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Ejercicios</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions
                      .sort((a, b) => new Date(b.createdAt || b.completedDate || 0) - new Date(a.createdAt || a.completedDate || 0))
                      .slice(0, 10)
                      .map((session) => (
                        <tr key={session.id} className={`${DarkMode ? 'hover:bg-base-700/50' : 'hover:bg-base-200/50'}`}>
                          <td className="font-medium text-base-content">{session.name_sesion || session.name || 'Sin nombre'}</td>
                          <td className="text-base-content/70">{session.type_exercise || '—'}</td>
                          <td>
                            <span className={`badge ${
                              session.status ? 'badge-success' :
                              session.active ? 'badge-info' :
                              'badge-warning'
                            }`}>
                              {session.status ? 'Completada' : session.active ? 'En curso' : 'Pendiente'}
                            </span>
                          </td>
                          <td className="text-base-content/70">
                            {session.exercises?.reduce((sum, g) => sum + (g.items_exercise?.length || g.exercises?.length || 1), 0) || 0}
                          </td>
                          <td className="text-base-content/70 text-sm">
                            {(session.completedDate || session.createdAt || session.updatedAt) ?
                              new Date(session.completedDate || session.createdAt || session.updatedAt).toLocaleDateString('es-ES') :
                              '—'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-base-content/60 text-center py-8">No hay sesiones registradas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function StatCard({ title, value, subtitle, icon, color, DarkMode }) {
  const colorClasses = {
    letterPrimary: 'text-letterPrimary',
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-amber-500',
  };
  return (
    <div className={`p-4 rounded-xl ${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-base-content/60">{title}</p>
          <p className="text-2xl font-bold text-base-content mt-1">{value}</p>
          {subtitle && <p className="text-xs text-base-content/50 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color]} ${DarkMode ? 'bg-base-700/50' : 'bg-base-200/50'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Progress;