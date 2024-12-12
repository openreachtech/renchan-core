import GraphqlResolversLoader from './GraphqlResolversLoader.js'

/**
 * Base class for building a hash of resolvers.
 */
export default class ResolverSchemaHashBuilder {
  /**
   * Constructor.
   *
   * @param {BaseResolverParams} params - Parameters of this constructor.
   */
  constructor ({
    resolvers,
  }) {
    this.resolvers = resolvers
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ResolverSchemaHashBuilder ? X : never} T, X
   * @param {ResolverSchemaHashBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    resolvers,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        resolvers,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof ResolverSchemaHashBuilder ? X : never} T, X
   * @param {ResolverSchemaHashBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    poolPath,
  }) {
    const resolverClasses = await this.loadResolvers({
      poolPath,
    })

    const resolvers = await Promise.all(
      resolverClasses.map(
        async Resolver => Resolver.createAsync()
      )
    )

    return this.create({
      resolvers,
    })
  }

  /**
   * Load resolvers.
   *
   * @param {{
   *   poolPath: string
   * }} params - Parameters.
   * @returns {Promise<Array<GraphqlType.ResolverCtor>>} - Array of resolvers.
   */
  static async loadResolvers ({
    poolPath,
  }) {
    const loader = GraphqlResolversLoader.create({
      poolPath,
    })

    return loader.loadResolvers()
  }

  /**
   * Build schema hash.
   *
   * @returns {Record<string, GraphqlType.Resolver>} - Hash of resolvers.
   */
  buildSchemaHash () {
    return Object.fromEntries(
      this.resolvers
        .map(resolver => [
          resolver.schema,
          resolver,
        ])
    )
  }
}

/**
 * @typedef {{
 *   resolvers: Array<GraphqlType.Resolver>
 * }} BaseResolverParams
 */

/**
 * @typedef {BaseResolverParams} ResolverSchemaHashBuilderFactoryParams
 */

/**
 * @typedef {{
 *   poolPath: string
 * }} ResolverSchemaHashBuilderAsyncFactoryParams
 */
