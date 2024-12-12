describe('Empty priority group 02', () => {
  describe('First', () => {
    const cases = [
      71,
      72,
      73,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
