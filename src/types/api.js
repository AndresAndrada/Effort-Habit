/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [message]
 * @property {Object} [error]
 * @property {number} [statusCode]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {*} data
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 * @property {number} totalPages
 */

/**
 * @typedef {Object} FilterParams
 * @property {string} [search]
 * @property {string} [role]
 * @property {boolean} [status]
 * @property {string} [type_exercise]
 * @property {string} [sortBy]
 * @property {string} [sortOrder]
 * @property {number} [page]
 * @property {number} [limit]
 */

/**
 * @typedef {Object} ApiEndpoints
 * @property {string} AUTH_LOGIN
 * @property {string} AUTH_REGISTER
 * @property {string} AUTH_REFRESH
 * @property {string} AUTH_LOGOUT
 * @property {string} AUTH_ME
 * @property {string} USERS_LIST
 * @property {string} USERS_GET
 * @property {string} USERS_CREATE
 * @property {string} USERS_UPDATE
 * @property {string} USERS_DELETE
 * @property {string} EXERCISES_LIST
 * @property {string} EXERCISES_GET
 * @property {string} EXERCISES_CREATE
 * @property {string} EXERCISES_UPDATE
 * @property {string} EXERCISES_DELETE
 * @property {string} SESSIONS_LIST
 * @property {string} SESSIONS_GET
 * @property {string} SESSIONS_CREATE
 * @property {string} SESSIONS_UPDATE
 * @property {string} SESSIONS_DELETE
 * @property {string} SESSIONS_COMPLETE
 */

/** @type {ApiEndpoints} */
export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  USERS_LIST: '/users',
  USERS_GET: '/users/:id',
  USERS_CREATE: '/users',
  USERS_UPDATE: '/users/:id',
  USERS_DELETE: '/users/:id',
  EXERCISES_LIST: '/exercises',
  EXERCISES_GET: '/exercises/:id',
  EXERCISES_CREATE: '/exercises',
  EXERCISES_UPDATE: '/exercises/:id',
  EXERCISES_DELETE: '/exercises/:id',
  SESSIONS_LIST: '/sessions',
  SESSIONS_GET: '/sessions/:id',
  SESSIONS_CREATE: '/sessions',
  SESSIONS_UPDATE: '/sessions/:id',
  SESSIONS_DELETE: '/sessions/:id',
  SESSIONS_COMPLETE: '/sessions/:id/complete',
};