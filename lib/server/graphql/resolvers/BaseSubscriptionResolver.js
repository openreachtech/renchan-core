import ChannelGenerator from '../subscription/ChannelGenerator.js'
import BaseResolver from './BaseResolver.js'

/**
 * Base graphql resolver for Query.
 *
 * @template {GraphqlType.ResolverInputVariables} V
 * @template {GraphqlType.ResolverOutput} R
 * @abstract
 * @extends {BaseResolver<V, R>}
 */
export default class BaseSubscriptionResolver extends BaseResolver {
  /** @override */
  static get operation () {
    return 'Subscription'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /**
   * get: Channel prefix.
   *
   * @returns {string} - Channel prefix.
   */
  static get channelPrefix () {
    return this.schema
  }

  /**
   * Resolve for the schema.
   *
   * @param {{
   *   [schema: string]: *,
   * }} payload - Payload.
   * @returns {*} - Resolved value.
   */
  resolve (payload) {
    return payload[this.schema]
  }

  /**
   * Subscribe for this schema.
   *
   * @param {GraphqlType.ResolverInput<V>} params - Parameters.
   * @returns {Promise<AsyncIterable<R>>} - Subscription response.
   */
  async subscribe ({
    variables,
    context,
    information,
    parent,
  }) {
    const canSubscribe = await this.canSubscribe({
      variables,
      context,
      information,
      parent,
    })

    if (!canSubscribe) {
      throw this.createCanNotSubscribeError()
    }

    const channelQuery = this.generateChannelQuery({
      variables,
      context,
      information,
      parent,
    })

    const channel = this.generateChannel({
      query: channelQuery,
    })

    return this.generateAsyncIterable({
      context,
      channel,
    })
  }

  /**
   * Check if can subscribe.
   *
   * @param {{
   *   variables: V
   *   context: GraphqlType.ResolverInputContext
   *   information?: GraphqlType.ResolverInputInformation
   *   parent?: GraphqlType.ResolverOutput
   * }} params - Parameters.
   * @returns {Promise<boolean>} - Whether can subscribe.
   */
  async canSubscribe ({
    variables,
    context,
    information,
    parent,
  }) {
    return true
  }

  /**
   * get: CanNotSubscribe error.
   *
   * @param {{
   *   context: GraphqlType.ResolverInputContext
   * }} params - Parameters.
   * @returns {GraphqlType.Error} - CanNotSubscribe error.
   */
  createCanNotSubscribeError ({
    context,
  }) {
    return context.engine
      .errorHash
      .CanNotSubscribe
      .create()
  }

  /**
   * Publish a topic.
   *
   * @param {{
   *   context: GraphqlType.Context
   *   payload: Record<string, *>
   *   channelQuery?: Record<string, string | number>
   * }} params - Parameters.
   * @returns {Promise<void>} - No return.
   */
  static async publishTopic ({
    context,
    payload,
    channelQuery = {},
  }) {
    const topic = this.buildTopic({
      payload,
      channelQuery,
    })

    await context.broker.publish(topic)
  }

  /**
   * Build a topic.
   *
   * @template P
   * @param {{
   *   payload: P
   *   channelQuery?: Record<string, string | number>
   * }} params - Parameters.
   * @returns {{
   *   channel: string
   *   message: {
   *     [schema: string]: P
   *   }
   * }} - Topic.
   */
  static buildTopic ({
    payload,
    channelQuery = {},
  }) {
    const generator = ChannelGenerator.create({
      prefix: this.channelPrefix,
    })

    return {
      channel: generator.generateChannel({
        query: channelQuery,
      }),
      message: {
        [this.schema]: payload,
      },
    }
  }

  /**
   * Generate channel.
   *
   * @param {{
   *   query?: Record<string, string | number>
   * }} [params] - Parameter.
   * @returns {string | null} - Channel.
   */
  generateChannel ({
    query = {},
  } = {}) {
    /** @type {typeof BaseSubscriptionResolver} */
    const SubscriptionResolver = /** @type {*} */ (this.Ctor)

    const generator = ChannelGenerator.create({
      prefix: SubscriptionResolver.channelPrefix,
    })

    return generator.generateChannel({
      query,
    })
  }

  /**
   * Generate channel query.
   *
   * @param {{
   *   variables: V
   *   context: GraphqlType.ResolverInputContext
   *   information?: GraphqlType.ResolverInputInformation
   *   parent?: GraphqlType.ResolverOutput
   * }} params - Parameters.
   * @returns {Record<string, string | number>} - Channel query.
   */
  generateChannelQuery ({
    variables,
    context,
    information,
    parent,
  }) {
    return {}
  }

  /**
   * Subscribe via broker.
   *
   * @param {{
   *   context: GraphqlType.ResolverInputContext
   *   channel: string
   * }} params - Parameters.
   * @returns {AsyncIterable<*>} - Subscription response.
   */
  generateAsyncIterable ({
    context,
    channel,
  }) {
    return /** @type {*} */ (
      context.broker
        .generateAsyncIterable({
          channel,
        })
    )
  }
}
