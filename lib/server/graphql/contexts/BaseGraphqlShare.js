import RenchanEnv from '@openreachtech/renchan-env'

import SubscriptionBroker from '../subscription/SubscriptionBroker.js'

const {
  EnvironmentFacade,
} = RenchanEnv

/**
 * Base Class of GraphQL shared object.
 *
 * @abstract
 */
export default class BaseGraphqlShare {
  /**
   * Constructor.
   *
   * @param {BaseGraphqlShareParams} params - Parameters of this constructor.
   */
  constructor ({
    env,
    broker,
  }) {
    this.env = env
    this.broker = broker
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseGraphqlShare ? X : never} T, X
   * @param {BaseGraphqlShareFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    env = this.generateEnv(),
    broker = null,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        env,
        broker,
      })
    )
  }

  /**
   * Create method as async.
   *
   * @template {X extends typeof BaseGraphqlShare ? X : never} T, X
   * @param {BaseGraphqlShareAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    config,
  }) {
    const broker = this.createBroker({
      config,
    })

    return this.create({
      broker,
    })
  }

  /**
   * Generate environment.
   *
   * @returns {renchan.RenchanEnv} - Environment.
   */
  static generateEnv () {
    return EnvironmentFacade.create()
      .generateFacade()
  }

  /**
   * Create broker.
   *
   * @param {{
   *   config: GraphqlType.Config
   * }} params - Parameters of this method.
   * @returns {GraphqlType.SubscriptionBroker | null} - Broker.
   */
  static createBroker ({
    config,
  }) {
    return this.Broker.create({
      config,
    })
  }

  /**
   * get: SubscriptionBroker.
   *
   * @returns {GraphqlType.SubscriptionBrokerCtor} - Broker.
   */
  static get Broker () {
    return SubscriptionBroker
  }
}

/**
 * @typedef {{
 *   env: renchan.RenchanEnv
 *   broker?: GraphqlType.SubscriptionBroker | null
 * }} BaseGraphqlShareParams
 */

/**
 * @typedef {{
 *   env?: renchan.RenchanEnv
 *   broker?: GraphqlType.SubscriptionBroker | null
 * }} BaseGraphqlShareFactoryParams
 */

/**
 * @typedef {{
 *   config: GraphqlType.Config
 * }} BaseGraphqlShareAsyncFactoryParams
 */
