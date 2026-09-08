import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Title } from '../../module/core/ui/title/Title';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores';
import { sessionService, exerciseService, userService } from '../../services';
import { Loader } from '../../module/core/Loader';

export const SessionBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const trainerIdFromQuery = searchParams.get('trainerId');
  const { user, isTeacher } = useAuth();
  const { DarkMode } = useUiStore();

  const [session, setSession] = useState({
    name_sesion: '',
    type_exercise: '',
    exercises: [],
    trainerId: trainerIdFromQuery || '',
    teacherId: user?.id || '',
  });
  const [exercises, setExercises] = useState([]);
  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isTeacher) return;
      setLoading(true);
      try {
        // Fetch exercises and categories
        const [exercisesRes, categoriesRes, trainersRes] = await Promise.all([
          exerciseService.list(),
          exerciseService.getCategories(),
          userService.list({ role: 'trainer' }),
        ]);

        setExercises(exercisesRes.data || []);
        setExerciseCategories(categoriesRes.data || []);

        // Filter trainers assigned to this teacher
        const allTrainers = trainersRes.data?.data || [];
        const assignedTrainers = allTrainers.filter((t) => t.assignedTeacherId === user.id);
        setTrainers(assignedTrainers);

        // If editing, fetch existing session
        if (id) {
          const sessionRes = await sessionService.get(id);
          const sessionData = sessionRes.data;
          setSession({
            name_sesion: sessionData.name_sesion || sessionData.name || '',
            type_exercise: sessionData.type_exercise || '',
            exercises: sessionData.exercises || [],
            trainerId: sessionData.trainerId || '',
            teacherId: sessionData.teacherId || user.id,
          });
          setIsEditing(true);
        }
      } catch (err) {
        setError('Error al cargar datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, isTeacher]);

  const handleInputChange = (field, value) => {
    setSession((prev) => ({ ...prev, [field]: value }));
  };

  const handleExerciseGroupChange = (groupIndex, field, value) => {
    setSession((prev) => {
      const newExercises = [...prev.exercises];
      newExercises[groupIndex] = { ...newExercises[groupIndex], [field]: value };
      return { ...prev, exercises: newExercises };
    });
  };

  const handleExerciseItemChange = (groupIndex, itemIndex, field, value) => {
    setSession((prev) => {
      const newExercises = [...prev.exercises];
      const group = { ...newExercises[groupIndex] };
      const items = group.items_exercise ? [...group.items_exercise] : group.exercises ? [...group.exercises] : [{ ...group }];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      if (group.items_exercise) group.items_exercise = items;
      else if (group.exercises) group.exercises = items;
      else { group.name = value; } // fallback for simple structure
      newExercises[groupIndex] = group;
      return { ...prev, exercises: newExercises };
    });
  };

  const addExerciseGroup = () => {
    setSession((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { type_exercise: '', items_exercise: [] }],
    }));
  };

  const removeExerciseGroup = (groupIndex) => {
    setSession((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== groupIndex),
    }));
  };

  const addExerciseItem = (groupIndex) => {
    setSession((prev) => {
      const newExercises = [...prev.exercises];
      const group = { ...newExercises[groupIndex] };
      const items = group.items_exercise ? [...group.items_exercise] : group.exercises ? [...group.exercises] : [];
      items.push({ name_exercise: '', repetitions: 10, series: 3 });
      if (group.items_exercise) group.items_exercise = items;
      else if (group.exercises) group.exercises = items;
      newExercises[groupIndex] = group;
      return { ...prev, exercises: newExercises };
    });
  };

  const removeExerciseItem = (groupIndex, itemIndex) => {
    setSession((prev) => {
      const newExercises = [...prev.exercises];
      const group = { ...newExercises[groupIndex] };
      const items = group.items_exercise ? [...group.items_exercise] : group.exercises ? [...group.exercises] : [];
      items.splice(itemIndex, 1);
      if (group.items_exercise) group.items_exercise = items;
      else if (group.exercises) group.exercises = items;
      newExercises[groupIndex] = group;
      return { ...prev, exercises: newExercises };
    });
  };

  const getExercisesByCategory = (categoryName) => {
    return exercises.filter((ex) => ex.categoryName === categoryName);
  };

  const handleSave = async () => {
    if (!session.name_sesion.trim()) {
      setError('El nombre de la sesión es obligatorio');
      return;
    }
    if (!session.trainerId) {
      setError('Debes asignar un entrenador');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const payload = {
        name_sesion: session.name_sesion,
        type_exercise: session.type_exercise,
        exercises: session.exercises,
        trainerId: session.trainerId,
        teacherId: session.teacherId,
        status: false,
        active: false,
      };

      if (isEditing && id) {
        await sessionService.update(id, payload);
      } else {
        await sessionService.create(payload);
      }
      navigate('/trainers');
    } catch (err) {
      setError('Error al guardar la sesión');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/trainers');
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
          <button onClick={handleCancel} className="btn btn-ghost btn-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Title className={true}>{isEditing ? 'Editar Sesión' : 'Crear Nueva Sesión'}</Title>
          <div className="w-10" />
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          {/* Basic Info */}
          <div className={`${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl p-6`}>
            <h3 className="text-lg font-semibold text-base-content mb-4">Información básica</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Nombre de la sesión *</span>
                </label>
                <input
                  type="text"
                  value={session.name_sesion}
                  onChange={(e) => handleInputChange('name_sesion', e.target.value)}
                  className="input input-bordered w-full mt-1"
                  placeholder="Ej: Sesión de fuerza tren superior"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Tipo de sesión *</span>
                </label>
                <select
                  value={session.type_exercise}
                  onChange={(e) => handleInputChange('type_exercise', e.target.value)}
                  className="select select-bordered w-full mt-1"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="Estructural">Estructural</option>
                  <option value="Fuerza Max">Fuerza Max</option>
                  <option value="Potencia">Potencia</option>
                  <option value="Resistencia">Resistencia</option>
                  <option value="Compensatorio">Compensatorio</option>
                  <option value="Movilidad">Movilidad</option>
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Entrenador *</span>
                </label>
                <select
                  value={session.trainerId}
                  onChange={(e) => handleInputChange('trainerId', e.target.value)}
                  className="select select-bordered w-full mt-1"
                  required
                >
                  <option value="">Seleccionar entrenador</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} ({trainer.email})
                    </option>
                  ))}
                </select>
                {trainers.length === 0 && (
                  <p className="text-xs text-warning mt-1">No tienes entrenadores asignados</p>
                )}
              </div>
            </div>
          </div>

          {/* Exercise Groups */}
          <div className={`${DarkMode ? 'bg-base-800 border border-base-700' : 'bg-base-100 border border-base-200'} rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-base-content">Ejercicios</h3>
              <button type="button" onClick={addExerciseGroup} className="btn btn-sm btn-outline btn-primary">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Añadir grupo
              </button>
            </div>

            {session.exercises.length === 0 ? (
              <div className="text-center py-8 text-base-content/60">
                <p>No hay grupos de ejercicios. Añade uno para empezar.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {session.exercises.map((group, groupIndex) => (
                  <div key={groupIndex} className={`${DarkMode ? 'bg-base-700/50' : 'bg-base-200/50'} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-base-content">Grupo {groupIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeExerciseGroup(groupIndex)}
                        className="btn btn-ghost btn-sm btn-error"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="label">
                        <span className="label-text">Tipo de ejercicio del grupo</span>
                      </label>
                      <select
                        value={group.type_exercise}
                        onChange={(e) => handleExerciseGroupChange(groupIndex, 'type_exercise', e.target.value)}
                        className="select select-bordered w-full mt-1"
                      >
                        <option value="">Seleccionar categoría</option>
                        {exerciseCategories.map((cat) => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      {(group.items_exercise || group.exercises || []).map((item, itemIndex) => (
                        <div key={itemIndex} className={`flex flex-col sm:flex-row gap-3 p-3 ${DarkMode ? 'bg-base-800/50' : 'bg-base-100/50'} rounded-lg`}>
                          <div className="flex-1">
                            <label className="label">
                              <span className="label-text">Ejercicio</span>
                            </label>
                            <select
                              value={item.name_exercise || item.name || ''}
                              onChange={(e) => handleExerciseItemChange(groupIndex, itemIndex, 'name_exercise', e.target.value)}
                              className="select select-bordered w-full mt-1"
                            >
                              <option value="">Seleccionar ejercicio</option>
                              {group.type_exercise && getExercisesByCategory(group.type_exercise).map((ex) => (
                                <option key={ex.id} value={ex.name_exercise}>{ex.name_exercise}</option>
                              ))}
                            </select>
                          </div>
                          <div className="w-24">
                            <label className="label">
                              <span className="label-text">Series</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={item.series || 3}
                              onChange={(e) => handleExerciseItemChange(groupIndex, itemIndex, 'series', parseInt(e.target.value) || 3)}
                              className="input input-bordered w-full mt-1"
                            />
                          </div>
                          <div className="w-28">
                            <label className="label">
                              <span className="label-text">Repeticiones</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={item.repetitions || 10}
                              onChange={(e) => handleExerciseItemChange(groupIndex, itemIndex, 'repetitions', parseInt(e.target.value) || 10)}
                              className="input input-bordered w-full mt-1"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExerciseItem(groupIndex, itemIndex)}
                            className="btn btn-ghost btn-sm btn-error self-end mt-6"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addExerciseItem(groupIndex)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Añadir ejercicio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={handleCancel} className="btn btn-ghost" disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : isEditing ? 'Actualizar sesión' : 'Crear sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionBuilder;