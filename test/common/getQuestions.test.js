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

  it('return value given option.config', async () => {
    const result = getQuestions({ options: { config: 'config.mock' } })

    expect(result).toEqual(mockConfig)
  })

  it('return value for questions provided', async () => {
    const result = getQuestions({ questions: mockConfig })

    expect(result).toEqual(mockConfig)
  })

  it('return value for option.prefix', async () => {
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
        message: 'Select a script among prefixed `start:`',
        name: 'prefixedScripts',
        type: 'list',
      }],
    })
  })
})
