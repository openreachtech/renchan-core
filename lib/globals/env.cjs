'use strict'

const env = require('@openreachtech/renchan-env/scripts/env')

/** @type {EnvType} */
module.exports = /** @type {*} */ (env)

/**
 * @typedef {import('@openreachtech/renchan-env').EnvironmentFacade.EnvironmentFacadeInterface & {
 *   NODE_ENV: string
 *   DATABASE_NAME: string
 *   DATABASE_USERNAME: string
 *   DATABASE_PASSWORD: string
 *   DATABASE_DIALECT: string
 *   DATABASE_HOST: string
 *   DATABASE_PORT: string
 *   [key: string]: string
 * }} EnvType
 */
