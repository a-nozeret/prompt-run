const meow = require('meow')

const cli = meow(`
  Usage
    $ prompt-run [options] [command]

    Run commands based on user input, dynamically generating environment variables, arguments, flags
        
    <command> : Base used to run along the generated command


  Options
    --config, -c <filename>  Path to questions config file
    --prefix, -p <prefix>    Prompt scripts with the provided prefix
    --dry-run                No execution after generating the command
    --silent, -s             Disable output of generated command

  Examples
    $ prompt-run -s yarn test -u
    $ prompt-run -p test // Will prompt defined scripts, e.g. lint:styles, lint:js, ...
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
    help: {
      type: 'boolean',
      alias: 'h',
    },
  },
})

module.exports = cli
