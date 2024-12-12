describe('First empty finders', () => {
  const cases = [
    31,
    32,
    33,
  ]

  test.each(cases)('value: %s', async value => {
    expect(value)
      .toBe(value)
  })
})
