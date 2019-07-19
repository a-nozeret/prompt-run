const path = require('path')
const pm = require('which-pm-runs')()
const parseCommand = require('./common/parseCommand')
const getQuestions = require('./common/getQuestions')
const prompt = require('./common/prompt')
const log = require('./common/log')
const execute = require('./common/execute')

// eslint-disable-next-line import/no-dynamic-require,global-require
const packageJson = () => require(path.resolve('package.json'))

/**
 * Prompt and run - Run command generated from prompted user input
 *
 * @param {object} p - Params
 *
 * @param {Array|string} p.command - Base command to execute with the prompted values
 *
 * @param {object} p.questions - Questions to prompt for arguments
 * @param {Array}  p.questions.args - Questions to prompt for arguments
 * @param {Array}  p.questions.env - Questions to prompt for environment variables
 *
 * @param {object}  p.options - Lib options
 * @param {string}  p.options.config - Config path
 * @param {string}  p.options.prefix - Prefix for package.scripts to generate the questions
 * @param {boolean} p.options.dryRun - Not running the output command
 * @param {boolean} p.options.silent - Not logging the output command
 *
 * @param {object} p.pkg - package.json content
 *
 *
 * @returns {Promise} - Child process or the output if options.dryRun === true
 * */
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
