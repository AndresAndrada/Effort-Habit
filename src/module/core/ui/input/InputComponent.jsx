/* eslint-disable react/prop-types */
export default function InputComponent({ formikTouched, formikError, formikOnBlur, formikHandleChange, formikValuesName, title, name }) {
  return (
    <div className="flex flex-col w-full items-start gap-2">
      <div className="flex px-1 justify-start items-start gap-2">
        <label htmlFor={name} className="text-body-sm font-semibold text-primary dark:text-secondary text-left">
          {title}
        </label>
      </div>
      <input
        type="text"
        placeholder={title}
        className={`input w-full bg-white dark:bg-base-100 flex p-2 items-center gap-2 rounded-xl text-secondary placeholder-base-400 border-2 transition-colors duration-200 focus-ring ${
          formikTouched && formikError ? 'border-red-500 focus:border-red-500' : 'border-base-300 dark:border-base-600 focus:border-effort-500'
        }`}
        onBlur={formikOnBlur}
        onChange={formikHandleChange}
        value={formikValuesName}
        id={name}
        name={name}
        autoComplete={name}
        aria-invalid={Boolean(formikTouched && formikError)}
        aria-describedby={formikTouched && formikError ? `${name}-error` : undefined}
      />
      {formikTouched && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-left min-w-3 text-red-600 dark:text-red-400 text-caption"
        >
          {formikError}
        </p>
      )}
    </div>
  )
}
