import bcrypt from 'bcrypt'

const HASH_ROUNDS = 10

/**
 * Encipher.
 */
export default class Encipher {
  /**
   * Constructor.
   *
   * @param {EncipherParams} params - Parameters of this constructor.
   */
  constructor ({
    bcryptHandler,
  }) {
    this.bcryptHandler = bcryptHandler
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof Encipher ? X : never} T, X
   * @param {EncipherFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    bcryptHandler = bcrypt,
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        bcryptHandler,
      })
    )
  }

  /**
   * get: Hash rounds parameter of bcrypt.
   *
   * @returns {number} - Hash rounds.
   */
  get hashRounds () {
    return HASH_ROUNDS
  }

  /**
   * Generate hash.
   *
   * @param {string | Buffer} originalText - Original text to encrypt.
   * @returns {Promise<string>} - Hashed text.
   */
  async hash (originalText) {
    return this.bcryptHandler.hash(
      originalText,
      this.hashRounds
    )
  }

  /**
   * Compare original text with hashed text.
   *
   * @param {string} originalText - Original text.
   * @param {string} hashedText - Hashed text. (from database table)
   * @returns {Promise<boolean>} - true: matched.
   */
  async compare (
    originalText,
    hashedText
  ) {
    // When null, bcrypt.compare() throws Error.
    if (!originalText) {
      return false
    }

    return this.bcryptHandler.compare(
      originalText,
      hashedText
    )
  }
}

/**
 * @typedef {{
 *   bcryptHandler: BcryptHandler
 * }} EncipherParams
 */

/**
 * @typedef {{
 *   bcryptHandler?: BcryptHandler
 * }} EncipherFactoryParams
 */

/**
 * @typedef {{
 *   genSaltSync: Function
 *   genSalt: Function
 *   hashSync: Function
 *   hash: (data: string | Buffer, saltOrRounds: string | number) => Promise<string>
 *   compareSync: Function
 *   compare: (data: string | Buffer, encrypted: string) => Promise<boolean>
 *   getRounds: Function
 * }} BcryptHandler
 */
