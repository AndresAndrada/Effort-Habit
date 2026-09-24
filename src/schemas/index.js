import * as yup from 'yup'

// const usernameMatch =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*\$%\^&\*])(?=.{8,})/;
// const usernameSignUp = /^(\S+$)/g;
// const minPriceVerify = /^[0-9]*$/;
// const date = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
// const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*%&@\$%\^&\*])(?=.{8,})/
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*%&@$%^&*])(?=.{8,})/

export const LoginScheme = yup.object().shape({
    email: yup.string().max(255).required('Ingrese el correo'),
    // .matches(
    //   /^[^@]+@[^@]+\.[^@]+$/,
    //   "El correo debe contener '@' antes del '.'"
    // ),

    password: yup
        .string()
        .required('Ingrese su contraseña')
        .matches(
            passwordRules,
            'Debe contener 8 catacteres, una mayuscula, una minuscula, un número y una caracter especial.'
        ),
})

export const RegisterScheme = yup.object().shape({
    name: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre completo'),

    email: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    password: yup
        .string()
        .required('Ingrese su contraseña')
        .matches(
            passwordRules,
            'Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.'
        ),
            confirmPassword: yup
            .string()
            .required('Confirma tu contraseña')
            .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
            role: yup
            .string()
            .oneOf(['trainer', 'teacher', 'admin'], 'Rol no válido')
            .required('Selecciona un rol'),
})

export const CreateUserScheme = yup.object().shape({
    name: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre completo'),

    email: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    password: yup
        .string()
        .required('Ingrese su contraseña')
        .matches(
            passwordRules,
            'Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.'
        ),

    role: yup
        .string()
        .oneOf(['trainer', 'teacher', 'admin'], 'Rol no válido')
        .required('Selecciona un rol'),

    documento: yup
        .string()
        .min(7, 'Mínimo 7 caracteres')
        .max(10, 'Máximo 10 caracteres')
        .required('Ingrese documento'),

    phone: yup
        .string()
        .min(9, 'Mínimo 9 caracteres')
        .max(15, 'Máximo 15 caracteres')
        .required('Ingrese teléfono'),

    address: yup
        .string()
        .max(255)
        .required('Ingrese dirección'),

    assignedTeacherId: yup
        .number()
        .integer()
        .positive()
        .optional()
        .when('role', {
            is: 'trainer',
            then: (schema) => schema.required('Seleccione un profesor asignado'),
            otherwise: (schema) => schema.notRequired(),
        }),
})

export const EditUserScheme = yup.object().shape({
    name: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre completo'),

    email: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    role: yup
        .string()
        .oneOf(['trainer', 'teacher', 'admin'], 'Rol no válido')
        .required('Selecciona un rol'),

    documento: yup
        .string()
        .min(7, 'Mínimo 7 caracteres')
        .max(10, 'Máximo 10 caracteres')
        .required('Ingrese documento'),

    phone: yup
        .string()
        .min(9, 'Mínimo 9 caracteres')
        .max(15, 'Máximo 15 caracteres')
        .required('Ingrese teléfono'),

    address: yup
        .string()
        .max(255)
        .required('Ingrese dirección'),

    status: yup
        .boolean()
        .required('Seleccione estado'),

    assignedTeacherId: yup
        .number()
        .integer()
        .positive()
        .optional()
        .when('role', {
            is: 'trainer',
            then: (schema) => schema.required('Seleccione un profesor asignado'),
            otherwise: (schema) => schema.notRequired(),
        }),
})

export const AddCompany = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre completo'),

    email: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    password: yup
        .string()
        .required('Ingrese su contraseña')
        .matches(
            passwordRules,
            'Debe contener 8 catacteres, una mayuscula, una minuscula, un número y una caracter especial.'
        ),
})

export const EditUser = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre completo'),

    email: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    password: yup
        .string()
        .required('Ingrese su contraseña')
        .matches(
            passwordRules,
            'Debe contener 8 catacteres, una mayuscula, una minuscula, un número y una caracter especial.'
        ),
})

export const DashBoardeScheme = yup.object().shape({
    fullName: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre completo'),

    document: yup
        .string()
        .min(7, 'Mínimo 7 caracteres')
        .max(10, 'Máximo 10 caracteres')
        .required('Ingrese documento empresarial'),

    email: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    phone: yup
        .string()
        .min(9, 'Mínimo 10 caracteres')
        .max(11, 'Máximo 10 caracteres')
        .required('Ingrese el numero de teleforo'),

    title: yup
        .string()
        .min(5, 'Mínimo 5 caracteres')
        .max(100, 'Máximo de 100 caracteres')
        .required('Ingrese nombre completo'),

    endpoint: yup
        .string()
        .min(5, 'Mínimo 5 caracteres')
        .required('Ingrese nombre completo'),

    keyPrivate: yup.string().required('Ingrese nombre completo'),

    keyPublic: yup.string().required('Ingrese nombre completo'),
})

export const CreateExercise = yup.object().shape({
    name_product: yup
        .string()
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese nombre del producto'),

    type: yup
        .string()
        .min(5, 'Debe contener más de 5 caracteres')
        .max(65, 'Máximo de 65 caracteres')
        .required('Ingrese tipo de producto'),

    description: yup
        .string()
        .min(7, 'Mínimo 7 caracteres')
        .required('Ingrese documento empresarial'),

    descriptionPromotion: yup
        .string()
        .max(255)
        .required('Ingrese el correo')
        .matches(
            /^[^@]+@[^@]+\.[^@]+$/,
            "El correo debe contener '@' antes del '.'"
        ),

    minorista: yup
        .number()
        .min(1, 'Mínimo 10 caracteres')
        // .max(11, 'Máximo 10 caracteres')
        .required('Ingrese el precio MINORISTA del producto'),
})

export const AddressConsult = yup.object().shape({
    address: yup.string()
        .min(5, 'Debe contener más de 5 caracteres')
        .required('Ingrese el address'),
})

export const CreateSessionScheme = yup.object().shape({
    name_sesion: yup
        .string()
        .min(3, 'Mínimo 3 caracteres')
        .max(65, 'Máximo 65 caracteres')
        .required('Ingrese nombre de la sesión'),

    type_exercise: yup
        .string()
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres')
        .required('Ingrese tipo de ejercicio'),

    exercises: yup
        .array()
        .of(
            yup.object().shape({
                id: yup.number().required(),
                type_exercise: yup.string().required('Ingrese tipo de ejercicio'),
                items_exercise: yup.array().of(
                    yup.object().shape({
                        id: yup.number().required(),
                        name_exercise: yup.string().required('Ingrese nombre del ejercicio'),
                        img_exercise: yup.string().optional(),
                        video_exercise: yup.string().optional(),
                        repetitions: yup.number().min(1, 'Mínimo 1 repetición').required('Ingrese repeticiones'),
                        series: yup.number().min(1, 'Mínimo 1 serie').required('Ingrese series'),
                    })
                ).min(1, 'Debe tener al menos un ejercicio').required(),
            })
        )
        .min(1, 'Debe tener al menos un grupo de ejercicios')
        .required(),
})