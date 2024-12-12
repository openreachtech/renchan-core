describe('Empty priority group 01', () => {
  describe('Second', () => {
    const cases = [
      61,
      62,
      63,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
