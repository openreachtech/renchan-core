import {
  Redis,
} from 'ioredis'

import LocalRedis from './LocalRedis.js'

/**
 * Base class for Redis Clerk.
 *
 * @template {string | number | Buffer<ArrayBufferLike>} [V = string]
 * @abstract
 */
export default class BaseRedisClerk {
  /**
   * Constructor.
   *
   * @param {BaseRedisClerkParams} params - Parameters of this constructor.
   */
  constructor ({
    readableRedisClient,
    writableRedisClient,
  }) {
    this.readableRedisClient = readableRedisClient
    this.writableRedisClient = writableRedisClient
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseRedisClerk ? X : never} T, X
   * @param {BaseRedisClerkFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    options,
  }) {
    const readableRedisClient = this.createRedis({
      options,
    })
    const writableRedisClient = this.createRedis({
      options,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        readableRedisClient,
        writableRedisClient,
      })
    )
  }

  /**
   * Create Redis client.
   *
   * @param {{
   *   options: import('ioredis').RedisOptions
   * }} params - Parameters of this method.
   * @returns {Redis} - Redis client.
   */
  static createRedis ({
    options,
  }) {
    const canInstantiateRedis = this.canInstantiateRedis({
      options,
    })

    if (!canInstantiateRedis) {
      return LocalRedis.create({
        options,
      })
    }

    const {
      db = this.db,
      ...restOptions
    } = options

    return new this.RedisCtor({
      db,
      ...restOptions,
    })
  }

  /**
   * Can instantiate Redis client.
   *
   * @param {{
   *   options: import('ioredis').RedisOptions | null
   * }} params - Parameters of this method.
   * @returns {boolean} true: if options are valid, false otherwise.
   */
  static canInstantiateRedis ({
    options,
  }) {
    return options
      && typeof options === 'object'
      && 'host' in options
      && 'port' in options
  }

  /**
   * get: Redis constructor.
   *
   * @returns {typeof Redis} - Redis constructor.
   */
  static get RedisCtor () {
    return Redis
  }

  /**
   * get: Redis database.
   *
   * @abstract
   * @returns {number} - Redis database of RedisOptions.
   * @throws {Error} - If this method is not inherited.
   */
  static get db () {
    throw new Error('this function must be inherited')
  }

  /**
   * Save a value to Redis.
   *
   * @param {{
   *   key: string
   *   value: V
   * }} params - Parameters of this method.
   * @returns {Promise<'OK'>} - Readable Redis client.
   */
  async saveValue ({
    key,
    value,
  }) {
    return this.writableRedisClient.set(key, value)
  }

  /**
   * Load a value from Redis.
   *
   * @param {{
   *   key: string
   * }} params - Parameters of this method.
   * @returns {Promise<string | null>} - Value from Redis or null if not found.
   */
  async loadValue ({
    key,
  }) {
    const value = await this.readableRedisClient.get(key)

    return value ?? null
  }

  /**
   * Delete a value from Redis.
   *
   * @param {{
   *   key: string
   * }} params - Parameters of this method.
   * @returns {Promise<number>} - No return.
   */
  async deleteValue ({
    key,
  }) {
    return this.writableRedisClient.del(key)
  }
}

/**
 * @typedef {{
 *   readableRedisClient: import('ioredis').Redis
 *   writableRedisClient: import('ioredis').Redis
 * }} BaseRedisClerkParams
 */

/**
 * @typedef {{
 *   options: import('ioredis').RedisOptions
 * }} BaseRedisClerkFactoryParams
 */
