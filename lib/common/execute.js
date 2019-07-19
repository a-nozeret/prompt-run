const spawn = require('cross-spawn')

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
