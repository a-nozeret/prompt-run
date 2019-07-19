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
