const parseCommand = require('../../lib/common/parseCommand')

describe('common/parseCommand', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('return value depending on package manager, for empty arguments', () => {
    let result = parseCommand({ command: '', options: {}, pm: 'yarn' })

    expect(result).toEqual(['yarn'])

    result = parseCommand({ command: '', options: {}, pm: 'npm' })
    expect(result).toEqual(['npm', 'run'])
  })

  it('return value for option.prefix', () => {
    const result = parseCommand({ command: [''], options: { prefix: true } })

    expect(result).toEqual(['yarn'])
  })

  it('return value for command of type string', () => {
    const result = parseCommand({ command: 'eslint -c .eslintrc' })

    expect(result).toEqual(['eslint', '-c', '.eslintrc'])
  })

  it('return value for command of type Array', () => {
    const result = parseCommand({ command: ['eslint', '-c', '.eslintrc'] })

    expect(result).toEqual(['eslint', '-c', '.eslintrc'])
  })
})
