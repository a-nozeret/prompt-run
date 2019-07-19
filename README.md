<h1 align="center">🏃 prompt-run</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> Run commands based on user input, dynamically generating environment variables, arguments, flags

## Install

```sh
yarn add -D prompt-run
```

## API
**Note:** Check the [**Inquirer** documentation](https://github.com/SBoudrias/Inquirer.js#objects) for full details on how to create question objects.

### CLI
```
  Usage
    $ prompt-run [options] [command]

  Options
    --config, -c    Path to questions config file
    --prefix, -p    Prompt scripts with the provided prefix
    --dry-run       No execution after generating the command
    --silent, -s    Disable output of generated command
```
### Module
```js
const promptRun = require('prompt-run')

promptRun({
  command: 'yarn',
  options: {},
  questions: {},
}).then((childProcess) => {})
```

#### Command
The base used to run along the generated command.

*Default*: `yarn` (or `npm run` if your projects doesn't contain a `yarn.lock` file)

It can be anything which is not needed to prompt.

#### Options
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| config | string | "prompt-run.js"| Path to questions config file |
| prefix | string | *undefined* | Prompt existing scripts starting with the given prefix |
| dryRun | boolean | false | No execution after generating the command |
| silent | boolean | false | Disable output of the generated command |

#### Questions
##### Questions config file
```js
module.exports = () => ({
  env: [
    // Question objects
  ],
  args: [
    // Question objects
  ],
})
```
The config is divided into:
+ `env`: Node Environment variables to prompt
+ `args`: Arguments/flags prompted. Anything coming after the base command.

##### Questions object
Check the [**Inquirer** documentation](https://github.com/SBoudrias/Inquirer.js#objects) for full details on how to create question objects.

## Examples
### 1. CLI
With a defined config of questions

*questions.js*
```js
module.exports = () => ({
  env: [
    {
      type: 'list',
      name: 'NODE_ENV',
      choices: ['production', 'development'],
    },
    {
      name: 'SECRET_KEY',
    },
  ],
})
```
*Run*
```sh
prompt-run -c questions.js yarn start
```
*Example output / command executed*
```sh
$ NODE_ENV=development SECRET_KEY=1234 yarn start
```

### 2. Scripts
As a node module in scripts

*dependency-info.js*
```js
const promptRun = require('prompt-run')
const packageJson = require('./package.json')

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
}).then((childProcess) => {
  childProcess.on('close', () => {
    console.log('\nFinished with the child process!')
  })
})
```
*Run*
```sh
node dependency-info.js
```

### 3. Prefix shortcut
Prompt existing scripts starting with a given prefix

*package.json*
```json
{
  "scripts": {
    "start:dev": "...",
    "start:prod": "...",
    "start:docker": "..."
  }
}
```
*Run*
```sh
prompt-run -p start
```

## Development
### Pre-commit

```sh
yarn test
yarn lint
```
### Todo list
+ Bugs:
  + When no questions or question without a name
+ Add visual examples
+ Cleanup package on publish
+ Features:
  + Map responses for args starting with "-" to "--key value" or "--key" if boolean
