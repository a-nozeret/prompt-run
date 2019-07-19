const meow = require('meow')

const cli = meow(`
  Usage
    $ prompt-run [options] [command]

  Options
    --config, -c    Path to config/questions file (default: "prompt-run.js")
    --prefix, -p    Prompt scripts with the provided prefix
    --dry-run       No execution after generating the command
    --silent, -s    Disable output of generated command

  Examples
    $ prompt-run -s yarn test
    $ prompt-run -p test // Will prompt defined scripts, e.g. test:coverage, test:fix, ...
`, {
  booleanDefault: false,
  flags: {
    config: {
      type: 'string',
      default: 'prompt-run.js',
      alias: 'c',
    },
    dryRun: {
      type: 'boolean',
    },
    prefix: {
      type: 'string',
      alias: 'p',
    },
    silent: {
      type: 'boolean',
      alias: 's',
    },
  },
})

module.exports = cli
