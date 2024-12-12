describe('Seeded priority group 01', () => {
  describe('Second', () => {
    const cases = [
      1021,
      1022,
      1023,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
