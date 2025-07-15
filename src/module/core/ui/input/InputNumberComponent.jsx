// import { MdOutlineAttachMoney } from "react-icons/md";

import { useUiStore } from "../../../../stores";

// eslint-disable-next-line react/prop-types
export default function InputNumberComponent({ title, name, formikTouched, formikError, formikOnBlur, formikHandleChange, formikValuesName }) {
  const { DarkMode } = useUiStore();

  return (
    <div className="flex flex-col w-full items-start gap-2">
      <div className="flex px-4 justify-end items-start gap-2">
        <label className={`${DarkMode ? "text-primary" : "text-primary"} text-hawk-turquoise text-center font-product-sans text-sm font-bold`}>
          {title} <span className='text-gray-400'>{"(opcional)"}</span>
        </label>
      </div>
      <label
        className={`input input-bordered w-full bg-white flex p-2 items-center gap-2 placeholder-teal-700 border-letterPrimary focus:border-primary border-2 rounded-xl ${formikTouched && formikError ? 'border-red-500' : 'border-secondary'
          }`}
      >
        <input
          type="number"
          name={name}
          className={`grow ${DarkMode ? "text-secondary" : "text-secondary"} placeholder-gray-400`}
          placeholder='0'
          id={formikValuesName}
          onBlur={formikOnBlur}
          value={formikValuesName ? formikValuesName : ''}
          autoComplete={formikValuesName}
          onChange={formikHandleChange}
        />
        {/* <MdOutlineAttachMoney className='text-customColor' /> */}
      </label>
    </div>
  )
}