import {
  createHandler,
} from 'graphql-http/lib/use/express'

import {
  applyMiddleware,
} from 'graphql-middleware'

import GraphqlSchemaBuilder from './GraphqlSchemaBuilder.js'
import GraphqlPostWorkerHashBuilder from './post-workers/GraphqlPostWorkerHashBuilder.js'
import GraphqlResolvedParcelPorter from './post-workers/GraphqlResolvedParcelPorter.js'

/**
 * NOTE: params of createHandler options
 * - schema (include resolvers)
 * - rootValue
 * - context
 * - formatError
 * - validationRules
 */

/**
 * GraphQL HTTP handler builder.
 *
 * @note
 * Require paths
 * - schema file path (schemaFilePath)
 * - actual resolvers directory path (actualResolversPath)
 * - stub resolvers directory path (stubResolversPath)
 */
export default class GraphqlHttpHandlerBuilder {
  /**
   * Constructor.
   *
   * @param {GraphqlHttpHandlerBuilderParams} options - Parameters of this constructor.
   */
  constructor ({
    schema,
    context,
    rootValue,
    formatError,
    validationRules,

    onResolved,
    postWorkerHash,
    parcelPorter,
  }) {
    this.schema = schema
    this.context = context
    this.rootValue = rootValue
    this.formatError = formatError
    this.validationRules = validationRules

    this.onResolved = onResolved
    this.postWorkerHash = postWorkerHash
    this.parcelPorter = parcelPorter
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlHttpHandlerBuilder ? X : never} T, X
   * @param {GraphqlHttpHandlerBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    schema,
    context,
    rootValue,
    formatError,
    validationRules,

    onResolved,
    postWorkerHash,
    parcelPorter,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        schema,
        context,
        rootValue,
        formatError,
        validationRules,

        onResolved,
        postWorkerHash,
        parcelPorter,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof GraphqlHttpHandlerBuilder ? X : never} T, X
   * @param {GraphqlHttpHandlerBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    engine,
  }) {
    const schema = await this.buildSchema({
      engine,
    })
    const contextFactory = this.generateContextFactory({
      engine,
    })

    const onResolved = engine.defineOnResolved()
    const postWorkerHash = await this.generateOnResolvedSchemaHash({
      engine,
    })
    const parcelPorter = this.createParcelPorter()

    return this.create({
      ...this.extraCreateHandlerParams,

      schema,
      context: contextFactory,

      onResolved,
      postWorkerHash,
      parcelPorter,
    })
  }

  /**
   * get: SchemaBuilder class.
   *
   * @returns {typeof GraphqlSchemaBuilder} - SchemaBuilder class.
   */
  static get SchemaBuilder () {
    return GraphqlSchemaBuilder
  }

  /**
   * get: extra create handler params.
   * - rootValue
   * - formatError
   * - validationRules
   * - etc.
   *
   * @returns {Record<string, any>} - Extra create handler params.
   */
  static get extraCreateHandlerParams () {
    return {}
  }

  /**
   * Build schema.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {Promise<GraphqlType.Schema>} - GraphQL schema.
   */
  static async buildSchema ({
    engine,
  }) {
    const builder = this.SchemaBuilder
      .create({
        engine,
      })

    return builder.buildSchema()
  }

  /**
   * Generate context factory.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {GraphqlType.ContextFactory} - GraphQL context factory.
   */
  static generateContextFactory ({
    engine,
  }) {
    return async (req, params) => this.buildContext({
      expressRequest: req,
      requestParams: params,
      engine,
    })
  }

  /**
   * Generate post worker hash.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {Promise<Record<string, (parcel: GraphqlType.OnResolvedParcel) => Promise<void>>>} - Post worker hash.
   */
  static async generateOnResolvedSchemaHash ({
    engine,
  }) {
    const builder = await this.createPostWorkerHashBuilder({
      engine,
    })

    return builder.buildOnResolvedSchemaHash()
  }

  /**
   * Create post worker hash builder.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {Promise<GraphqlType.PostWorkerHashBuilder>} - Post worker hash builder.
   */
  static async createPostWorkerHashBuilder ({
    engine,
  }) {
    return GraphqlPostWorkerHashBuilder.createAsync({
      engine,
    })
  }

  /**
   * Create parcel porter.
   *
   * @returns {GraphqlType.ResolvedParcelPorter}
   */
  static createParcelPorter () {
    return GraphqlResolvedParcelPorter.create()
  }

  /**
   * get: applyMiddleware.
   *
   * @returns {typeof applyMiddleware} - applyMiddleware function.
   */
  static get applyMiddleware () {
    return applyMiddleware
  }

  /**
   * Build context.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   requestParams: GraphqlType.HttpRequestParams
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {Promise<GraphqlType.Context>} - GraphQL context.
   */
  static async buildContext ({
    expressRequest,
    requestParams,
    engine,
  }) {
    const context = await engine.Ctor.Context
      .createAsync({
        expressRequest,
        requestParams,
        engine,
      })

    return context
  }

  /**
   * get: Own class.
   *
   * @returns {typeof GraphqlHttpHandlerBuilder}
   */
  get Ctor () {
    return /** @type {typeof GraphqlHttpHandlerBuilder} */ (this.constructor)
  }

  /**
   * Build GraphQL HTTP handler.
   *
   * @returns {ExpressType.Middleware} - GraphQL HTTP handler.
   * @public
   */
  buildHandler () {
    return createHandler({
      schema: this.schema,
      context: this.context,
      rootValue: this.rootValue,
      formatError: this.formatError,
      validationRules: this.validationRules,
    })
  }

  /**
   * Generate intercepted schema.
   *
   * @returns {ReturnType<applyMiddleware>} - Intercepted schema.
   */
  generateInterceptedSchema () {
    const onResolveMiddleware = this.defineOnResolveMiddleware()

    return this.Ctor.applyMiddleware(
      this.schema,
      onResolveMiddleware
    )
  }

  /**
   * Define onResolve middleware.
   *
   * @returns {(
   *   resolve: Function,
   *   parent: GraphqlType.ResolverInputParent,
   *   variables: GraphqlType.ResolverInputVariables,
   *   context: GraphqlType.Context,
   *   information: GraphqlType.ResolverInputInformation,
   * ) => Promise<*>}
   */
  defineOnResolveMiddleware () {
    return async (...args) => {
      const [
        resolve,
        parent,
        variables,
        context,
        information,
      ] = args

      if (parent) {
        const output = await resolve(
          parent,
          variables,
          context,
          information
        )

        return output
      }

      const expressRequest = /** @type {ExpressType.Request} */ (
        context.expressRequest['raw']
      )

      try {
        const output = await resolve(
          parent,
          variables,
          context,
          information
        )

        this.parcelPorter.saveParcel({
          expressRequest,
          parcel: {
            variables,
            context,
            information,
            response: {
              output,
              error: null,
            },
          },
        })

        return output
      } catch (error) {
        this.parcelPorter.saveParcel({
          expressRequest,
          parcel: {
            variables,
            context,
            information,
            response: {
              output: null,
              error,
            },
          },
        })

        throw error
      }
    }
  }

  /**
   * Define onFinish() middleware.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   * }} params - Parameters of this method.
   * @returns {() => Promise<void>}
   */
  defineOnFinishHandler ({
    expressRequest,
  }) {
    return async () => {
      const parcel = this.parcelPorter.loadParcel({
        expressRequest,
      })

      if (!parcel) {
        return
      }

      await this.onResolved(parcel)

      const individualOnResolved = this.extractIndividualOnResolved({
        information: parcel.information,
      })
      await individualOnResolved?.(parcel)
    }
  }

  /**
   * Extract individual onResolved middleware.
   *
   * @param {{
   *   information: GraphqlType.ResolverInputInformation
   * }} params - Parameters of this method.
   * @returns {(parcel: GraphqlType.OnResolvedParcel) => Promise<void> | null} - Individual onResolved middleware.
   */
  extractIndividualOnResolved ({
    information,
  }) {
    return this.postWorkerHash[information.fieldName]
      ?? null
  }
}

/**
 * @typedef {{
 *   schema: GraphqlType.Schema
 *   context: GraphqlType.ContextFactory
 *   rootValue?: Record<string, any>
 *   formatError?: import('graphql-http').FormatError
 *   validationRules?: import('graphql-http').HandlerOptions['validationRules']
 *   onResolved: (parcel: GraphqlType.OnResolvedParcel) => Promise<void>
 *   postWorkerHash: Record<string, GraphqlType.PostWorker>
 *   parcelPorter: GraphqlType.ResolvedParcelPorter
 * }} GraphqlHttpHandlerBuilderParams
 */

/**
 * @typedef {GraphqlHttpHandlerBuilderParams} GraphqlHttpHandlerBuilderFactoryParams
 */

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} GraphqlHttpHandlerBuilderAsyncFactoryParams
 */
