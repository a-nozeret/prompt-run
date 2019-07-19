const path = require('path')
const pm = require('which-pm-runs')
const parseCommand = require('./common/parseCommand')
const getQuestions = require('./common/getQuestions')
const prompt = require('./common/prompt')
const log = require('./common/log')
const execute = require('./common/execute')

// eslint-disable-next-line import/no-dynamic-require,global-require
const packageJson = () => require(path.resolve('package.json'))


module.exports = async ({
  command,
  questions,
  options = {},
  pkg = packageJson(),
}) => {
  const parsedQuestions = getQuestions({ questions, options, pkg })
  const parsedCommand = parseCommand({ command, options, pm: pm.name })

  const output = await prompt(parsedCommand, parsedQuestions)

  if (!options.silent) {
    log(output, options)
  }

  if (options.dryRun) {
    return output
  }

  return execute(output, process.env)
}
