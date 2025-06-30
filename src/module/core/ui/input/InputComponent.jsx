import { useUiStore } from "../../../../stores"

/* eslint-disable react/prop-types */
export default function InputComponent({ formikTouched, formikError, formikOnBlur, formikHandleChange, formikValuesName, title, name }) {
  console.log("🚀 ~ InputComponent ~ name:", formikError, formikTouched)
  const { DarkMode } = useUiStore();
  return (
    <div className="flex flex-col w-full items-start gap-2">
      <div className="flex px-4 justify-end items-start gap-2">
        <label className={`${DarkMode ? "text-primary" : "text-primary"} text-hawk-turquoise text-center font-product-sans font-bold text-xs`}>
          {title}
        </label>
      </div>
      <input
        type="text"
        placeholder={title}
        className={`input w-full bg-white flex p-2 items-center gap-2 rounded-lg text-secondary placeholder-gray-400 focus:border-tertiary border-2 ${formikTouched && formikError ? 'border-red-500' : 'border-secondary'}`}
        onBlur={formikOnBlur}
        // onError={formik.touched.name_product && Boolean(formik.errors.name_product)}
        onChange={formikHandleChange}
        value={formikValuesName}
        id={name}
        name={name}
        autoComplete={name}
      />
      {formikTouched && (
        <p
          id={`${name}-error"`}
          className="text-center min-w-3 text-red-600 text-xs"
        >
          {formikError}
        </p>
      )}
    </div>
  )
}