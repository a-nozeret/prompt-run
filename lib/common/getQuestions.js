const path = require('path')
const chalk = require('chalk')

/**
 * Questions for prefix - Create questions config for given prefix / pkg.scripts
 *
 * @param {object} pkg - package.json content
 * @param {string} prefix - The prefix
 *
 * @returns {object} - Questions config
 * */
const questionsForPrefix = (pkg, prefix) => {
  const choices = Object.keys(pkg.scripts)
    .filter(name => name.startsWith(`${prefix}:`))

  if (choices.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.red(`| Error -- No scripts prefixed \`${prefix}:\` were found in package.json`),
    )
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow('| Usage: https://github.com/a-nozeret/prompt-run#3-prefix-shortcut'),
    )

    process.exit(1)
  }

  return {
    args: [
      {
        type: 'list',
        name: 'prefixedScripts',
        message: 'Select a script to run',
        choices,
      },
    ],
  }
}

/**
 * Get Questions - Retrieve config or generate config when needed
 *
 * @param {object} p - Params
 * @param {object} p.questions - Raw questions
 * @param {Array}  p.options - Lib options
 * @param {string}  p.options.prefix - Prefix
 * @param {string}  p.options.config - Questions config path
 * @param {object} p.pkg - package.json content
 *
 * @returns {object} - Safe questions config
 * */
module.exports = ({ questions, options, pkg }) => {
  if (questions) {
    return questions
  }

  if (options.prefix) {
    return questionsForPrefix(pkg, options.prefix)
  }

  // Get from module
  const confPath = path.resolve(options.config)

  let config

  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    config = require(confPath)
  } catch (e) {
    if (typeof config !== 'function') {
      console.log(
        chalk(e),
        chalk.yellow(`
| Config file error.
  See usage: https://github.com/a-nozeret/prompt-run#questions-config-file
  "prompt-run -h" for help`),
      )
      process.exit(1)
    }
  }


  return config()
}
