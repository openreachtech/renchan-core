describe('Seeded priority group 01', () => {
  describe('First', () => {
    const cases = [
      1011,
      1012,
      1013,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
