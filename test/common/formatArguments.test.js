const formatArguments = require('../../lib/common/formatArguments')

describe('common/formatArguments', () => {
  it('return value depending on package manager, for empty arguments', () => {
    const result = formatArguments({
      key: 'value',
      '--flag': 'flag-value',
      '-f': true,
      '--false': false,
      '-x': '',
    })

    expect(result).toEqual(['value', '--flag', 'flag-value', '-f'])
  })
})
