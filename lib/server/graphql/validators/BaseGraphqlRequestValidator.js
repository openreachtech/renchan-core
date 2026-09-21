import ConcreteMemberNotFoundGraphqlError from '../errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

/**
 * Base class of GraphQL request validator.
 *
 * A request validator declares whether it applies to an endpoint, defines the
 * validation rule performing its test, and creates the error it rejects with
 * from the code its endpoint declares. Handing the rule to `validate()`, and
 * handing the error to a validation context, belong to whoever holds one.
 *
 * @abstract
 */
export default class BaseGraphqlRequestValidator {
  /**
   * Constructor.
   *
   * @param {{
   *   ErrorCtor: typeof import('../errors/RenchanGraphqlError.js').default
   * }} params - Parameters of this constructor.
   */
  constructor ({
    ErrorCtor,
  }) {
    this.ErrorCtor = ErrorCtor
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseGraphqlRequestValidator ? X : never} T, X
   * @param {{
   *   ErrorCtor: typeof import('../errors/RenchanGraphqlError.js').default
   * }} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   * @public
   */
  static create ({
    ErrorCtor,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        ErrorCtor,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * It awaits nothing today.
   * Taking it now costs nothing,
   * and leaves a derived validator that later needs I/O free to await inside its own factory.
   *
   * @template {X extends typeof BaseGraphqlRequestValidator ? X : never} T, X
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   * @public
   */
  static async createAsync ({
    engine,
  }) {
    const ErrorCtor = this.resolveErrorCtor({
      engine,
    })

    return this.create({
      ErrorCtor,
    })
  }

  /**
   * get: Error name to look up in the error hash of an engine.
   *
   * @abstract
   * @returns {string} - Error name.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   */
  static get errorName () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: `${this.name}.get:errorName`,
      },
    })
  }

  /**
   * Check whether this validator applies to an endpoint.
   *
   * A validator tests one thing and is never built where its test does not apply,
   * so what decides that is declared here rather than carried by the instance.
   * A validator applies unless it narrows this itself.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this method.
   * @returns {boolean} - true if this validator applies.
   * @public
   */
  static isAcceptable ({
    engine,
  }) {
    return true
  }

  /**
   * Resolve the error class this validator reports with.
   *
   * An engine declaring nothing under this validator's own name falls back to its `Unknown` error,
   * so a rejection still reaches the client as a code.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this method.
   * @returns {typeof import('../errors/RenchanGraphqlError.js').default} - Error class.
   */
  static resolveErrorCtor ({
    engine,
  }) {
    return engine.errorHash[this.errorName]
      ?? engine.errorHash.Unknown
  }

  /**
   * get: Constructor.
   *
   * A derived class that reads the statics it declares itself overrides this member.
   *
   * @returns {typeof BaseGraphqlRequestValidator} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Define validation rule.
   *
   * @abstract
   * @returns {GraphqlType.ValidationRule} - Validation rule.
   * @throws {Error} - An instance of ConcreteMemberNotFoundGraphqlError.
   * @public
   */
  defineValidationRule () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: `${this.constructor.name}#defineValidationRule()`,
      },
    })
  }

  /**
   * Create the error this validator rejects with.
   *
   * The error class an endpoint declares builds the message from its code and
   * the value, so this is that error itself. Handing it to a validation
   * context belongs to whoever holds one.
   *
   * @param {{
   *   value?: * // Value appended to the error message.
   * }} params - Parameters of this method.
   * @returns {import('../errors/RenchanGraphqlError.js').default} - Error to reject with.
   */
  createError ({
    value = null,
  }) {
    return this.ErrorCtor.create({
      value,
    })
  }
}
