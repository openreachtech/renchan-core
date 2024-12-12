/**
 * Scalar hash builder.
 */
export default class ScalarHashBuilder {
  /**
   * Constructor.
   *
   * @param {ScalarHashBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    scalars,
  }) {
    this.scalars = scalars
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ScalarHashBuilder ? X : never} T, X
   * @param {ScalarHashBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    scalars,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        scalars,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof ScalarHashBuilder ? X : never} T, X
   * @param {ScalarHashBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    engine,
  }) {
    const collectedScalars = await engine.collectScalars()

    const scalars = collectedScalars
      .map(Scalar =>
        Scalar.create()
      )

    return /** @type {InstanceType<T>} */ (
      this.create({
        scalars,
      })
    )
  }

  /**
   * Build scalar hash.
   *
   * @returns {GraphqlType.CustomerScalarHash} - Scalar hash.
   */
  buildScalarHash () {
    return Object.fromEntries(
      this.scalars.map(it => [
        it.scalarName,
        it.createGraphqlScalarType(),
      ])
    )
  }
}

/**
 * @typedef {{
 *   scalars: Array<GraphqlType.CustomScalar>
 * }} ScalarHashBuilderParams
 */

/**
 * @typedef {ScalarHashBuilderParams} ScalarHashBuilderFactoryParams
 */

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} ScalarHashBuilderAsyncFactoryParams
 */
