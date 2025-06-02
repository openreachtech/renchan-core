import BaseGraphqlShare from '../../../../lib/server/graphql/contexts/BaseGraphqlShare.js'
import AiResponseRedisClerk from '../../redis/AiResponseRedisClerk.js'

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
 * GraphQL shared object for Customer.
 */
export default class CustomerGraphqlShare extends BaseGraphqlShare {
  /**
   * Constructor.
   *
   * @param {CustomerGraphqlShareParams} params - Parameters of this constructor.
   */
  constructor ({
    extraClient,
    redisClerkHash,
    ...restArgs
  }) {
    super(restArgs)

    this.extraClient = extraClient
    this.redisClerkHash = redisClerkHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CustomerGraphqlShare ? X : never} T, X
   * @param {CustomerGraphqlShareFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    extraClient,
    redisClerkHash,
    ...restArgs
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        extraClient,
        redisClerkHash,
        ...restArgs,
      })
    )
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CustomerGraphqlShare ? X : never} T, X
   * @param {CustomerGraphqlShareAsyncFactoryParams} params - Parameters of this factory method.
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

    const aiResponseRedisClerk = this.createAiResponseRedisClerk({
      config,
    })

    return this.create({
      env: this.generateEnv(),
      broker,
      extraClient,
      redisClerkHash: {
        aiResponse: aiResponseRedisClerk,
      },
    })
  }

  /**
   * Create AI response Redis clerk.
   *
   * @param {{
   *   config: GraphqlType.Config
   * }} params - Parameters of this method.
   * @returns {AiResponseRedisClerk} - Environment object.
   */
  static createAiResponseRedisClerk ({
    config,
  }) {
    const options = {
      ...config.redisOptions,
      db: 1, // Use a different database for AI responses
    }

    return AiResponseRedisClerk.create({
      options,
    })
  }

  /**
   * Get the type of this GraphQL share.
   *
   * @returns {AiResponseRedisClerk} AI response Redis clerk.
   */
  get aiResponseRedisClerk () {
    return this.redisClerkHash.aiResponse
  }
}

/**
 * @typedef {import('../../../../lib/server/graphql/contexts/BaseGraphqlShare.js').BaseGraphqlShareParams & {
 *   extraClient: ExtraClient
 *   redisClerkHash: {
 *     aiResponse: AiResponseRedisClerk
 *   }
 * }} CustomerGraphqlShareParams
 */

/**
 * @typedef {CustomerGraphqlShareParams} CustomerGraphqlShareFactoryParams
 */

/**
 * @typedef {import('../../../../lib/server/graphql/contexts/BaseGraphqlShare.js').BaseGraphqlShareAsyncFactoryParams} CustomerGraphqlShareAsyncFactoryParams
 */
