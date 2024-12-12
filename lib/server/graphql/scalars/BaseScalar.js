import {
  GraphQLScalarType,
} from 'graphql'

import ConcreteMemberNotFoundGraphqlError from '../errors/concretes/ConcreteMemberNotFoundGraphqlError.js'

/**
 * Base class of GraphQL scalar.
 *
 * @template V - Serializing and Parsing value type.
 *   (Serializing: Server to client)
 *   (Parsing: Client to server)
 * @abstract
 */
export default class BaseScalar {
  /**
   * Constructor of this class.
   *
   * @param {BaseScalarParams} params - Parameters of this constructor.
   */
  constructor ({
    scalarName,
  }) {
    this.scalarName = scalarName
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BaseScalar ? X : never} T, X
   * @param {BaseScalarFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create (params = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        scalarName: this.scalarName,
      })
    )
  }

  /**
   * get: name of this scalar.
   *
   * @abstract
   * @returns {string} - Name of this scalar.
   * @throws {GraphqlType.Error} - concrete member not found.
   */
  static get scalarName () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseScalar.get:scalarName',
      },
    })
  }

  /**
   * get: description of this scalar.
   *
   * @abstract
   * @returns {string} - Description of this scalar.
   * @throws {GraphqlType.Error} - concrete member not found.
   */
  static get description () {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseScalar.get:description',
      },
    })
  }

  /**
   * get: constructor of this class.
   *
   * @template {X extends typeof BaseScalar ? X : never} T, X
   * @returns {T} - Constructor of this class.
   * @this {InstanceType<T>}
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * Serialize value server to client.
   *
   * @abstract
   * @param {{
   *   value: V // Serializing value.
   * }} params - Parameters.
   * @returns {string} - Serialized value.
   * @throws {GraphqlType.Error} - concrete member not found.
   */
  serialize ({
    value,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseScalar#serialize()',
      },
    })
  }

  /**
   * Parse value client to server.
   *
   * @abstract
   * @param {{
   *   value: string
   * }} params - Parameters.
   * @returns {V} - Parsed value.
   * @throws {GraphqlType.Error} - concrete member not found.
   */
  parseValue ({
    value,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseScalar#parseValue()',
      },
    })
  }

  /**
   * Parse AST value.
   *
   * @abstract
   * @param {{
   *   ast: import('graphql').ASTNode
   * }} params - Parameter.
   * @returns {V} Parsed value.
   * @throws {GraphqlType.Error} - concrete member not found.
   */
  parseLiteral ({
    ast,
  }) {
    throw ConcreteMemberNotFoundGraphqlError.create({
      value: {
        memberName: 'BaseScalar#parseLiteral()',
      },
    })
  }

  /**
   * Create GraphQL scalar type.
   *
   * @returns {import('graphql').GraphQLScalarType} - GraphQL scalar type.
   * @public
   */
  createGraphqlScalarType () {
    const options = this.generateGraphqlScalarTypeOptions()

    return new GraphQLScalarType(options)
  }

  /**
   * Generate GraphQL scalar type options.
   *
   * @returns {import('graphql').GraphQLScalarTypeConfig<*>} - GraphQL scalar type options.
   * @this {InstanceType<BaseScalar>}
   */
  generateGraphqlScalarTypeOptions () {
    return {
      name: this.scalarName,
      description: this.Ctor.description,
      serialize: value => this.serialize({ value }),
      parseValue: value => this.parseValue({ value }),
      parseLiteral: ast => this.parseLiteral({ ast }),
    }
  }
}

/**
 * @typedef {{
 *   scalarName: string
 * }} BaseScalarParams
 */

/**
 * @typedef {{}} BaseScalarFactoryParams
 */
