describe('Empty priority group 01', () => {
  describe('First', () => {
    const cases = [
      51,
      52,
      53,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
