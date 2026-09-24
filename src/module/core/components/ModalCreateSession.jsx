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
    <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg p-8 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg`}>
        <div>
          <Toaster />
        </div>
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={() => setModalCreateSession(false)}
            className={`${DarkMode ? "text-secondary" : "text-primary"} text-2xl hover:opacity-70`}
          >
            <IoMdCloseCircleOutline size={24} />
          </button>
        </div>
        <h1 className={`${DarkMode ? "text-secondary" : "text-primary"} text-center font-bold text-xl leading-normal mb-6`}>
          {isEdit ? 'Editar Sesión' : 'Crear Sesión'}
        </h1>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold`}>Nombre de la sesión</label>
            <input
              type="text"
              placeholder="Ej: Sesión de Fuerza"
              className={
                formik.touched.name_sesion && formik.errors.name_sesion
                  ? 'input input-bordered w-full border-2 border-red-500 placeholder-secondary rounded-lg focus:border-letterPrimary'
                  : 'input input-bordered w-full border-letterPrimary placeholder-secondary rounded-lg focus:border-letterPrimary'
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
            <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold`}>Tipo de ejercicio principal</label>
            <input
              type="text"
              placeholder="Ej: Estructural, Fuerza Max, Compensatorio"
              className={
                formik.touched.type_exercise && formik.errors.type_exercise
                  ? 'input input-bordered w-full border-2 border-red-500 placeholder-secondary rounded-lg focus:border-letterPrimary'
                  : 'input input-bordered w-full border-letterPrimary placeholder-secondary rounded-lg focus:border-letterPrimary'
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

          <div className="border-t border-letterPrimary/30 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-lg`}>Grupos de ejercicios</h2>
              <button
                type="button"
                onClick={addExerciseGroup}
                className="btn btn-sm btn-ghost btn-circle"
                aria-label="Añadir grupo de ejercicios"
              >
                <IoMdAddCircleOutline size={20} />
              </button>
            </div>

            {exerciseGroups.map((group, groupIndex) => (
              <div key={group.id} className="mb-6 p-4 rounded-lg border border-letterPrimary/20 bg-base-100/50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`${DarkMode ? "text-secondary" : "text-primary"} font-medium`}>Grupo {groupIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeExerciseGroup(group.id)}
                    disabled={exerciseGroups.length <= 1}
                    className="btn btn-sm btn-ghost btn-circle opacity-50 hover:opacity-100 disabled:cursor-not-allowed"
                    aria-label="Eliminar grupo"
                  >
                    <IoMdRemoveCircleOutline size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-sm`}>Tipo de ejercicio del grupo</label>
                  <input
                    type="text"
                    placeholder="Ej: O. Vertical, O. Horizontal, Circuito"
                    value={group.type_exercise}
                    onChange={(e) => handleGroupChange(group.id, 'type_exercise', e.target.value)}
                    className="input input-bordered w-full border-letterPrimary placeholder-secondary rounded-lg focus:border-letterPrimary"
                  />
                </div>

                <div className="space-y-2">
                  {group.items_exercise.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 rounded border border-letterPrimary/20">
                      <div className="md:col-span-2 flex flex-col gap-1">
                        <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-sm`}>Ejercicio</label>
                        <input
                          type="text"
                          placeholder="Nombre del ejercicio"
                          value={item.name_exercise}
                          onChange={(e) => handleExerciseChange(group.id, item.id, 'name_exercise', e.target.value)}
                          className="input input-bordered w-full border-letterPrimary placeholder-secondary rounded-lg focus:border-letterPrimary"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-sm`}>Repeticiones</label>
                        <input
                          type="number"
                          min="1"
                          value={item.repetitions}
                          onChange={(e) => handleExerciseChange(group.id, item.id, 'repetitions', Number(e.target.value) || '')}
                          className="input input-bordered w-full border-letterPrimary placeholder-secondary rounded-lg focus:border-letterPrimary"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className={`${DarkMode ? "text-secondary" : "text-primary"} font-semibold text-sm`}>Series</label>
                        <input
                          type="number"
                          min="1"
                          value={item.series}
                          onChange={(e) => handleExerciseChange(group.id, item.id, 'series', Number(e.target.value) || '')}
                          className="input input-bordered w-full border-letterPrimary placeholder-secondary rounded-lg focus:border-letterPrimary"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeExerciseItem(group.id, item.id)}
                          disabled={group.items_exercise.length <= 1}
                          className="btn btn-sm btn-ghost btn-circle opacity-50 hover:opacity-100 disabled:cursor-not-allowed"
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
                    className="btn btn-sm btn-outline btn-ghost w-full justify-start gap-2 mt-2"
                  >
                    <IoMdAddCircleOutline size={18} />
                    Añadir ejercicio
                  </button>
                </div>
              </div>
            ))}

            {formik.touched.exercises && formik.errors.exercises && (
              <p className="text-red-500 text-sm">{formik.errors.exercises}</p>
            )}
          </div>

          <div className="modal-action w-full flex justify-end gap-3 pt-4 border-t border-letterPrimary/30">
            <button
              type="button"
              onClick={() => setModalCreateSession(false)}
              className={`btn flex w-full sm:w-auto p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] ${DarkMode ? "bg-secondary text-white hover:bg-tertiary" : "bg-tertiary text-primary hover:bg-secondary"}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn flex w-full sm:w-auto p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-letterPrimary text-white hover:bg-letterSecondary ${loading ? 'opacity-50 cursor-wait' : ''}`}
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