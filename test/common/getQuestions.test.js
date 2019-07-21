const getQuestions = require('../../lib/common/getQuestions')

const mockConfig = {
  env: [],
}

jest.mock('path', () => ({
  resolve: path => path,
}))

jest.mock('config.mock', () => () => (mockConfig), { virtual: true })

describe('common/getQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('return value given option.config', () => {
    const result = getQuestions({ options: { config: 'config.mock' } })

    expect(result).toEqual(mockConfig)
  })

  it('return value for questions provided', () => {
    const result = getQuestions({ questions: mockConfig })

    expect(result).toEqual(mockConfig)
  })

  it('return value for option.prefix', () => {
    const result = getQuestions({
      options: { prefix: 'start' },
      pkg: { scripts: { 'start:dev': 'yarn ...', 'start:prod': 'yarn ...' } },
    })

    expect(result).toEqual({
      args: [{
        choices: [
          'start:dev',
          'start:prod',
        ],
        message: 'Select a script to run',
        name: 'prefixedScripts',
        type: 'list',
      }],
    })
  })

  it('option.prefix - exit when no scripts are found', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

    getQuestions({
      options: { prefix: 'start' },
      pkg: { scripts: {} },
    })

    expect(mockExit).toHaveBeenCalledWith(1)
    expect(log).toHaveBeenCalled()
  })
})
