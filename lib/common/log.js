const chalk = require('chalk')

/**
 * Log - Output generated command
 *
 * @param {object} p - Params
 * @param {string} p.command - Command to log
 * @param {Array}  p.args - Arguments to add to the command
 * @param {object} p.env - Environment variables
 * @param {object} options - Lib options
 * */
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
