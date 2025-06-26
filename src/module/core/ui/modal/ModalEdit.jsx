import { useFormik } from 'formik'
import { EditUser } from '../../../../schemas'
import toast, { Toaster } from 'react-hot-toast';
import showPasswordIcon from '../../../../assets/svg/showPassword.svg'
import hidePasswordIcon from '../../../../assets/svg/hidePassword.svg'
import { useState } from 'react';
import { ButtonForm } from '../button/ButtonForm';
import { useUiStore } from '../../../../stores';

export const ModalEdit = () => {
  const { DarkMode } = useUiStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: EditUser,
    onSubmit: async (values, { resetForm }) => {
      console.log("🚀 ~ ModalEdit ~ loading:", loading)
      setLoading(true);
      console.log(JSON.stringify(values), 'VALUES')
      resetForm()
      toast.success('¡Usuario editado correctamente!', {
        duration: 2000,
        position: 'top-center',
      })
      setLoading(false);
    },
  })
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className={`w-[90%] max-w-96 sm:w-96 inline-flex p-6 flex-col justify-center items-center gap-8 rounded-lg ${DarkMode ? "bg-primary" : "bg-secondary"} shadow-xl`}>
          <div>
            <Toaster />
          </div>
          <h1 className={`${DarkMode ? "text-secondary" : "text-primary"} text-center font-product-sans font-bold text-lg leading-normal`}>
            Editar usuario
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full inline-flex flex-col justify-center items-center gap-8"
          >
            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Correo
                </label>
              </div>
              <input
                type="text"
                placeholder="Correo"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-secondary rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-seplaceholder-secondary  placeholder-secondary rounded-lg focus:border-primary'
                }
                onBlur={formik.handleBlur}
                // onError={formik.touched.email && Boolean(formik.errors.email)}
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                name="email"
                autoComplete="email"
              />
              {formik.touched.email && (
                <p
                  id="email-error"
                  className="text-center min-w-3 w-72 text-red-600 text-xs"
                >
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className={`${DarkMode ? "text-secondary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
                  Contraseña
                </label>
              </div>
              <label
                className={
                  formik.touched.password && formik.errors.password
                    ? 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-red-500 rounded-lg focus-within:border-primary'
                    : 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-secondary rounded-lg focus-within:border-primary'
                }
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  alt=':'
                  className="grow placeholder-secondary"
                  placeholder="Contraseña"
                  id="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  // onError={
                  //   formik.touched.password && Boolean(formik.errors.password)
                  // }
                  autoComplete="current-password"
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
                <p
                  id="email-error"
                  className="text-center min-w-3 w-72 text-red-600 text-xs"
                >
                  {formik.errors.password}
                </p>
              )}
              <div className="flex justify-start items-center gap-1 w-full">
                <input type="checkbox" className="checkbox" />
                <p className="text-teal-700 text-center font-product-sans text-xs font-normal">
                  Recordarme
                </p>
              </div>
            </div>
            <div className="modal-actionw-full">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <div method="dialog" className="w-full flex justify-center items-center gap-2">
                <button
                  className='btn flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-primary-700 text-white hover:bg-primary'
                  disabled={!(formik.dirty && formik.isValid && formik.values)}
                >
                  {loading
                    ? <span className="loading loading-spinner loading-sm"></span>
                    : 'Editar'}
                </button>
                {/* <button
                  className='btn flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-secondary text-white hover:bg-tertiary'
                  type="button"
                  onClick={() => document.getElementById('my_modal_1').close()}
                >Cancel</button> */}
                <ButtonForm onClick={() => document.getElementById('my_modal_1').close()}>Cancelar</ButtonForm>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
