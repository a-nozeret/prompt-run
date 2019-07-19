const inquirer = require('inquirer')

/**
 * Prompt - User input to generate command
 *
 * @param {Array} parsedCommand - Command
 * @param {object} questions - Questions config
 *
 * @returns {object} - Output with the given command/env/args
 * */
module.exports = async (parsedCommand, questions) => {
  const [command, ...inputArgs] = parsedCommand
  const { env: envQuestions = [], args: argsQuestions = [] } = questions

  const env = await inquirer.prompt(envQuestions)
  const args = await inquirer.prompt(argsQuestions)

  const argsValue = Object.values(args).filter(Boolean)

  return {
    command,
    env,
    args: [
      ...inputArgs,
      ...argsValue,
    ],
  }
}
