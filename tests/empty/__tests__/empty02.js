describe('Second empty finders', () => {
  const cases = [
    41,
    42,
    43,
  ]
  test.each(cases)('value: %s', async value => {
    expect(value)
      .toBe(value)
  })
})
