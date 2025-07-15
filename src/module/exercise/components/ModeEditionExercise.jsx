// import { MdOutlineAttachMoney } from "react-icons/md";
import InputComponent from "../../core/ui/input/InputComponent";
import { CreateExercise } from "../../../schemas";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { DialogEditImgUser } from "../../core/ui/input/DialogEditImgUser";
import { useState } from "react";
import img from '../../../assets/icons/user-circle.svg'
import { exercises } from "../../../utils/exercise";
import InputNumberComponent from "../../core/ui/input/InputNumberComponent";
import { useUiStore } from "../../../stores";
import { ButtonForm } from "../../core/ui/button/ButtonForm";

export const ModeEditionExercise = () => {
  const { DarkMode } = useUiStore();
  const [loading, setLoading] = useState(false);
  const productAvatar = img;
  const [selectedFile, setSelectedFile] = useState(productAvatar);

  const handleImageChange = (event) => {
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setSelectedFile(URL.createObjectURL(event.currentTarget.files[0]))
      formik.setFieldValue('image', event.currentTarget.files[0])
    }
  }

  const Type = exercises.map(e => {
    return { id: e.id, name_exercise: e.name_exercise }
  })

  const formik = useFormik({
    initialValues: {
      type: '',
      name_product: '',
      image: '',
      description: '',
      descriptionPromotion: '',
      minorista: 0,
      mayorista: 0,
      pricePromotion: 0,
      stock: ''
    },
    validationSchema: CreateExercise,
    onSubmit: async (values, { resetForm }) => {
      console.log("🚀 ~ onSubmit: ~ values:", values)
      try {
        setLoading(true)
        resetForm()
        toast.success('Producto creado con éxito', {
          duration: 2000,
          position: 'top-center',
        })
        // const res = await createProduct(values);
        // if (res?.ok && res?.newProducto?.id) {
        //   console.log(res.newProducto?.id, 'ENTEEEEEE');
        //   await patchImageProduct(values.image, res?.newProducto?.id);
        //   resetForm()
        //   toast.success('Producto creado con éxito', {
        //     duration: 2000,
        //     position: 'top-center',
        //   })
        //   navigate('/')
        //   setLoading(false)
        // } else {
        //   setLoading(false)
        //   toast.error('Error al crear producto', {
        //     duration: 4000,
        //     position: 'top-center',
        //   })
        // }
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error('Algo salio mal, vuelve a intentarlo', {
          duration: 3000,
          position: 'top-center',
        })
      }
    },
  })
  return (
    // <div className={`p-9 w-full flex flex-col justify-center items-center gap-8 rounded-lg ${DarkMode ? "bg-secondary" : "bg-tertiary"} shadow-2xl overflow-hidden`}>
    <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} flex flex-col justify-center px-8 pb-8 gap-12 transition-bg rounded-xl w-full shadow-4xl`}>
      <div>
        <Toaster />
      </div>
      <h1 className="text-primary text-center font-product-sans font-bold text-2xl leading-normal">
        Crear Ejercicio
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col justify-center items-end gap-8"
      >
        <div className="flex justify-center w-full gap-8">
          <div className="flex flex-1 flex-col gap-12">
            <div className="flex gap-12 w-full justify-center items-center">
              <div className="flex flex-col gap-4">
                <p className="text-white text-center font-product-sans font-bold text-sm leading-normal">
                  Imagen
                </p>
                <div className="flex justify-center items-center gap-x-5 bg-gray-600 rounded-full w-20 h-20">
                  <DialogEditImgUser
                    handleImageChange={handleImageChange}
                    loading={loading}
                    selectedFile={selectedFile}
                    img={productAvatar}
                    handleSubmit={formik.handleSubmit}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-white text-center font-product-sans font-bold text-sm leading-normal">
                  Video
                </p>
                <div className="flex justify-center items-center gap-x-5 bg-gray-600 rounded-full w-20 h-20">
                  <DialogEditImgUser
                    handleImageChange={handleImageChange}
                    loading={loading}
                    selectedFile={selectedFile}
                    img={productAvatar}
                    handleSubmit={formik.handleSubmit}
                  />
                </div>
              </div>
            </div>
            <div className='w-full flex flex-col gap-5'>
              <InputComponent
                title='Nombre'
                name='name_product'
                formikTouched={formik.touched.name_product}
                formikError={formik.errors.name_product}
                formikOnBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikValuesName={formik.values.name_product}
              />
              <div className="flex flex-col w-full items-start gap-2">
                <div className="flex px-4 justify-end items-start gap-2">
                  <label className="text-primary text-hawk-turquoise text-center font-product-sans font-bold text-sm">
                    Tipo
                  </label>
                </div>
                <select
                  type="type"
                  placeholder="Tipo de producto"
                  className={`select input input-bordered w-full bg-white flex p-2 items-center text-secondary gap-2 border-letterPrimary border-2 ${formik.touched.type && formik.errors.type ? 'border-red-500' : 'border-secondary'}  placeholder-primary rounded-xl focus:border-primary`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  id="type"
                  name="type"
                  autoComplete="type"
                >
                  <option value="" className="text-teal-700">
                    Tipo de producto
                  </option>
                  {Type?.length > 0 && Type.map(type => {
                    return <option key={type.id} value={type.id} className='text-teal-700'>{type.name_type}</option>
                  })
                  }
                </select>
                {formik.touched.type && (
                  <p
                    id="type-error"
                    className="text-center min-w-3 text-red-600 text-xs"
                  >
                    {formik.errors.type}
                  </p>
                )}
              </div>
              <InputComponent
                title='Descripción'
                name='description'
                formikTouched={formik.touched.description}
                formikError={formik.errors.description}
                formikOnBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikValuesName={formik.values.description}
              />
            </div>
          </div>
          <div className='w-full flex flex-1 flex-col md:flex-row justify-center gap-3 sm:gap-10 '>
            <div className='w-full flex flex-col gap-5'>
              <InputNumberComponent
                title='Precio minorista'
                name='minorista'
                formikTouched={formik.touched.minorista}
                formikError={formik.errors.minorista}
                formikOnBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikValuesName={formik.values.minorista}
              />
              <InputNumberComponent
                title='Precio mayorista'
                name='mayorista'
                formikTouched={formik.touched.mayorista}
                formikError={formik.errors.mayorista}
                formikOnBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikValuesName={formik.values.mayorista}
              />
              <InputNumberComponent
                title='Stock'
                name='stock'
                formikTouched={formik.touched.stock}
                formikError={formik.errors.stock}
                formikOnBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikValuesName={formik.values.stock}
              />
            </div>
          </div>
        </div>
        <div className="w-40">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <ButtonForm disabled={!(formik.dirty && formik.isValid && formik.values)}>
            Crear ejercicio
          </ButtonForm>
        </div>
      </form>
    </div>

  )
}
