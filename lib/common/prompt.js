const inquirer = require('inquirer')

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
