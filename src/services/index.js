import {
  authApi,
  userApi,
  exerciseApi,
  sessionApi,
} from './api.js';

import {
  authMock,
  userMock,
  exerciseMock,
  sessionMock,
} from './mocks.js';

/**
 * Factoría de servicios - permite alternar entre mock y API real
 * Controlado por VITE_USE_MOCK_API (default: true en desarrollo)
 */
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

/**
 * @type {typeof authApi | typeof authMock}
 */
export const authService = USE_MOCK ? authMock : authApi;

/**
 * @type {typeof userApi | typeof userMock}
 */
export const userService = USE_MOCK ? userMock : userApi;

/**
 * @type {typeof exerciseApi | typeof exerciseMock}
 */
export const exerciseService = USE_MOCK ? exerciseMock : exerciseApi;

/**
 * @type {typeof sessionApi | typeof sessionMock}
 */
export const sessionService = USE_MOCK ? sessionMock : sessionApi;

/**
 * Helper para saber si estamos en modo mock
 */
export const isMockMode = () => USE_MOCK;