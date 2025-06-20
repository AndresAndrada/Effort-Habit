/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import showPasswordIcon from '../../../assets/svg/showPassword.svg'
import hidePasswordIcon from '../../../assets/svg/showPassword.svg'
import { useUiStore } from '../../../stores';

export const ModalEditSesion = ({ setOptionScreens }) => {
  const { DarkMode } = useUiStore();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: LoginScheme,
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values), 'VALUES')
      setTimeout(() => setLoading(true), 1000);
      resetForm()
      setLoading(false);
      setOptionScreens(false)
    },
  })
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[]">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className={`${DarkMode ? "bg-primary" : "bg-secondary"} transition-bg p-8 rounded-xl w-96 shadow-lg`}>
          <div>
            <Toaster />
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={() => {
                setOptionScreens(false);
                // setOrdenDelete(null);
              }}
              className="text-gray-600 text-2xl"
            >
              {/* <X size={24} /> */}X
            </button>
          </div>
          <h1 className="text-teal-700 text-center font-product-sans font-bold text-lg leading-normal">
            Iniciar de sesión
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full inline-flex flex-col justify-center items-center gap-8"
          >
            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex px-4 justify-end items-start gap-2">
                <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
                  Correo
                </label>
              </div>
              <input
                type="text"
                placeholder="Correo"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500  placeholder-teal-700 rounded-lg focus:border-primary'
                    : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-teal-700  placeholder-teal-700 rounded-lg focus:border-primary'
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
                <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
                  Contraseña
                </label>
              </div>
              <label
                className={
                  formik.touched.password && formik.errors.password
                    ? 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-red-500 rounded-lg focus-within:border-primary'
                    : 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-teal-700 rounded-lg focus-within:border-primary'
                }
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  alt=':'
                  className="grow placeholder-teal-700"
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
            <div className="w-full">
              <button
                className={
                  formik.dirty && formik.isValid
                    ? 'flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-teal-700 text-white hover:bg-emerald-800'
                    : 'flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-gray-500 text-white'
                }
              // disabled={!(formik.dirty && formik.isValid && formik.values)}
              >
                {loading
                  ? <span className="loading loading-spinner loading-sm"></span>
                  : 'Iniciar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
