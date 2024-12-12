import Env from '@openreachtech/renchan-env'

const {
  EnvironmentFacade,
} = Env

const facade = EnvironmentFacade.create()

/** @type {EnvType} */
export default /** @type {*} */ (
  facade.generateFacade()
)

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
