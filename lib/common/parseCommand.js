/**
 * Parse command - Ensure proper Array format for command
 *
 * @param {object} p - Params
 * @param {string|Array} p.command - Raw command
 * @param {object}  p.options - Lib options
 * @param {string} p.pm - Current package manager
 *
 * @returns {Array} - Safe command
 * */
module.exports = ({ command, options = {}, pm = 'yarn' }) => {
  const defaultCommand = pm === 'yarn' ? ['yarn'] : [pm, 'run']

  if (options.prefix || command.length === 0) {
    return defaultCommand
  }

  if (typeof command === 'string') {
    return command.split(' ')
  }

  return command
}
