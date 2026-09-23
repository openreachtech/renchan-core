import {
  getNamedType,
  isIntrospectionType,
} from 'graphql'

import BaseGraphqlRequestValidator from '../BaseGraphqlRequestValidator.js'

/**
 * GraphQL request validator to deny introspection.
 *
 * `__schema` and `__type` are meta-fields `graphql` adds to the root `Query` type,
 * so an endpoint answers them unless a rule denies them.
 *
 * What is denied is every field resolving to an introspection type, not the two meta-fields alone,
 * so a document reaching into the schema is reported once per field on the way down.
 *
 * Introspection is denied on production alone.
 *
 * @extends {BaseGraphqlRequestValidator}
 */
export default class IntrospectionAccessedGraphqlRequestValidator extends BaseGraphqlRequestValidator {
  /** @override */
  static get errorName () {
    return 'IntrospectionAccessed'
  }

  /**
   * get: getNamedType function.
   *
   * @returns {typeof getNamedType} - getNamedType function.
   */
  static get getNamedType () {
    return getNamedType
  }

  /**
   * get: isIntrospectionType function.
   *
   * @returns {typeof isIntrospectionType} - isIntrospectionType function.
   */
  static get isIntrospectionType () {
    return isIntrospectionType
  }

  /**
   * Check whether this validator applies to an endpoint.
   *
   * Introspection is denied on production alone.
   * Pre-production is where GraphiQL and client code generation live,
   * and both of them depend on introspection.
   *
   * @override
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this method.
   * @returns {boolean} - true if this validator applies.
   * @public
   */
  static isAcceptable ({
    engine,
  }) {
    return engine.env.isProduction()
  }

  /**
   * get: Constructor.
   *
   * @override
   * @returns {typeof IntrospectionAccessedGraphqlRequestValidator} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Define validation rule.
   *
   * @override
   * @returns {GraphqlType.ValidationRule} - Validation rule.
   * @public
   */
  defineValidationRule () {
    return context => ({
      Field: node => {
        this.reportIntrospectionField({
          context,
          node,
        })
      },
    })
  }

  /**
   * Report field resolving to an introspection type.
   *
   * @param {{
   *   context: GraphqlType.ValidationContext
   *   node: import('graphql').FieldNode
   * }} params - Parameters of this method.
   * @returns {void}
   */
  reportIntrospectionField ({
    context,
    node,
  }) {
    if (
      !this.isIntrospectionField({
        context,
      })
    ) {
      return
    }

    const error = this.createError({
      value: {
        fieldName: node.name.value,
      },
    })

    const graphqlError = error.toGraphQLError()

    context.reportError(graphqlError)
  }

  /**
   * Check whether the field being visited resolves to an introspection type.
   *
   * A field whose type the context cannot resolve is not one.
   * That is a field the schema does not define, which the specified rules reject on their own.
   *
   * @param {{
   *   context: GraphqlType.ValidationContext
   * }} params - Parameters of this method.
   * @returns {boolean} - true if the field resolves to an introspection type.
   */
  isIntrospectionField ({
    context,
  }) {
    const type = this.Ctor.getNamedType(
      context.getType()
    )

    if (!type) {
      return false
    }

    return this.Ctor.isIntrospectionType(type)
  }
}
