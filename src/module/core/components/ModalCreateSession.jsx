/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useUiStore } from '../../../stores';
import { CreateSessionScheme } from '../../../schemas';
import { IoMdCloseCircleOutline, IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

export const ModalCreateSession = ({ setModalCreateSession, onSubmit, initialValues, isEdit = false }) => {
  const { DarkMode } = useUiStore();
  const [loading, setLoading] = useState(false);
  const [exerciseGroups, setExerciseGroups] = useState(initialValues?.exercises || [{ id: Date.now(), type_exercise: '', items_exercise: [{ id: Date.now(), name_exercise: '', img_exercise: '', video_exercise: '', repetitions: '', series: '' }] }]);

  const addExerciseGroup = () => {
    setExerciseGroups([...exerciseGroups, { id: Date.now(), type_exercise: '', items_exercise: [{ id: Date.now(), name_exercise: '', img_exercise: '', video_exercise: '', repetitions: '', series: '' }] }]);
  };

  const removeExerciseGroup = (groupId) => {
    if (exerciseGroups.length > 1) {
      setExerciseGroups(exerciseGroups.filter(g => g.id !== groupId));
    }
  };

  const addExerciseItem = (groupId) => {
    setExerciseGroups(exerciseGroups.map(g =>
      g.id === groupId ? { ...g, items_exercise: [...g.items_exercise, { id: Date.now(), name_exercise: '', img_exercise: '', video_exercise: '', repetitions: '', series: '' }] } : g
    ));
  };

  const removeExerciseItem = (groupId, itemId) => {
    setExerciseGroups(exerciseGroups.map(g =>
      g.id === groupId && g.items_exercise.length > 1
        ? { ...g, items_exercise: g.items_exercise.filter(i => i.id !== itemId) }
        : g
    ));
  };

  const handleExerciseChange = (groupId, itemId, field, value) => {
    setExerciseGroups(exerciseGroups.map(g =>
      g.id === groupId ? { ...g, items_exercise: g.items_exercise.map(i => i.id === itemId ? { ...i, [field]: value } : i) } : g
    ));
  };

  const handleGroupChange = (groupId, field, value) => {
    setExerciseGroups(exerciseGroups.map(g => g.id === groupId ? { ...g, [field]: value } : g));
  };

  const formik = useFormik({
    initialValues: {
      name_sesion: initialValues?.name_sesion || '',
      type_exercise: initialValues?.type_exercise || '',
      exercises: exerciseGroups,
    },
    validationSchema: CreateSessionScheme,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setLoading(true);
      try {
        await onSubmit({ ...values, exercises: exerciseGroups });
        resetForm();
        setModalCreateSession(false);
      } catch (error) {
        console.error('Error guardando sesión:', error);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`${DarkMode ? "bg-base-100" : "bg-white"} transition-colors p-6 sm:p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-card-elevated border ${DarkMode ? "border-base-300/40" : "border-base-200"} animate-scale-in`}>
        <div>
          <Toaster />
        </div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-caption font-semibold uppercase tracking-wider text-effort-500 dark:text-effort-400">
              {isEdit ? "Editar" : "Nueva"}
            </span>
            <h1 className={`${DarkMode ? "text-secondary" : "text-primary"} text-heading-lg font-bold leading-normal`}>
              {isEdit ? 'Editar Sesión' : 'Crear Sesión'}
            </h1>
          </div>
          <button
            onClick={() => setModalCreateSession(false)}
            className={`btn btn-sm btn-circle btn-ghost ${DarkMode ? "text-secondary/70 hover:bg-base-200" : "text-primary/70 hover:bg-base-100"}`}
            aria-label="Cerrar modal"
          >
            <IoMdCloseCircleOutline size={24} />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Nombre de la sesión</label>
            <input
              type="text"
              placeholder="Ej: Sesión de Fuerza"
              className={
                formik.touched.name_sesion && formik.errors.name_sesion
                  ? 'input input-bordered w-full border-2 border-red-500 rounded-xl focus:border-red-500'
                  : 'input input-bordered w-full border-base-300 dark:border-base-600 rounded-xl focus:border-effort-500 focus:ring-effort-500/30'
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name_sesion}
              id="name_sesion"
              name="name_sesion"
              autoComplete="off"
            />
            {formik.touched.name_sesion && (
              <p className="text-red-500 text-sm">{formik.errors.name_sesion}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Tipo de ejercicio principal</label>
            <input
              type="text"
              placeholder="Ej: Estructural, Fuerza Max, Compensatorio"
              className={
                formik.touched.type_exercise && formik.errors.type_exercise
                  ? 'input input-bordered w-full border-2 border-red-500 rounded-xl focus:border-red-500'
                  : 'input input-bordered w-full border-base-300 dark:border-base-600 rounded-xl focus:border-effort-500 focus:ring-effort-500/30'
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.type_exercise}
              id="type_exercise"
              name="type_exercise"
              autoComplete="off"
            />
            {formik.touched.type_exercise && (
              <p className="text-red-500 text-sm">{formik.errors.type_exercise}</p>
            )}
          </div>

          <div className="border-t border-base-200 dark:border-base-700 pt-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-heading-sm`}>Grupos de ejercicios</h2>
              <button
                type="button"
                onClick={addExerciseGroup}
                className="btn btn-sm btn-circle btn-ghost text-effort-600 dark:text-effort-400 hover:bg-effort-50 dark:hover:bg-effort-950/30"
                aria-label="Añadir grupo de ejercicios"
              >
                <IoMdAddCircleOutline size={20} />
              </button>
            </div>

            {exerciseGroups.map((group, groupIndex) => (
              <div key={group.id} className="mb-6 p-4 rounded-xl border border-base-200 dark:border-base-700 bg-base-50/50 dark:bg-base-800/40">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-effort-500" aria-hidden="true" />
                    <h3 className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Grupo {groupIndex + 1}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExerciseGroup(group.id)}
                    disabled={exerciseGroups.length <= 1}
                    className="btn btn-sm btn-circle btn-ghost text-red-500/70 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 opacity-50 hover:opacity-100 disabled:cursor-not-allowed"
                    aria-label="Eliminar grupo"
                  >
                    <IoMdRemoveCircleOutline size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Tipo de ejercicio del grupo</label>
                  <input
                    type="text"
                    placeholder="Ej: O. Vertical, O. Horizontal, Circuito"
                    value={group.type_exercise}
                    onChange={(e) => handleGroupChange(group.id, 'type_exercise', e.target.value)}
                    className="input input-bordered w-full border-base-300 dark:border-base-600 rounded-xl focus:border-effort-500 focus:ring-effort-500/30"
                  />
                </div>

                <div className="space-y-2">
                  {group.items_exercise.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 rounded-xl border border-base-200 dark:border-base-700 bg-white/60 dark:bg-base-900/40">
                      <div className="md:col-span-2 flex flex-col gap-1">
                        <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Ejercicio</label>
                        <input
                          type="text"
                          placeholder="Nombre del ejercicio"
                          value={item.name_exercise}
                          onChange={(e) => handleExerciseChange(group.id, item.id, 'name_exercise', e.target.value)}
                          className="input input-bordered w-full border-base-300 dark:border-base-600 rounded-xl focus:border-effort-500 focus:ring-effort-500/30"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Repeticiones</label>
                        <input
                          type="number"
                          min="1"
                          value={item.repetitions}
                          onChange={(e) => handleExerciseChange(group.id, item.id, 'repetitions', Number(e.target.value) || '')}
                          className="input input-bordered w-full border-base-300 dark:border-base-600 rounded-xl focus:border-effort-500 focus:ring-effort-500/30"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-body-sm`}>Series</label>
                        <input
                          type="number"
                          min="1"
                          value={item.series}
                          onChange={(e) => handleExerciseChange(group.id, item.id, 'series', Number(e.target.value) || '')}
                          className="input input-bordered w-full border-base-300 dark:border-base-600 rounded-xl focus:border-effort-500 focus:ring-effort-500/30"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeExerciseItem(group.id, item.id)}
                          disabled={group.items_exercise.length <= 1}
                          className="btn btn-sm btn-circle btn-ghost text-red-500/70 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 opacity-50 hover:opacity-100 disabled:cursor-not-allowed"
                          aria-label="Eliminar ejercicio"
                        >
                          <IoMdRemoveCircleOutline size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addExerciseItem(group.id)}
                    className="btn btn-sm w-full justify-start gap-2 mt-2 border-2 border-dashed border-base-300 dark:border-base-600 rounded-xl bg-transparent text-effort-600 dark:text-effort-400 hover:border-effort-500 hover:bg-effort-50 dark:hover:bg-effort-950/30"
                  >
                    <IoMdAddCircleOutline size={18} />
                    Añadir ejercicio
                  </button>
                </div>
              </div>
            ))}

            {formik.touched.exercises && formik.errors.exercises && (
              <p className="text-red-500 text-body-sm">{formik.errors.exercises}</p>
            )}
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-base-200 dark:border-base-700">
            <button
              type="button"
              onClick={() => setModalCreateSession(false)}
              className={`btn flex-1 sm:flex-none h-11 rounded-xl border-2 bg-transparent font-semibold ${
                DarkMode
                  ? "border-base-600 text-secondary/80 hover:bg-base-200"
                  : "border-base-300 text-primary/70 hover:bg-base-100"
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn flex-1 sm:flex-none h-11 rounded-xl border-0 bg-effort-600 text-white font-semibold hover:bg-effort-700 shadow-lg shadow-effort-600/25 active:scale-[0.98] transition-all ${loading ? 'opacity-50 cursor-wait' : ''}`}
              disabled={loading || !(formik.dirty && formik.isValid)}
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : isEdit ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}