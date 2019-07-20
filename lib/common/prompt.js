const inquirer = require('inquirer')

const inquirerPrompt = async (questions) => {
  if (!questions
    || (Array.isArray(questions) && questions.length === 0)
  ) {
    return {}
  }

  return inquirer.prompt(questions)
}

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
  const { env: envQuestions, args: argsQuestions } = questions

  const env = await inquirerPrompt(envQuestions)
  const args = await inquirerPrompt(argsQuestions)

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
