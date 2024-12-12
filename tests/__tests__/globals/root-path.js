import rootPath from '../../../lib/globals/root-path.js'
import RootPath from '../../../lib/tools/RootPath.js'

describe('root-path', () => {
  test('to be instance of own class', () => {
    expect(rootPath)
      .toBeInstanceOf(RootPath)
  })
})
