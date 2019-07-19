const promptRun = require('../lib/index')
const packageJson = require('../package.json')

const dependencies = Object.keys(packageJson.dependencies)
const fields = ['description', 'readme', 'version', 'dependencies']

promptRun({
  command: 'yarn info',
  questions: {
    args: [
      {
        type: 'list',
        name: 'dependency',
        message: 'Select a dependency',
        choices: dependencies,
      },
      {
        type: 'list',
        name: 'field',
        message: 'Select a field to print',
        choices: fields,
      },
    ],
  },
})

// promptRun({
//   options: {
//     prefix: 'example',
//   },
// })
