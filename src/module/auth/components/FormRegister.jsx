import { useState } from 'react';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import * as yup from 'yup';
import { RegisterScheme } from '../../../schemas';
import showPasswordIcon from '../../../assets/svg/showPassword.svg';
import hidePasswordIcon from '../../../assets/svg/hidePassword.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.js';
import { useUserStore } from '../../../stores';
import { Link } from 'react-router-dom';

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser: setAuthUser, setTokens } = useAuth();
  const { setAuthenticated, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'trainer',
    },
    validationSchema: RegisterScheme,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(isLoading);
      
      try {
        setIsLoading(true);
        const mockUser = {
          id: Date.now().toString(),
          name: values.name || values.email?.split('@')[0] || 'Usuario',
          email: values.email,
          role: values.role,
        };
        console.log("🚀 ~ FormRegister ~ mockUser:", mockUser)
        const mockTokens = { accessToken: 'mock-token', refreshToken: 'mock-refresh' };
        // setAuthenticated(true);
        // setUser(mockUser);
        // setAuthUser(mockUser);
        // setTokens(mockTokens);

        toast.success('¡Cuenta creada con éxito!', {
          duration: 2000,
          position: 'top-center',
        });
        resetForm();
        const destino = mockUser.role === 'trainer' ? '/my-sessions' : '/dashboard';
        navigate(destino, { replace: true });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-100% max-w-96 sm:w-96 inline-flex p-6 flex-col justify-center items-center gap-8 rounded-lg bg-white shadow-xl">
      <div>
        <Toaster />
      </div>
      <h1 className="text-teal-700 text-center font-product-sans font-bold text-lg leading-normal">
        Crear cuenta
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full inline-flex flex-col justify-center items-center gap-8"
      >
        <div className="flex flex-col w-full items-start gap-2">
          <div className="flex px-4 justify-end items-start gap-2">
            <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
              Nombre completo
            </label>
          </div>
          <input
            type="text"
            placeholder="Nombre completo"
            className={
              formik.touched.name && formik.errors.name
                ? 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-red-500 placeholder-teal-700 rounded-lg focus:border-primary'
                : 'input input-bordered w-full bg-white flex p-2 items-center gap-2 border-2 border-teal-700 placeholder-teal-700 rounded-lg focus:border-primary'
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
            <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
              Correo
            </label>
          </div>
          <input
            type="email"
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
              autoComplete="new-password"
              onChange={formik.handleChange}
            />
            <img
              src={showPassword ? showPasswordIcon : hidePasswordIcon}
              alt="Mostrar contraseña"
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

        <div className="flex flex-col w-full items-start gap-2">
          <div className="flex px-4 justify-end items-start gap-2">
            <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
              Confirmar contraseña
            </label>
          </div>
          <label
            className={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-red-500 rounded-lg focus-within:border-primary'
                : 'input input-bordered flex items-center gap-2 w-full bg-white p-2 border-2 border-hawk-turquoise border-teal-700 rounded-lg focus-within:border-primary'
            }
          >
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="grow placeholder-teal-700"
              placeholder="Confirmar contraseña"
              id="confirmPassword"
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              autoComplete="new-password"
              onChange={formik.handleChange}
            />
            <img
              src={showConfirmPassword ? showPasswordIcon : hidePasswordIcon}
              alt="Mostrar confirmación"
              className="h-5 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </label>
          {formik.touched.confirmPassword && (
            <p id="confirmPassword-error" className="text-center min-w-3 w-72 text-red-600 text-xs">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full items-start gap-2">
          <div className="flex px-4 justify-end items-start gap-2">
            <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
              Rol
            </label>
          </div>
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.role && formik.errors.role
                ? 'select w-full bg-white border-2 border-red-500 rounded-none'
                : 'select w-full bg-white border-2 border-teal-700 rounded-none'
            }
          >
            <option value="trainer">Entrenador (recibe coaching)</option>
            <option value="teacher">Profesor/Coach (crea entrenamientos)</option>
            <option value="admin">Administrador</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-center w-72 text-red-600 text-xs">{formik.errors.role}</p>
          )}
        </div>

        {formik.errors.form && (
          <div className="alert alert-error text-sm w-full">{formik.errors.form}</div>
        )}

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
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'Registrarse'
            )}
          </button>
        </div>
      </form>

      <div className="flex justify-center items-start gap-2">
        <h6 className="text-secondary text-center font-productsans text-xs cursor-pointer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/sign-in" className="text-letterPrimary underline font-bold">
            Inicia sesión
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default FormRegister;
