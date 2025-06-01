/** @type {WeakMap<LocalRedisParams, Record<string, string>>} */
const entryPoolMap = new WeakMap()

/**
 * LocalRedis class.
 */
export default class LocalRedis {
  /**
   * Constructor.
   *
   * @param {LocalRedisParams} options - Parameters of this constructor.
   */
  constructor (options) {
    this.options = options

    entryPoolMap.set(options, {})
  }

  /**
   * Factory method.
   *
   * @param {{
   *   options: LocalRedisParams
   * }} params - Parameters of this factory method.
   * @returns {import('ioredis').Redis} - Instance of this constructor.
   */
  static create ({
    options,
  }) {
    return /** @type {*} */ (
      new this(options)
    )
  }

  /**
   * get: Entry pool for this instance.
   *
   * @returns {Record<string, string>} - Entry pool for this instance.
   */
  get entryPool () {
    return entryPoolMap.get(this.options)
  }

  /**
   * Set value by key.
   *
   * @param {string} key - Key to set.
   * @param {string} value - Value to set.
   * @returns {Promise<void>} - Value for the key.
   */
  async set (
    key,
    value
  ) {
    this.entryPool[key] = value
  }

  /**
   * Get value by key.
   *
   * @param {string} key - Key to get.
   * @returns {Promise<string | undefined>} - Value for the key.
   */
  async get (
    key
  ) {
    return this.entryPool[key]
  }

  /**
   * Delete value by key.
   *
   * @param {string} key - Key to delete.
   * @returns {Promise<number>} Number of deleted keys.
   */
  async del (
    key
  ) {
    delete this.entryPool[key]

    return 1
  }
}

/**
 * @typedef {import('ioredis').RedisOptions} LocalRedisParams
 */

/**
 * @typedef {{
 *   options: import('ioredis').RedisOptions
 * }} LocalRedisFactoryParams
 */
