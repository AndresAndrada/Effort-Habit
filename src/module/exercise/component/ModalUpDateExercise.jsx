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

export const ModalUpDateExercise = () => {
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
    console.log("🚀 ~ ModalUpDateExercise ~ Type:", Type)
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
        <div className={`${DarkMode ? "bg-secondary" : "bg-tertiary"} justify-center p-9 gap-8 transition-bg rounded-xl w-full shadow-2xl`}>
            <div>
                <Toaster />
            </div>
            <h1 className={`${DarkMode ? "text-secondary" : "text-primary"} text-center font-product-sans font-bold text-2xl leading-normal`}>
                Crear Ejercicio
            </h1>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col justify-center gap-8"
            // Elimina rounded-lg aquí si no quieres doble borde
            >
                <div className="flex flex-col justify-center w-full gap-8">
                    <div className="flex gap-40 justify-center">
                        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                        <div className="flex flex-col gap-4">
                            <p className={`${DarkMode ? "text-secondary" : "text-primary"} text-center font-product-sans font-bold text-base leading-normal`}>
                                Imagen
                            </p>
                            <div className="flex justify-center items-center gap-x-5 bg-gray-600 rounded-full w-60 h-60">
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
                            <p className={`${DarkMode ? "text-secondary" : "text-primary"} text-center font-product-sans font-bold text-base leading-normal`}>
                                Video
                            </p>
                            <div className="flex justify-center items-center gap-x-5 bg-gray-600 rounded-full w-60 h-60">
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
                    <div className='w-full flex flex-col sm:flex-col md:flex-row justify-center gap-3 sm:gap-10 '>
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
                                    <label className="text-teal-700 text-hawk-turquoise text-center font-product-sans font-bold text-xs">
                                        Tipo
                                    </label>
                                </div>
                                <select
                                    type="type"
                                    placeholder="Tipo de producto"
                                    className={`select input input-bordered w-full bg-white flex p-2 items-center text-teal-700 gap-2 border-2 ${formik.touched.type && formik.errors.type ? 'border-red-500' : 'border-teal-700'}  placeholder-teal-700 rounded-lg focus:border-primary`}
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
                                        return <><option value={type.id} className='text-teal-700' key={type.id}>{type.name_type}</option>
                                        </>
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
                <div className="w-full">
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                        className={
                            formik.dirty && formik.isValid
                                ? 'flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-secondary text-white hover:bg-primary'
                                : 'flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-gray-500 text-white'
                        }
                        disabled={!(formik.dirty && formik.isValid && formik.values)}
                    >
                        Crear ejercicio
                    </button>
                </div>
            </form>
        </div>

    )
}
