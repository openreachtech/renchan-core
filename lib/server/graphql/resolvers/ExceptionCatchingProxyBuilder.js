/**
 * Exception catching proxy builder.
 */
export default class ExceptionCatchingProxyBuilder {
  /**
   * Constructor.
   *
   * @param {ExceptionCatchingProxyBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    alternativeExceptionMap,
  }) {
    this.alternativeExceptionMap = alternativeExceptionMap
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ExceptionCatchingProxyBuilder ? X : never} T, X
   * @param {ExceptionCatchingProxyBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
  }) {
    const entries = engine.collectExceptionCatchingMapEntries()

    return /** @type {InstanceType<T>} */ (
      new this({
        alternativeExceptionMap: new Map(entries),
      })
    )
  }

  /**
   * Build exception catching proxy.
   *
   * @template {(...args: Array<*>) => *} F
   * @param {{
   *   realFunction: F
   * }} params - Parameters of this method.
   * @returns {F} - Exception catching proxy.
   */
  buildProxy ({
    realFunction,
  }) {
    return /** @type {*} */ ((...args) => {
      try {
        return realFunction(...args)
      } catch (error) {
        const resolvedError = this.resolveAlternativeError({
          error,
        })

        throw resolvedError
          ?? error
      }
    })
  }

  /**
   * Build exception catching proxy as async.
   *
   * @template {(...args: Array<*>) => Promise<*>} F
   * @param {{
   *   realFunction: F
   * }} params - Parameters of this method.
   * @returns {F} - Exception catching proxy.
   */
  buildProxyAsync ({
    realFunction,
  }) {
    return /** @type {*} */ (async (...args) => {
      try {
        /*
         * NOTE:
         * If directly return Promise with return without assigning it here, the exception will be resolved at runtime.
         * In such implement, it will not be able to catch the exception with try-catch enclosed in this method.
         */
        const result = await realFunction(...args)

        return result
      } catch (error) {
        const resolvedError = this.resolveAlternativeError({
          error,
        })

        throw resolvedError
          ?? error
      }
    })
  }

  /**
   * Resolve alternative exception.
   *
   * @param {{
   *   error: Error | null
   * }} params - Parameters of this method.
   * @returns {GraphqlType.Error | null} - Resolved alternative exception.
   */
  resolveAlternativeError ({
    error,
  }) {
    const entries = [
      ...this.alternativeExceptionMap
        .entries(),
    ]

    const entry = entries
      .find(([bingoFunc]) =>
        bingoFunc(error)
      )
      ?? []

    const [, func] = entry

    if (!(func instanceof Function)) {
      return null
    }

    return func(error)
  }
}

/**
 * @typedef {{
 *   alternativeExceptionMap: GraphqlType.ExceptionCatchingMap
 * }} ExceptionCatchingProxyBuilderParams
 */

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} ExceptionCatchingProxyBuilderFactoryParams
 */
