describe('Empty priority group 02', () => {
  describe('Second', () => {
    const cases = [
      81,
      82,
      83,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
