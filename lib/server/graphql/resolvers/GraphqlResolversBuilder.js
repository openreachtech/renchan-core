import FilterSchemaHashBuilder from './FilterSchemaHashBuilder.js'
import ResolverSchemaHashBuilder from './ResolverSchemaHashBuilder.js'
import ExceptionCatchingProxyBuilder from './ExceptionCatchingProxyBuilder.js'

/**
 * Graphql resolvers builder.
 */
export default class GraphqlResolversBuilder {
  /**
   * Constructor.
   *
   * @param {GraphqlResolversBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    filterSchemaHash,
    actualResolverSchemaHash,
    stubResolverSchemaHash,
    exceptionCatchingProxyBuilder,
  }) {
    this.filterSchemaHash = filterSchemaHash
    this.actualResolverSchemaHash = actualResolverSchemaHash
    this.stubResolverSchemaHash = stubResolverSchemaHash
    this.exceptionCatchingProxyBuilder = exceptionCatchingProxyBuilder
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlResolversBuilder ? X : never} T, X
   * @param {GraphqlResolversBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    filterSchemaHash = {},
    actualResolverSchemaHash = {},
    stubResolverSchemaHash = {},
    exceptionCatchingProxyBuilder,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        filterSchemaHash,
        actualResolverSchemaHash,
        stubResolverSchemaHash,
        exceptionCatchingProxyBuilder,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof GraphqlResolversBuilder ? X : never} T, X
   * @param {GraphqlResolversBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    engine,
  }) {
    const {
      actualResolversPath,
      stubResolversPath,
    } = engine.config

    const actualResolverSchemaHash = await this.buildResolverSchemaHash({
      poolPath: actualResolversPath,
    })
    const stubResolverSchemaHash = await this.buildResolverSchemaHash({
      poolPath: stubResolversPath,
    })

    const schemas = this.extractSchemas({
      schemaHash: actualResolverSchemaHash,
    })
    const filterSchemaHash = await this.buildFilterSchemaHash({
      engine,
      actualSchemas: schemas,
    })

    const exceptionCatchingProxyBuilder = this.createExceptionCatchingProxyBuilder({
      engine,
    })

    const args = Object.fromEntries(
      [
        ['actualResolverSchemaHash', actualResolverSchemaHash],
        ['stubResolverSchemaHash', stubResolverSchemaHash],
      ]
        .filter(([, value]) => value !== null)
    )

    return this.create({
      ...args,
      filterSchemaHash,
      exceptionCatchingProxyBuilder,
    })
  }

  /**
   * Build filter schema hash.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   *   actualSchemas: Array<string>
   * }} params - Parameters.
   * @returns {Promise<BuiltSchemaHash | null>} - Filter schema hash.
   */
  static async buildFilterSchemaHash ({
    engine,
    actualSchemas,
  }) {
    const skipSchemaHash = {
      allowedSchemas: actualSchemas,
      ignoredSchemas: engine.schemasToSkipFiltering,
    }

    const builder = this.createFilterSchemaHashBuilder({
      skipSchemaHash,
    })

    const generator = engine.generateFilterHandler()

    return builder.buildSchemaHash({
      sharedValue: generator,
    })
  }

  /**
   * Create filter schema hash builder.
   *
   * @param {{
   *   skipSchemaHash: import('./FilterSchemaHashBuilder.js').FilterSchemaHashBuilderFactoryParams
   * }} params - Parameters.
   * @returns {FilterSchemaHashBuilder} - Filter schema hash builder.
   */
  static createFilterSchemaHashBuilder ({
    skipSchemaHash,
  }) {
    return FilterSchemaHashBuilder.create(skipSchemaHash)
  }

  /**
   * Build resolver schema hash.
   *
   * @param {{
   *   poolPath: string | null
   * }} params - Parameters.
   * @returns {Promise<BuiltSchemaHash | null>} - Resolver schema hash.
   */
  static async buildResolverSchemaHash ({
    poolPath,
  }) {
    if (!poolPath) {
      return null
    }

    const builder = await ResolverSchemaHashBuilder.createAsync({
      poolPath,
    })

    return builder.buildSchemaHash()
  }

  /**
   * Extract schemas.
   *
   * @param {{
   *   schemaHash: BuiltSchemaHash
   * }} params - Parameters.
   * @returns {Array<string>} - Schemas.
   */
  static extractSchemas ({
    schemaHash,
  }) {
    if (!schemaHash) {
      return []
    }

    return Object.keys(schemaHash)
  }

  /**
   * Create exception catching proxy builder.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters.
   * @returns {ExceptionCatchingProxyBuilder} - Exception catching proxy builder.
   */
  static createExceptionCatchingProxyBuilder ({
    engine,
  }) {
    return ExceptionCatchingProxyBuilder.create({
      engine,
    })
  }

