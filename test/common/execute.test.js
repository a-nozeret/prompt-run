const execute = require('../../lib/common/execute')

jest.mock('cross-spawn', () => async (...spawnArgs) => spawnArgs)

describe('common/execute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the correct values given empty arguments', async () => {
    const spawnArgs = await execute({ command: '', args: [], env: {} }, {})

    expect(spawnArgs).toEqual(['', [], { env: {}, stdio: 'inherit' }])
  })

  it('returns the correct values given arguments', async () => {
    const spawnArgs = await execute({
      command: 'yarn',
      args: ['build', '--watchAll'],
      env: { HOST: 'localhost' },
    }, { NODE_ENV: 'development' })

    expect(spawnArgs).toEqual([
      'yarn',
      ['build', '--watchAll'],
      { env: { HOST: 'localhost', NODE_ENV: 'development' }, stdio: 'inherit' },
    ])
  })
})
