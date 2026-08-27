/**
 * @typedef {Object} SessionExerciseItem
 * @property {string|number} id
 * @property {string} name_exercise
 * @property {string} [type_exercise]
 * @property {number} repetitions
 * @property {number} series
 * @property {string} [img_exercise]
 * @property {string} [video_exercise]
 * @property {string} [notes]
 * @property {boolean} [completed]
 * @property {number} [actualRepetitions]
 * @property {number} [actualSeries]
 * @property {number} [rpe] // Rate of Perceived Exertion 1-10
 */

/**
 * @typedef {Object} SessionExerciseGroup
 * @property {string|number} id
 * @property {string} type_exercise // "O. Vertical", "O. Horizontal", "Circuito"
 * @property {string} [name]
 * @property {SessionExerciseItem[]} items_exercise
 */

/**
 * @typedef {'pending' | 'active' | 'completed' | 'cancelled'} SessionStatus
 */

/**
 * @typedef {Object} Session
 * @property {string|number} id
 * @property {string} name_sesion
 * @property {string} type_exercise // "Estructural", "Fuerza Max", "Compensatorio"
 * @property {SessionExerciseGroup[]} exercises
 * @property {SessionStatus} status
 * @property {boolean} active
 * @property {string|number} trainerId // Quién realiza la sesión
 * @property {string|number} teacherId // Quién la creó/asignó
 * @property {string} [scheduledDate]
 * @property {string} [completedDate]
 * @property {string} [notes]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} CreateSessionData
 * @property {string} name_sesion
 * @property {string} type_exercise
 * @property {string|number} trainerId
 * @property {string} [scheduledDate]
 * @property {SessionExerciseGroup[]} exercises
 * @property {string} [notes]
 */

/**
 * @typedef {Object} SessionProgress
 * @property {string|number} sessionId
 * @property {string|number} trainerId
 * @property {number} completedExercises
 * @property {number} totalExercises
 * @property {number} completionPercentage
 * @property {SessionExerciseItem[]} exerciseLogs
 */