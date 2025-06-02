/**
 * Mock Redis.
 */
export default class MockRedis {
  /**
   * Constructor.
   *
   * @param {MockRedisParams} options - Parameters of this constructor.
   */
  constructor (options) {
    this.options = options
  }

  /**
   * Factory method.
   *
   * @param {MockRedisFactoryParams} [options] - Parameters of this factory method.
   * @returns {import('ioredis').Redis} - Instance of this constructor.
   */
  static create (options) {
    return /** @type {*} */ (
      new this(options)
    )
  }

  /**
   * Disconnect.
   *
   * @returns {void}
   */
  disconnect () {
    // noop
  }
}

/**
 * @typedef {import('ioredis').RedisOptions} MockRedisParams
 */

/**
 * @typedef {MockRedisParams} MockRedisFactoryParams
 */
