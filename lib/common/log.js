const chalk = require('chalk')

module.exports = ({ command, args, env }, options) => {
  const title = !options.dryRun ? '🏃 Running:' : 'Output:'
  const formattedEnv = Object.entries(env).map(([k, v]) => `${k}=${v}`).join(' ')
  const formattedArgs = args.join(' ')

  // eslint-disable-next-line no-console
  console.log(
    chalk.bold(title),
    chalk.cyan(`\n $ ${formattedEnv} ${command} ${formattedArgs}`),
    '\n---',
  )
}
