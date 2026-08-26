/**
 * @typedef {'admin' | 'teacher' | 'trainer'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string|number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {UserRole} role
 * @property {boolean} status
 * @property {string} [avatar]
 * @property {string} [birthDate]
 * @property {number} [age]
 * @property {number} [weight]
 * @property {number} [height]
 * @property {string} [profession]
 * @property {string[]} [trainingDays]
 * @property {string} [trainingHours]
 * @property {string[]} [sport]
 * @property {string} [goal]
 * @property {string[]} [injuries]
 * @property {string[]} [medicalConditions]
 * @property {string} [experience]
 * @property {string[]} [motivation]
 * @property {string|number} [assignedTeacherId] // Para trainers
 * @property {string[]} [assignedTrainers] // Para teachers
 * @property {string} [documento]
 */

/**
 * @typedef {Object} AuthTokens
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {number} expiresIn
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {UserRole} role
 * @property {string|number} [assignedTeacherId] // Solo para trainers
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated
 * @property {User|null} user
 * @property {AuthTokens|null} tokens
 * @property {UserRole|null} role
 * @property {Function} login
 * @property {Function} register
 * @property {Function} logout
 * @property {Function} refreshAccessToken
 * @property {Function} setUser
 * @property {Function} setTokens
 */