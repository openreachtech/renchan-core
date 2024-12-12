import {
  makeExecutableSchema,
} from '@graphql-tools/schema'

import SchemaFilesLoader from './schemas/SchemaFilesLoader.js'
import GraphqlResolversBuilder from './resolvers/GraphqlResolversBuilder.js'
import ScalarHashBuilder from './scalars/ScalarHashBuilder.js'

/**
 * GraphQL schema builder.
 */
export default class GraphqlSchemaBuilder {
  /**
   * Constructor.
   *
   * @param {GraphqlSchemaBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    engine,
  }) {
    this.engine = engine
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlSchemaBuilder ? X : never} T, X
   * @param {GraphqlSchemaBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    engine,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        engine,
      })
    )
  }

  /**
   * get: resolvers builder class.
   *
   * @returns {typeof import ('./resolvers/GraphqlResolversBuilder').default} - Resolvers builder class.
   */
  static get ResolversBuilder () {
    return GraphqlResolversBuilder
  }

  /**
   * get: scalars builder class.
   *
   * @returns {typeof import ('./scalars/ScalarHashBuilder').default} - Scalars builder class.
   */
  static get ScalarsBuilder () {
    return ScalarHashBuilder
  }

  /**
   * get: constructor of this class.
   *
   * @template {X extends typeof GraphqlSchemaBuilder ? X : never} T, X
   * @returns {T} - Constructor of this class.
   * @public
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * Build schema.
   *
   * @returns {Promise<GraphqlType.Schema>} - Graphql schema.
   */
  async buildSchema () {
    const typeDefs = await this.loadSchemaTypeDefs()

    const resolverHash = await this.buildResolverHash()
    const scalarHash = await this.buildCustomScalarHash()

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: {
        ...resolverHash,
        ...scalarHash,
      },
    })

    return schema
  }

  /**
   * Load GraphQL schema type defs.
   *
   * @returns {Promise<string>} - GraphQL schema type defs.
   */
  async loadSchemaTypeDefs () {
    const {
      config: {
        schemaPath,
      },
    } = this.engine

    return SchemaFilesLoader.create({
      schemaPath,
    })
      .loadIntegratedSchema()
  }

  /**
   * Build resolver hash.
   *
   * @returns {Promise<GraphqlType.ResolversOperationHash>} - Resolvers.
   */
  async buildResolverHash () {
    const builder = await this.Ctor.ResolversBuilder
      .createAsync({
        engine: this.engine,
      })

    return builder.buildResolverHash()
  }

  /**
   * Build custom scalarHash.
   *
   * @returns {Promise<GraphqlType.CustomerScalarHash>} - Custom scalar hash.
   */
  async buildCustomScalarHash () {
    const builder = await this.Ctor.ScalarsBuilder
      .createAsync({
        engine: this.engine,
      })

    return builder.buildScalarHash()
  }
}

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} GraphqlSchemaBuilderParams
 */

/**
 * @typedef {GraphqlSchemaBuilderParams} GraphqlSchemaBuilderFactoryParams
 */
