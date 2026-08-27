import { useState } from 'react';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { LoginScheme } from '../../../schemas';
import showPasswordIcon from '../../../assets/svg/showPassword.svg';
import hidePasswordIcon from '../../../assets/svg/hidePassword.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.js';

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginScheme,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        const result = await login(values);
        if (result.ok) {
          toast.success('¡Bienvenido!', {
            duration: 2000,
            position: 'top-center',
          });
          resetForm();
          // Redirect based on role
          const userRole = result.user?.role || 'trainer';
          const destino = userRole === 'trainer' ? '/my-sessions' : '/dashboard';
          navigate(destino, { replace: true });
        } else {
          setErrors({ form: result.message });
        }
      } catch (error) {
        console.error(error);
        toast.error('Error al iniciar sesión', { duration: 2000, position: 'top-center' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-96 sm:w-96 inline-flex p-6 flex-col justify-center items-center gap-8 rounded-lg bg-white shadow-xl">
      <div>
        <Toaster />
      </div>
      <h1 className="text-teal-700 text-center font-product-sans font-bold text-lg leading-normal">
        Iniciar sesión
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
                ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500 placeholder-teal-700 rounded-lg focus:border-primary'
                : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-teal-700 placeholder-teal-700 rounded-lg focus:border-primary'
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
              className="grow placeholder-teal-700"
              placeholder="Contraseña"
              id="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
            <p id="password-error" className="text-center min-w-3 w-72 text-red-600 text-xs">
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
            type="submit"
            className={
              !isLoading && formik.isValid
                ? 'flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-teal-700 text-white hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-teal-700'
                : 'flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-gray-500 text-white cursor-not-allowed'
            }
            disabled={isLoading || !formik.isValid}
          >
            {isLoading
              ? <span className="loading loading-spinner loading-sm" />
              : 'Iniciar'}
          </button>
        </div>
      </form>
      <div className="flex justify-center items-start gap-2">
        <h6 className="text-secondary text-center font-productsans text-xs font-normal cursor-pointer">
          ¿Olvidaste tu contraseña?
        </h6>
      </div>
      <div className="flex justify-center items-start">
        <h6 className="text-secondary text-center font-productsans text-xs font-normal cursor-pointer">
          No tenes cuenta? <Link to="/sign-up" className="text-letterPrimary underline">Registrate</Link>
        </h6>
      </div>
    </div>
  );
}