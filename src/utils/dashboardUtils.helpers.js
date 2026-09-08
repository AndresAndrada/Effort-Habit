export const dashboardOptions = {
  admin: [
    {
      id: 'users',
      title: 'Usuarios',
      label: 'users',
      subTitle: 'Gestión de usuarios',
      description: 'Crear, eliminar y editar usuarios',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',

    },
    {
      id: 'exercises',
      title: 'Ejercicios',
      label: 'exercises',
      subTitle: 'Catálogo de ejercicios',
      description: 'Crear, eliminar y editar ejercicios',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',

    },
    {
      id: 'sessions',
      title: 'Sesiones',
      label: 'sessions',
      subTitle: 'Gestión de sesiones',
      description: 'Ver y gestionar todas las sesiones',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',

    },
    {
      id: 'trainers',
      title: 'Entrenadores',
      label: 'trainers',
      subTitle: 'Lista de entrenadores',
      description: 'Ver entrenadores y sus asignaciones',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',

    },
  ],
  teacher: [
    {
      id: 'exercises',
      title: 'Ejercicios',
      label: 'exercises',
      subTitle: 'Catálogo de ejercicios',
      description: 'Crear, eliminar y editar ejercicios',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',
    },
    {
      id: 'sessions',
      title: 'Mis Sesiones',
      label: 'sessions',
      subTitle: 'Gestión de sesiones',
      description: 'Crear y editar sesiones de entrenamiento',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',
    },
    {
      id: 'trainers',
      title: 'Mis Entrenadores',
      label: 'trainers',
      subTitle: 'Lista de entrenadores',
      description: 'Ver entrenadores asignados y sus sesiones',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',
    },
  ],
  trainer: [
    {
      id: 'my-sessions',
      title: 'Mis Sesiones',
      label: 'my-sessions',
      subTitle: 'Sesiones asignadas',
      description: 'Ver y completar mis sesiones de entrenamiento',
      img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=workout%20session%20calendar%20fitness%20schedule%20icon&image_size=square',
    },
    {
      id: 'progress',
      title: 'Mi Progreso',
      label: 'progress',
      subTitle: 'Estadísticas personales',
      description: 'Ver mi progreso y rendimiento',
      img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=progress%20chart%20graph%20growth%20statistics%20icon&image_size=square',
    },
  ],
  default: [
    {
      id: 'dashboard',
      title: 'Panel de Control',
      label: 'dashboard',
      subTitle: 'Resumen general',
      description: 'Visión general del sistema',
      img: 'https://res.cloudinary.com/de7fyvmdp/image/upload/v1749934273/samples/entrenamiento-funcional-Suelosport_febrba.jpg',

    },
  ],
};

export const routeMap = {
  users: '/users',
  exercises: '/exercises',
  sessions: '/sessions',
  trainers: '/trainers',
  'my-sessions': '/my-sessions',
  progress: '/progress',
  dashboard: '/dashboard',
  profile: '/profile',
};

export const navigateToSection = (option, navigate) => {
  const route = routeMap[option] || '/';
  navigate(route, { replace: true });
};