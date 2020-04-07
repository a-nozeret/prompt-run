<h1 align="center">🏃 prompt-run</h1>
  
  [![NPM](https://img.shields.io/npm/v/prompt-run.svg?logo=npm)](https://www.npmjs.com/package/prompt-run)
  [![Travis Build](https://img.shields.io/travis/a-nozeret/prompt-run/master.svg?logo=travis-ci)](https://travis-ci.org/a-nozeret/prompt-run)
  [![Codecov Coverage](https://img.shields.io/codecov/c/github/a-nozeret/prompt-run/master.svg?logo=codecov)](https://codecov.io/gh/a-nozeret/prompt-run/)
  [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Run commands based on user input, dynamically generating environment variables, arguments, flags

## Getting started

```sh
yarn add -D prompt-run
```
```sh
prompt-run [options] [command]
```

## API
**Note:** Check the [**Inquirer** documentation](https://github.com/SBoudrias/Inquirer.js#objects) for full details on how to create question objects.

### CLI
```
  Usage
    $ prompt-run [options] [command]

  Options
    --config, -c <filename>  Path to questions config file
    --prefix, -p <prefix>    Prompt scripts with the provided prefix
    --dry-run                No execution after generating the command
    --silent, -s             Disable output of generated command
```
### Module
```js
const promptRun = require('prompt-run')

promptRun({
  command: 'yarn',
  options: {},
  questions: {
    env: [],
    args: [],
  },
}).then((childProcess) => {})
```

#### Command
The base used to run along the generated command.

*Default*: `yarn` (or `npm run` if your project doesn't contain a `yarn.lock` file)

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
#### 1. CLI
With a defined config of questions

<img src="https://github.com/a-nozeret/prompt-run/raw/master/docs/example-1-cli.gif?raw=true" alt="example-1-cli" width="550"/>

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
  args: [
    {
      type: 'confirm',
      name: '--watch',
      default: false,
    },
    {
      name: '--log-level',
      type: 'list',
      choices: ['error', 'warning'],
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
$ NODE_ENV=development SECRET_KEY=1234 yarn start --watch --log-level warning
```

#### 2. Scripts
As a node module in scripts

<img src="https://github.com/a-nozeret/prompt-run/raw/master/docs/example-2-script.gif?raw=true" alt="example-2-script" width="550"/>

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

#### 3. Prefix shortcut
Prompt existing scripts starting with a given prefix

<img src="https://github.com/a-nozeret/prompt-run/raw/master/docs/example-3-prefix.gif?raw=true" alt="example-3-prefix" width="550"/>

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
```sh
yarn
yarn link
...
yarn test --coverage
yarn lint
yarn commit
yarn unlink
```
### Publish / release
```sh
yarn release
git push --follow-tags origin master
```
> A [Github Action](https://github.com/a-nozeret/prompt-run/blob/master/.github/workflows/npmpublish.yml) will be triggered, publishing the package to NPM


### Todo list
+ Bugs:
  + Inquirer errors do not appear directly in CLI mode
+ Configs should consist in promptRun Object argument
+ feature: `$ prompt-run -env NODE_ENV yarn start` shortcut for question

## License

Licensed under the MIT License, Copyright © 2019-present Antoine Nozeret.

See [LICENSE](./LICENSE) for more information.
