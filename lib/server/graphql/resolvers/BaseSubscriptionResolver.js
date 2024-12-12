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

  /**
   * get: Channel prefix.
   *
   * @returns {string} - Channel prefix.
   */
  static get channelPrefix () {
    return this.schema
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
