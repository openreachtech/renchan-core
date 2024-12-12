describe('Seeded priority group 02', () => {
  describe('First', () => {
    const cases = [
      1031,
      1032,
      1033,
    ]

    test.each(cases)('value: %s', async value => {
      expect(value)
        .toBe(value)
    })
  })
})
