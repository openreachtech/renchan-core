import {
  jest as jestCore,
} from '@jest/globals'

import {
  ConstructorSpy,
} from '@openreachtech/jest-constructor-spy'

import activate from '../app/sequelize/_.js'

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
afterEach(() => { // eslint-disable-line jest/require-top-level-describe
  jest.restoreAllMocks()
})
