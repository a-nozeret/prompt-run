const formatForFlag = (key, value) => {
  if (key.startsWith('-')) {
    if (typeof value === 'boolean') {
      return [value && key]
    }

    if (value) {
      return [key, value]
    }
  }

  return [value]
}

/**
 * Format arguments - Treat flags
 *
 * @param {object} args - Raw arguments as Response object
 *
 * @returns {Array} - List of arguments
 * */
module.exports = (args) => {
  const values = Object.entries(args).reduce(
    (acc, [key, value]) => [
      ...acc,
      ...formatForFlag(key, value),
    ],
    [],
  )

  return values.filter(Boolean)
}
