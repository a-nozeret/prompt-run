const inquirer = require('inquirer')
const prompt = require('../../lib/common/prompt')

describe('common/prompt', () => {
  const VALUE = i => `VALUE-${i}`

  beforeEach(() => {
    jest.clearAllMocks()
    inquirer.prompt = jest.fn(
      async questions => questions.reduce(
        (acc, { name }, i) => ({ ...acc, [name]: VALUE(i + 1) }), {},
      ),
    )
  })

  it('returns the correct values given empty arguments', async () => {
    const result = await prompt([], {})

    expect(inquirer.prompt).toHaveBeenCalledTimes(0)

    expect(result).toEqual({
      args: [],
      command: undefined,
      env: {},
    })
  })

  it('returns the correct values for given questions and command', async () => {
    const result = await prompt(['yarn', 'test'], {
      env: [
        {
          name: 'question1',
        },
        {
          name: 'question2',
        },
      ],
      args: [
        {
          name: 'question3',
        },
        {
          name: 'question4',
        },
      ],
    })

    expect(inquirer.prompt).toHaveBeenCalledTimes(2)

    expect(result).toEqual({
      command: 'yarn',
      args: [
        'test',
        VALUE(1),
        VALUE(2)],
      env: {
        question1: VALUE(1),
        question2: VALUE(2),
      },
    })
  })
})