  /**
   * get: Constructor of this class.
   *
   * @template {X extends typeof GraphqlResolversBuilder ? X : never} T, X
   * @returns {T} - Constructor of this class.
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * Build resolver hash.
   *
   * @returns {GraphqlType.ResolversOperationHash} - Resolvers operation hash.
   */
  buildResolverHash () {
    const schemas = [...new Set([
      ...Object.keys(this.actualResolverSchemaHash),
      ...Object.keys(this.stubResolverSchemaHash),
    ])]

    const allBuildResolvers = schemas
      .map(it => {
        const filter = this.filterSchemaHash[it]
        const resolver =
          this.actualResolverSchemaHash[it]
          ?? this.stubResolverSchemaHash[it]

        const resolve = this.generateResolverResolveCallback({
          filter,
          resolver,
        })

        const subscribe = this.generateSubscribeCallback({
          filter,
          resolver,
        })

        const subscriptionResolve = this.generateSubscriptionResolveCallback({
          resolver,
        })

        return {
          schema: it,
          operation: resolver.operation,

          resolve,
          subscribe,
          subscriptionResolve,
        }
      })

    const groupedResolvers = {
      Query: Object.fromEntries(
        allBuildResolvers
          .filter(it => it.operation === 'Query')
          .map(({ schema, resolve }) => [
            schema,
            resolve,
          ])
      ),
      Mutation: Object.fromEntries(
        allBuildResolvers
          .filter(it => it.operation === 'Mutation')
          .map(({ schema, resolve }) => [
            schema,
            resolve,
          ])
      ),
      Subscription: Object.fromEntries(
        allBuildResolvers
          .filter(it => it.operation === 'Subscription')
          .map(({ schema, subscribe, subscriptionResolve }) => [
            schema,
            {
              subscribe,
              resolve: subscriptionResolve,
            },
          ])
      ),
    }

    return Object.fromEntries(
      Object.entries(groupedResolvers)
        .filter(([, resolvers]) => Object.keys(resolvers).length > 0)
    )
  }

  /**
   * Generate resolver resolve callback.
   *
   * @param {{
   *   filter: Function
   *   resolver: GraphqlType.Resolver
   * }} params - Parameters.
   * @returns {ResolverResolveFunction} - Resolve callback.
   */
  generateResolverResolveCallback ({
    filter,
    resolver,
  }) {
    const realFunction = async (
      parent,
      variables,
      context,
      information
    ) => {
      const envelope = {
        variables,
        context,
        information,
        parent,
      }

      await filter?.(envelope)

      return resolver.resolve?.(envelope)
    }

    return this.exceptionCatchingProxyBuilder.buildProxyAsync({
      realFunction,
    })
  }

  /**
   * Generate subscription subscribe callback.
   *
   * @param {{
   *   filter: Function
   *   resolver: GraphqlType.Resolver
   * }} params - Parameters.
   * @returns {SubscriptionSubscribeFunction} - Subscribe callback.
   */
  generateSubscribeCallback ({
    filter,
    resolver,
  }) {
    const realFunction = async (
      parent,
      variables,
      context,
      information
    ) => {
      const envelope = {
        variables,
        context,
        information,
        parent,
      }

      await filter?.(envelope)

      return resolver.subscribe?.(envelope)
    }

    return this.exceptionCatchingProxyBuilder.buildProxyAsync({
      realFunction,
    })
  }

  /**
   * Generate subscription resolve callback.
   *
   * @param {{
   *   resolver: import('./BaseSubscriptionResolver').default
   * }} params - Parameters
   * @returns {SubscriptionResolveFunction} - Subscription resolve callback
   */
  generateSubscriptionResolveCallback ({
    resolver,
  }) {
    const realFunction = payload => resolver.resolve(payload)

    return this.exceptionCatchingProxyBuilder.buildProxy({
      realFunction,
    })
  }
}

/**
 * @typedef {{
 *   filterSchemaHash: Record<string, Function>
 *   actualResolverSchemaHash: BuiltSchemaHash
 *   stubResolverSchemaHash: BuiltSchemaHash
 *   exceptionCatchingProxyBuilder: import('./ExceptionCatchingProxyBuilder').default
 * }} GraphqlResolversBuilderParams
 */

/**
 * @typedef {{
 *   filterSchemaHash?: BuiltSchemaHash
 *   actualResolverSchemaHash?: BuiltSchemaHash
 *   stubResolverSchemaHash?: BuiltSchemaHash
 *   exceptionCatchingProxyBuilder: import('./ExceptionCatchingProxyBuilder').default
 * }} GraphqlResolversBuilderFactoryParams
 */

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} GraphqlResolversBuilderAsyncFactoryParams
 */

/**
 * @typedef {Record<string, GraphqlType.Resolver>} BuiltSchemaHash
 */

/**
 * @typedef {(
 *   parent: GraphqlType.ResolverInputParent,
 *   variables: GraphqlType.ResolverInputVariables,
 *   context: GraphqlType.ResolverInputContext,
 *   information: GraphqlType.ResolverInputInformation
 * ) => Promise<GraphqlType.ResolverOutput>} ResolverResolveFunction
 */

/**
 * @typedef {(
 *   parent: GraphqlType.ResolverInputParent,
 *   variables: GraphqlType.ResolverInputVariables,
 *   context: GraphqlType.ResolverInputContext,
 *   information: GraphqlType.ResolverInputInformation
 * ) => Promise<AsyncIterator<*, *, *>>} SubscriptionSubscribeFunction // <T, TReturn, TNext>
 */

/**
 * @typedef {(
 *   payload: *,
 * ) => *} SubscriptionResolveFunction
 */
