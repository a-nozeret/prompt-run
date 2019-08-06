module.exports = () => ({
  args: [
    {
      name: '-c',
      message: '--config - Path to questions config file',
    },
    {
      type: 'confirm',
      name: '-s',
      message: '--silent - Disable output of generated command',
      default: false,
    },
    {
      type: 'confirm',
      name: '--dry-run',
      message: '--dry-run - No execution after generating the command',
      default: false,
    },
    {
      name: '-p',
      message: '--prefix - Prompt scripts with the provided prefix',
    },
    {
      name: 'command',
      message: 'Base command',
    },
  ],
})
