import {
  createHandler,
} from 'graphql-http/lib/use/express'

import GraphqlSchemaBuilder from './GraphqlSchemaBuilder.js'

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
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        schema,
        context,
        rootValue,
        formatError,
        validationRules,
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

    return this.create({
      ...this.extraCreateHandlerParams,

      schema,
      context: contextFactory,
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
