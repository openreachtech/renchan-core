describe('Model', () => {
  const cases = Object.values(globalThis.sequelizeActivator.modelHash)
    .map(Model => ({
      Model,
    }))

  test.each(cases)('Model: $Model.name', async ({ Model }) => {
    await expect(Model.findOne())
      .resolves
      .not
      .toThrow()
  })
})
