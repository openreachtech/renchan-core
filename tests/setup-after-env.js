import {
  jest as jestCore,
} from '@jest/globals'

import {
  ConstructorSpy,
} from '@openreachtech/jest-constructor-spy'

import activate from '../app/sequelize/_.js'

import {
  setupExpectEach,
} from '@openreachtech/jest-expect-each'

setupExpectEach()

/*
 * Set global variables.
 */
globalThis.jest = jestCore
globalThis.constructorSpy = ConstructorSpy.create({
  jest: jestCore,
})

const sequelizeActivator = await activate()
globalThis.sequelizeActivator = sequelizeActivator

/*
 * Set global hooks.
 */
afterEach(() => {
  jest.restoreAllMocks()
})

afterAll(async () => {
  await sequelizeActivator.sequelizeClient.close()
})
