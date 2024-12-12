import BaseGraphqlShare from '../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'

/**
 * Extra client.
 *
 * @note This is a dummy class.
 * When implementing actual code,
 * please refer to this ExtraClient in this sample code.
 */
const ExtraClient = class {
  static create ({
    config,
  }) {
    return new this()
  }
}

/**
 * GraphQL shared object for Admin.
 */
export default class AdminGraphqlShare extends BaseGraphqlShare {
  /**
   * Constructor.
   *
   * @param {AdminGraphqlShareParams} params - Parameters of this constructor.
   */
  constructor ({
    extraClient,
    ...restArgs
  }) {
    super(restArgs)

    this.extraClient = extraClient
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof AdminGraphqlShare ? X : never} T, X
   * @param {AdminGraphqlShareFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    extraClient,
    ...restArgs
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        extraClient,
        ...restArgs,
      })
    )
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof AdminGraphqlShare ? X : never} T, X
   * @param {AdminGraphqlShareAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    config,
  }) {
    const extraClient = ExtraClient.create({
      config,
    })

    const broker = this.createBroker({
      config,
    })

    return this.create({
      env: this.generateEnv(),
      broker,
      extraClient,
    })
  }
}

/**
 * @typedef {import('../../../../lib/server/graphql/contexts/BaseGraphqlShare.js').BaseGraphqlShareParams & {
 *   extraClient: ExtraClient
 * }} AdminGraphqlShareParams
 */

/**
 * @typedef {AdminGraphqlShareParams} AdminGraphqlShareFactoryParams
 */

/**
 * @typedef {import('../../../../lib/server/graphql/contexts/BaseGraphqlShare.js').BaseGraphqlShareAsyncFactoryParams} AdminGraphqlShareAsyncFactoryParams
 */
