const path = require('path')

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

  return {
    args: [
      {
        type: 'list',
        name: 'prefixedScripts',
        message: `Select a script among prefixed \`${prefix}:\``,
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
 * @param {string}  p.options.config - Lib config
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
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const config = require(confPath)

  return config()
}
