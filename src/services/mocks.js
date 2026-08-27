import { users as mockUsers } from '../utils/usersUtils.helpers.js';
import { exercises, sesion as mockSessions } from '../utils/exercise.js';

/**
 * Simula latencia de red
 * @param {number} ms
 */
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Genera un ID único simple
 */
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

/**
 * Clona profundo para evitar mutaciones accidentales
 */
const clone = (data) => JSON.parse(JSON.stringify(data));

/**
 * Mock de usuarios en memoria (se sincroniza con localStorage)
 */
let usersDb = clone(mockUsers);

/**
 * Mock de ejercicios en memoria
 */
let exercisesDb = clone(exercises);

/**
 * Mock de sesiones en memoria
 */
let sessionsDb = clone(mockSessions);

/**
 * Mock de tokens (simula JWT)
 */
const mockTokens = {
  accessToken: 'mock-access-token-' + generateId(),
  refreshToken: 'mock-refresh-token-' + generateId(),
  expiresIn: 3600,
};

/**
 * Usuario actual simulado (para testing rápido)
 */
let currentUser = null;

/**
 * Servicios de autenticación mock
 */
export const authMock = {
  /**
   * @param {{email: string, password: string}} credentials
   */
  login: async (credentials) => {
    await delay();
    
    // Buscar usuario en la base de usuarios mock
    let user = usersDb.find(
      (u) => u.email === credentials.email && u.status
    );
    console.log("🚀 ~ user:", user)
    
    // Si no existe, crear uno dinámicamente (modo prototype sin validación estricta)
    if (!user) {
      const role = credentials.email?.includes('admin') ? 'admin' 
                    : credentials.email?.includes('trainer') ? 'trainer' 
                    : 'teacher';
      user = {
        id: generateId(),
        name: credentials.email?.split('@')[0] || 'Usuario',
        email: credentials.email,
        role,
        status: true,
        avatar: '',
        createdAt: new Date().toISOString(),
      };
      // Opcional: agregarlo a usersDb para que persista en esta sesión de navegador
      usersDb.push(user);
    }
    
    currentUser = clone(user);
    return {
      data: {
        user: currentUser,
        tokens: mockTokens,
      },
    };
  },

  /**
   * @param {{name: string, email: string, password: string, role: string, assignedTeacherId?: string}} data
   */
  register: async (data) => {
    await delay();
    if (usersDb.some((u) => u.email === data.email)) {
      throw { response: { status: 400, data: { message: 'Email ya registrado' } } };
    }
    const newUser = {
      id: generateId(),
      ...data,
      password: undefined, // No guardar password en mock
      status: true,
      avatar: '',
      createdAt: new Date().toISOString(),
    };
    usersDb.push(newUser);
    currentUser = clone(newUser);
    return {
      data: {
        user: currentUser,
        tokens: mockTokens,
      },
    };
  },

  logout: async () => {
    await delay(100);
    currentUser = null;
    return { data: { success: true } };
  },

  me: async () => {
    await delay(100);
    if (!currentUser) {
      throw { response: { status: 401, data: { message: 'No autenticado' } } };
    }
    return { data: currentUser };
  },

  refresh: async () => {
    await delay(100);
    return {
      data: {
        accessToken: 'mock-access-token-' + generateId(),
        refreshToken: mockTokens.refreshToken,
        expiresIn: 3600,
      },
    };
  },
};

/**
 * Servicios de usuarios mock
 */
export const userMock = {
  list: async (params = {}) => {
    await delay();
    let result = [...usersDb];

    if (params.search) {
      const search = params.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          (u.documento && u.documento.includes(search))
      );
    }
    if (params.role) result = result.filter((u) => u.role === params.role);
    if (params.status !== undefined) result = result.filter((u) => u.status === params.status);

    // Paginación simple
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const data = result.slice(start, start + limit);

    return {
      data: {
        data,
        total: result.length,
        page,
        limit,
        totalPages: Math.ceil(result.length / limit),
      },
    };
  },

  get: async (id) => {
    await delay();
    const user = usersDb.find((u) => u.id == id);
    if (!user) throw { response: { status: 404 } };
    return { data: clone(user) };
  },

  create: async (data) => {
    await delay();
    const newUser = { id: generateId(), ...data, createdAt: new Date().toISOString() };
    usersDb.push(newUser);
    return { data: newUser };
  },

  update: async (id, data) => {
    await delay();
    const idx = usersDb.findIndex((u) => u.id == id);
    if (idx === -1) throw { response: { status: 404 } };
    usersDb[idx] = { ...usersDb[idx], ...data, updatedAt: new Date().toISOString() };
    if (currentUser?.id == id) currentUser = clone(usersDb[idx]);
    return { data: clone(usersDb[idx]) };
  },

  delete: async (id) => {
    await delay();
    usersDb = usersDb.filter((u) => u.id != id);
    return { data: { success: true } };
  },
};

