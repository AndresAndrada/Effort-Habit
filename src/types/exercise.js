/**
 * @typedef {Object} Exercise
 * @property {string|number} id
 * @property {string} name_exercise
 * @property {string} [name_type] // Para compatibilidad con UI actual
 * @property {string} [type_exercise] // Categoría: "Zona media", "Tren superior", etc.
 * @property {string} description
 * @property {number} [variante]
 * @property {string} [photo]
 * @property {string} [image]
 * @property {string} [video]
 * @property {string|number} [createdBy] // teacher id
 * @property {boolean} [isPublic] // Si está aprobado para todos
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} ExerciseCategory
 * @property {string|number} id
 * @property {string} type_exercise
 * @property {string} description
 * @property {Exercise[]} exercises
 */

/**
 * @typedef {Object} CreateExerciseData
 * @property {string} name_exercise
 * @property {string} type_exercise
 * @property {string} description
 * @property {number} [variante]
 * @property {File} [photo]
 * @property {File} [video]
 */