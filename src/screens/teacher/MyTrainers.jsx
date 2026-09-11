import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';
import { userService } from '../../services';
import { Loader } from '../../module/core/Loader';
import { GoBackLink } from '../../module/core/ui/GoBackLink';

export const MyTrainers = () => {
  const navigate = useNavigate();
  const { user, isTeacher } = useAuth();
  const { DarkMode } = useUiStore();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      if (!user?.id || !isTeacher) return;
      setLoading(true);
      try {
        // Get all users, then filter for trainers assigned to this teacher
        const response = await userService.list({ role: 'trainer' });
        const allTrainers = response.data?.data || [];
        // Filter trainers assigned to this teacher (in a real app, this would be a backend query)
        const assignedTrainers = allTrainers.filter((t) => t.assignedTeacherId === user.id);
        setTrainers(assignedTrainers);
      } catch (err) {
        setError('Error al cargar los entrenadores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [user, isTeacher]);

  const handleNavigate = (trainerId) => {
    navigate(`/trainer/${trainerId}/sessions`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <Loader className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-24 ${DarkMode ? 'bg-primary' : 'bg-secondary'}`}>
        <GoBackLink />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Title className={true}>Mis Entrenadores</Title>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {trainers.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 p-4 rounded-full bg-base-200 w-16 h-16 flex items-center justify-center">
              <svg className="w-8 h-8 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <Title size="text-xl">No tienes entrenadores asignados</Title>
            <p className="text-base-content/60 mt-2">Los entrenadores aparecerán aquí cuando se les asigne</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl gap-4 ${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => handleNavigate(trainer.id)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-letterPrimary/20 flex items-center justify-center flex-shrink-0">
                    {trainer.avatar ? (
                      <img src={trainer.avatar} alt={trainer.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <svg className="w-6 h-6 text-letterPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base-content truncate">{trainer.name}</h3>
                    <p className="text-sm text-base-content/60 truncate">{trainer.email}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-base-content/50">
                      <span className="badge badge-ghost badge-xs">{trainer.role}</span>
                      {trainer.documento && <span>· DNI: {trainer.documento}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-4">
                  <span className="text-sm text-base-content/50">Ver sesiones</span>
                  <svg className="w-5 h-5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrainers;