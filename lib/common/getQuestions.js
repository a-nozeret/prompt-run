const path = require('path')

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
