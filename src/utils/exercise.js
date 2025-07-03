export const exercises = [{
  id: "0",
  type_exercise: "Zona media",
  description: "Trabajo de core, para mejora la transferencia de fuerza a las extremidades y trabajo preventivo protector",
  exercises: [{
    id: "01",
    name_exercise: "Puente frontal",
    variante: 1,
    description: "Isométrico: trabajo del recto del abdomen",
    photo: "",
    video: "",
  }, {
    id: "02",
    name_exercise: "Puente Lateral",
    variante: 1,
    description: "Isométrico: trabajo de los oblicuos",
    photo: "",
    video: "",
  }, {
    id: "03",
    name_exercise: "Puente invertido",
    variante: 1,
    description: "Isométrico: trabajo gluteo mayor",
    image: "",
    video: "",
  }]

}, {
  id: "1",
  type_exercise: "Tren superios",
  description: "Trabajo de core, para mejora la transferencia de fuerza a las extremidades y trabajo preventivo protector",
  exercises: [{
    id: "11",
    name_exercise: "push-ups",
    description: "Enfasis en pertoral",
    photo: "",
    video: "",
  }, {
    id: "12",
    name_exercise: "Curl bicep",
    description: "Enfasis en bicep",
    photo: "",
    video: "",
  }]
}, {
  id: "2",
  type_exercise: "Tren inferior",
  description: "Trabajo de core, para mejora la transferencia de fuerza a las extremidades y trabajo preventivo protector",
  exercises: [{
    id: "21",
    name_exercise: "Sentadilla",
    description: "Enfasis en pertoral",
    photo: "",
    video: "",
  }]
}, {
  id: "3",
  type_exercise: "Pontencia",
  description: "Trabajo de core, para mejora la transferencia de fuerza a las extremidades y trabajo preventivo protector",
  exercises: [{
    id: "31",
    name_exercise: "push-ups",
    description: "Enfasis en pertoral",
    photo: "",
    video: "",
  }]
}]

export const sesion = [{
  id: 1,
  name_sesion: 'Sesion 1',
  type_exercise: 'Estructural',
  exercises: [
    {
      id: 1,
      type_exercise: 'O. Vertical',
      items_exercise: [
        {
          id: 1,
          name_exercise: 'Flexiones',
          img_exercise: "",
          video_exercise: "",
          repetitions: 10,
          series: 3
        },
      ],
    },
    {
      id: 2,
      type_exercise: 'O. Horizontal',
      items_exercise: [
        {
          id: 1,
          name_exercise: 'Flexiones',
          img_exercise: "",
          video_exercise: "",
          repetitions: 10,
          series: 3
        },
        {
          id: 2,
          name_exercise: 'Remo bajo',
          img_exercise: "",
          video_exercise: "",
          repetitions: 10,
          series: 3
        },
        {
          id: 3,
          name_exercise: 'Sentadilla bulgara',
          img_exercise: "",
          video_exercise: "",
          repetitions: 10,
          series: 3
        },
        {
          id: 4,
          name_exercise: 'Plancha',
          img_exercise: "",
          video_exercise: "",
          repetitions: 10,
          series: 3
        }
      ],
      // name: 'Remo bajo',
      // img_exercise: "",
      // video_exercise: "",
      // repetitions: 10,
      // series: 3
    },
    {
      id: 3,
      type_exercise: 'Circuito',
      name: 'Sentadilla bulgara',
      img_exercise: "",
      video_exercise: "",
      repetitions: 10,
      series: 3

    },
  ],
  status: true, // La sesión está realizada
  active: false, // La sesión está activa
},
{
  id: 2,
  name_sesion: 'Sesion 2',
  type_exercise: 'Estructural',
  exercises: [
    { id: 1, name: 'Flexiones', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
    { id: 2, name: 'Remo bajo', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
    { id: 3, name: 'Sentadilla bulgara', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
  ],
  phone: '123456789',
  address: 'Calle Falsa 123',
  status: false,
  active: true,

},
{
  id: 3,
  name_sesion: 'Sesion 3',
  type_exercise: 'Fuerza Max',
  exercises: [
    { id: 1, name: 'Flexiones', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
    { id: 2, name: 'Remo bajo', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
    { id: 3, name: 'Sentadilla bulgara', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
  ],
  phone: '123456789',
  address: 'Calle Falsa 123',
  status: true,
  active: true,
},
{
  id: 4,
  name_sesion: 'Sesion 4',
  type_exercise: 'Compensatorio',
  exercises: [
    { id: 1, name: 'Flexiones', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
    { id: 2, name: 'Remo bajo', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
    { id: 3, name: 'Sentadilla bulgara', img_exercise: "", video_exercise: "", repetitions: 10, series: 3 },
  ],
  phone: '123456789',
  address: 'Calle Falsa 123',
  status: true,
  active: true,
}]

export const menuOptions = [
  { id: 1, type: "title", title: "Ejercicio" },
  { id: 2, label: "Todos", value: "todos" },
  { id: 3, label: "Agregar", value: "add" },
  { id: 4, label: "Modificar", value: "upDate" },
  { id: 5, type: "title", title: "Estadisticas" },
  { id: 6, label: "Fuerza", value: "strong" },
  { id: 7, label: "Resistencia", value: "resistence" },
  { id: 8, label: "Flexibilidad", value: "flexibility" },
  { id: 9, type: "title", title: "Configuraciones" },
  { id: 10, label: "Todos", value: "" },
  { id: 11, label: "Agregar", value: "" }
];