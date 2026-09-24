import { useFormik } from 'formik'
import { CreateUserScheme, EditUserScheme } from '../../../../schemas'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { ButtonForm } from '../button/ButtonForm';
import { useUiStore } from '../../../../stores';
import showPasswordIcon from '../../../../assets/svg/showPassword.svg';
import hidePasswordIcon from '../../../../assets/svg/hidePassword.svg';

/* eslint-disable react/prop-types */
export const ModalUsers = ({ isOpen, onClose, initialValues, onSubmit, title, teachers = [] }) => {
  const { DarkMode } = useUiStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialValues?.id;

  const validationSchema = isEdit ? EditUserScheme : CreateUserScheme;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'trainer',
      documento: '',
      phone: '',
      address: '',
      status: true,
      assignedTeacherId: undefined,
      ...initialValues,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await onSubmit(values);
        toast.success(isEdit ? '¡Usuario actualizado correctamente!' : '¡Usuario creado correctamente!', {
          duration: 2000,
          position: 'top-center',
        });
        onClose();
      } catch (error) {
        console.error('Error guardando usuario:', error);
        toast.error('Error al guardar el usuario', { duration: 2000, position: 'top-center' });
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <>
      <dialog id="modal_users" className="modal" open>
        <div className={`w-[90%] max-w-96 sm:w-96 inline-flex p-6 flex-col justify-center items-center gap-8 rounded-lg ${DarkMode ? "bg-primary" : "bg-secondary"} shadow-xl`}>
          <div>
            <Toaster />
          </div>
          <h1 className={`${DarkMode ? "text-secondary" : "text-primary"} text-center font-product-sans font-bold text-lg leading-normal`}>
            {title || (isEdit ? 'Editar Usuario' : 'Crear Usuario')}
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full inline-flex flex-col justify-center items-center gap-8"
          >
            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Nombre completo
                </label>
              </div>
              <input
                type="text"
                placeholder="Nombre completo"
                className={
                  formik.touched.name && formik.errors.name
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-secondary rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-seplaceholder-secondary  placeholder-secondary rounded-lg focus:border-primary'
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                name="name"
                autoComplete="name"
              />
              {formik.touched.name && (
                <p id="name-error" className="text-center min-w-3 w-72 text-red-600 text-xs">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Correo
                </label>
              </div>
              <input
                type="email"
                placeholder="Correo"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-secondary rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-seplaceholder-secondary  placeholder-secondary rounded-lg focus:border-primary'
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                name="email"
                autoComplete="email"
              />
              {formik.touched.email && (
                <p id="email-error" className="text-center min-w-3 w-72 text-red-600 text-xs">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {!isEdit && (
              <div className="flex flex-col w-full items-start gap-2">
                <div className="flex px-4 justify-end items-start gap-2">
                  <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                    Contraseña
                  </label>
                </div>
                <label className={
                  formik.touched.password && formik.errors.password
                    ? 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-red-500 rounded-lg focus-within:border-primary'
                    : 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-secondary rounded-lg focus-within:border-primary'
                }>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="grow placeholder-secondary"
                    placeholder="Contraseña"
                    id="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                  />
                  <img
                    src={showPassword ? showPasswordIcon : hidePasswordIcon}
                    alt=""
                    className="h-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </label>
                {formik.touched.password && (
                  <p id="password-error" className="text-center min-w-3 w-72 text-red-600 text-xs">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Rol
                </label>
              </div>
              <select
                className={
                  formik.touched.role && formik.errors.role
                    ? 'select select-bordered w-full mt-1 border-2 border-red-500'
                    : 'select select-bordered w-full mt-1'
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role}
                name="role"
                id="role"
              >
                <option value="trainer">Entrenador</option>
                <option value="teacher">Profesor</option>
                <option value="admin">Administrador</option>
              </select>
              {formik.touched.role && (
                <p className="text-center min-w-3 w-72 text-red-600 text-xs">
                  {formik.errors.role}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Documento
                </label>
              </div>
              <input
                type="text"
                placeholder="Documento"
                className={
                  formik.touched.documento && formik.errors.documento
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-secondary rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-seplaceholder-secondary  placeholder-secondary rounded-lg focus:border-primary'
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.documento}
                id="documento"
                name="documento"
                autoComplete="off"
              />
              {formik.touched.documento && (
                <p className="text-center min-w-3 w-72 text-red-600 text-xs">
                  {formik.errors.documento}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Teléfono
                  </label>
              </div>
              <input
                type="tel"
                placeholder="Teléfono"
                className={
                  formik.touched.phone && formik.errors.phone
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-secondary rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-seplaceholder-secondary  placeholder-secondary rounded-lg focus:border-primary'
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                id="phone"
                name="phone"
                autoComplete="tel"
              />
              {formik.touched.phone && (
                <p className="text-center min-w-3 w-72 text-red-600 text-xs">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Dirección
                </label>
              </div>
              <input
                type="text"
                placeholder="Dirección"
                className={
                  formik.touched.address && formik.errors.address
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-secondary rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-seplaceholder-secondary  placeholder-secondary rounded-lg focus:border-primary'
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
                id="address"
                name="address"
                autoComplete="address-line1"
              />
              {formik.touched.address && (
                <p className="text-center min-w-3 w-72 text-red-600 text-xs">
                  {formik.errors.address}
                </p>
              )}
            </div>

            {isEdit && (
              <div className="flex flex-col w-full items-start gap-2">
                <div className="flex px-4 justify-end items-start gap-2">
                  <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                    Estado
                  </label>
                </div>
                <select
                  className={
                    formik.touched.status && formik.errors.status
                      ? 'select select-bordered w-full mt-1 border-2 border-red-500'
                      : 'select select-bordered w-full mt-1'
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  name="status"
                  id="status"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
                {formik.touched.status && (
                  <p className="text-center min-w-3 w-72 text-red-600 text-xs">
                    {formik.errors.status}
                  </p>
                )}
              </div>
            )}

            {formik.values.role === 'trainer' && (
              <div className="flex flex-col w-full items-start gap-2">
                <div className="flex px-4 justify-end items-start gap-2">
                  <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                    Profesor asignado
                  </label>
                </div>
                <select
                  className={
                    formik.touched.assignedTeacherId && formik.errors.assignedTeacherId
                      ? 'select select-bordered w-full mt-1 border-2 border-red-500'
                      : 'select select-bordered w-full mt-1'
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.assignedTeacherId || ''}
                  name="assignedTeacherId"
                  id="assignedTeacherId"
                >
                  <option value="">Seleccionar profesor</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.email})
                    </option>
                  ))}
                </select>
                {formik.touched.assignedTeacherId && (
                  <p className="text-center min-w-3 w-72 text-red-600 text-xs">
                    {formik.errors.assignedTeacherId}
                  </p>
                )}
              </div>
            )}

            <div className="modal-action w-full">
              <div className="w-full flex justify-center items-center gap-2">
                <ButtonForm
                  type="submit"
                  className='btn flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-primary-700 text-white hover:bg-primary'
                  disabled={loading || !(formik.dirty && formik.isValid)}
                >
                  {loading
                    ? <span className="loading loading-spinner loading-sm"></span>
                    : isEdit ? 'Actualizar' : 'Crear'}
                </ButtonForm>
                <ButtonForm
                  onClick={onClose}
                  className='btn flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-secondary text-white hover:bg-tertiary'
                  type="button"
                >
                  Cancelar
                </ButtonForm>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default ModalUsers;