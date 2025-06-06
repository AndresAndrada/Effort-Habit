import { useFormik } from "formik";
import Blockchain from "./hooks/Blockchain"

export default function BalanceOf() {
  const { getBalanceOfUser } = Blockchain();
  const formik = useFormik({
    initialValues: {
      address: '',
    },
    // validationSchema: LoginScheme,
    onSubmit: async (values) => {
      await getBalanceOfUser(values.address)
      // resetForm();
    },
  })
  return (
    <section className="flex flex-col sm:flex-row m-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-auto flex flex-row justify-center items-center gap-8"
      >
        <div className="flex flex-col w-full items-start gap-2">
          <div className="flex px-4 justify-end items-start gap-2">
            <label className="text-white text-hawk-turquoise text-center font-product-sans font-bold text-xs">
              Address
            </label>
          </div>
          <input
            type="text"
            placeholder="Address"
            className={`input input-bordered w-full bg-white flex p-2 items-center gap-2 placeholder-gray-500 focus:border-secondary border-2 ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''
              }`}

            onBlur={formik.handleBlur}
            // onError={formik.touched.address && Boolean(formik.errors.address)}
            onChange={formik.handleChange}
            value={formik.values.address}
            id="address"
            name="address"
            autoComplete="address"
          />
        </div>
        <button
          className={`button bg-[#18212b] p-4 rounded-2xl text-white font-medium w-[250px] flex justify-center items-center ${formik.dirty && formik.isValid && formik.values && 'hover:ring-2 hover:shadow-4xl active:ring-slate-300'} mt-4`}
          disabled={!(formik.dirty && formik.isValid && formik.values)}
        >
          Consult Balance
        </button>
      </form>
    </section>
  )
}