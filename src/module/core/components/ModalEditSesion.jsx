/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import showPasswordIcon from '../../../assets/svg/showPassword.svg'
import hidePasswordIcon from '../../../assets/svg/showPassword.svg'
import { useUiStore } from '../../../stores';
import InputComponent from '../ui/input/InputComponent';
import { LoginScheme } from '../../../schemas';
import { IoMdCloseCircleOutline } from "react-icons/io";

export const ModalEditSesion = ({ setModalEditSesion }) => {
  const { DarkMode } = useUiStore();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginScheme,
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values), 'VALUES')
      setTimeout(() => setLoading(true), 1000);
      resetForm()
      setLoading(false);
      setModalEditSesion(false)
    },
  })
  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[]">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} transition-bg p-8 rounded-xl max-w-96 shadow-lg`}>
          <div>
            <Toaster />
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={() => {
                console.log('ENTREEEE');

                setModalEditSesion(false);
                // setOrdenDelete(null);
              }}
              className="text-gray-600 text-2xl"
            >
              {/* <X size={24} /> */}<IoMdCloseCircleOutline size={24} color='white' />
            </button>
          </div>
          <h1 className="text-primary text-center font-bold text-lg leading-normal">
            Iniciar de sesión
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full inline-flex flex-col justify-center items-center gap-8"
          >
            <InputComponent formikTouched={formik.touched.email} formikError={formik.errors.email} formikOnBlur={formik.handleBlur} formikHandleChange={formik.handleChange} formikValuesName={formik.values.email} title={'Email'} name={"email"} />
            <InputComponent formikTouched={formik.touched.password} formikError={formik.errors.password} formikOnBlur={formik.handleBlur} formikHandleChange={formik.handleChange} formikValuesName={formik.values.password} title={'Contraseña'} name={"password"} />
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
