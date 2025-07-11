describe('Model', () => {
  class TestKeeper {
    static async findOne () {
      return Promise.resolve(null)
    }
  }

  const cases = Object.values(globalThis.sequelizeActivator.modelHash)
    .map(Model => ({
      Model,
    }))
    .concat({
      Model: TestKeeper,
    })

  test.each(cases)('Model: $Model.name', async ({ Model }) => {
    await expect(Model.findOne())
      .resolves
      .not
      .toThrow()
  })
})
