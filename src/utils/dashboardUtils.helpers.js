export const dashboardOptions = {
  admin: [
    {
      id: 'users',
      title: 'Usuarios',
      label: 'users',
      subTitle: 'Gestión de usuarios',
      description: 'Crear, eliminar y editar usuarios',
    },
    {
      id: 'exercises',
      title: 'Ejercicios',
      label: 'exercises',
      subTitle: 'Catálogo de ejercicios',
      description: 'Crear, eliminar y editar ejercicios',
    },
    {
      id: 'sessions',
      title: 'Sesiones',
      label: 'sessions',
      subTitle: 'Gestión de sesiones',
      description: 'Ver y gestionar todas las sesiones',
    },
    {
      id: 'trainers',
      title: 'Entrenadores',
      label: 'trainers',
      subTitle: 'Lista de entrenadores',
      description: 'Ver entrenadores y sus asignaciones',
    },
  ],
  teacher: [
    {
      id: 'exercises',
      title: 'Ejercicios',
      label: 'exercises',
      subTitle: 'Catálogo de ejercicios',
      description: 'Crear, eliminar y editar ejercicios',
    },
    {
      id: 'sessions',
      title: 'Mis Sesiones',
      label: 'sessions',
      subTitle: 'Gestión de sesiones',
      description: 'Crear y editar sesiones de entrenamiento',
    },
    {
      id: 'trainers',
      title: 'Mis Entrenadores',
      label: 'trainers',
      subTitle: 'Lista de entrenadores',
      description: 'Ver entrenadores asignados y sus sesiones',
    },
  ],
  trainer: [
    {
      id: 'my-sessions',
      title: 'Mis Sesiones',
      label: 'my-sessions',
      subTitle: 'Sesiones asignadas',
      description: 'Ver y completar mis sesiones de entrenamiento',
    },
    {
      id: 'progress',
      title: 'Mi Progreso',
      label: 'progress',
      subTitle: 'Estadísticas personales',
      description: 'Ver mi progreso y rendimiento',
    },
  ],
  default: [
    {
      id: 'dashboard',
      title: 'Panel de Control',
      label: 'dashboard',
      subTitle: 'Resumen general',
      description: 'Visión general del sistema',
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