/**
 * Servicios de ejercicios mock
 */
export const exerciseMock = {
  list: async (params = {}) => {
    await delay();
    // Aplanar ejercicios de todas las categorías
    let result = exercisesDb.flatMap((cat) =>
      cat.exercises.map((ex) => ({
        ...ex,
        categoryId: cat.id,
        categoryName: cat.type_exercise,
      }))
    );

    if (params.search) {
      const search = params.search.toLowerCase();
      result = result.filter((e) => e.name_exercise.toLowerCase().includes(search));
    }
    if (params.type_exercise) {
      result = result.filter((e) => e.categoryName === params.type_exercise);
    }

    return { data: result };
  },

  get: async (id) => {
    await delay();
    for (const cat of exercisesDb) {
      const ex = cat.exercises.find((e) => e.id == id);
      if (ex) return { data: { ...ex, categoryName: cat.type_exercise } };
    }
    throw { response: { status: 404 } };
  },

  create: async (data) => {
    await delay();
    // Encontrar o crear categoría
    let cat = exercisesDb.find((c) => c.type_exercise === data.type_exercise);
    if (!cat) {
      cat = {
        id: generateId(),
        type_exercise: data.type_exercise,
        description: '',
        exercises: [],
      };
      exercisesDb.push(cat);
    }
    const newEx = { id: generateId(), ...data, createdAt: new Date().toISOString() };
    cat.exercises.push(newEx);
    return { data: newEx };
  },

  update: async (id, data) => {
    await delay();
    for (const cat of exercisesDb) {
      const idx = cat.exercises.findIndex((e) => e.id == id);
      if (idx !== -1) {
        cat.exercises[idx] = { ...cat.exercises[idx], ...data, updatedAt: new Date().toISOString() };
        return { data: clone(cat.exercises[idx]) };
      }
    }
    throw { response: { status: 404 } };
  },

  delete: async (id) => {
    await delay();
    for (const cat of exercisesDb) {
      cat.exercises = cat.exercises.filter((e) => e.id != id);
    }
    return { data: { success: true } };
  },

  getCategories: async () => {
    await delay(50);
    return { data: exercisesDb.map((c) => ({ id: c.id, name: c.type_exercise })) };
  },
};

/**
 * Servicios de sesiones mock
 */
export const sessionMock = {
  list: async (params = {}) => {
    await delay();
    let result = clone(sessionsDb);

    if (params.trainerId) result = result.filter((s) => s.trainerId == params.trainerId);
    if (params.teacherId) result = result.filter((s) => s.teacherId == params.teacherId);
    if (params.status) result = result.filter((s) => s.status === params.status);

    return { data: result };
  },

  get: async (id) => {
    await delay();
    const session = sessionsDb.find((s) => s.id == id);
    if (!session) throw { response: { status: 404 } };
    return { data: clone(session) };
  },

  create: async (data) => {
    await delay();
    const newSession = {
      id: generateId(),
      ...data,
      status: 'pending',
      active: false,
      createdAt: new Date().toISOString(),
    };
    sessionsDb.push(newSession);
    return { data: newSession };
  },

  update: async (id, data) => {
    await delay();
    const idx = sessionsDb.findIndex((s) => s.id == id);
    if (idx === -1) throw { response: { status: 404 } };
    sessionsDb[idx] = { ...sessionsDb[idx], ...data, updatedAt: new Date().toISOString() };
    return { data: clone(sessionsDb[idx]) };
  },

  delete: async (id) => {
    await delay();
    sessionsDb = sessionsDb.filter((s) => s.id != id);
    return { data: { success: true } };
  },

  complete: async (id, exerciseLogs) => {
    await delay();
    const idx = sessionsDb.findIndex((s) => s.id == id);
    if (idx === -1) throw { response: { status: 404 } };
    sessionsDb[idx] = {
      ...sessionsDb[idx],
      status: 'completed',
      active: false,
      completedDate: new Date().toISOString(),
      exerciseLogs,
    };
    return { data: clone(sessionsDb[idx]) };
  },
};