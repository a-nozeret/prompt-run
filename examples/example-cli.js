module.exports = () => ({
  env: [
    {
      type: 'list',
      name: 'NODE_ENV',
      choices: ['production', 'development'],
    },
  ],
  args: [
    {
      type: 'list',
      name: 'option',
      choices: ['--fix', '--debug'],
    },
  ],
})
