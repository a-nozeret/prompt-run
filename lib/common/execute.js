const spawn = require('cross-spawn')

/**
 * Execute - Spawn child process with the given command
 *
 * @param {object} p - Params
 * @param {string} p.command - Command to execute
 * @param {Array}  p.args - Arguments to add to the command
 * @param {object} p.env - Environment variables to add to the command
 * @param {object} processEnv - Current process environment variables
 *
 * @returns {Promise} - Child process
 * */
module.exports = async ({ command, args, env }, processEnv) => (
  spawn(
    command,
    args,
    {
      env: {
        ...env,
        ...processEnv,
      },
      stdio: 'inherit',
    },
  )
)
