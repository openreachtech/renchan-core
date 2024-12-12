import {
  Kind,
} from 'graphql'

import BaseScalar from '../BaseScalar.js'

/**
 * DateTime custom scalar type.
 *
 * @extends {BaseScalar<Date>}
 */
export default class DateTimeScalar extends BaseScalar {
  /** @override */
  static get scalarName () {
    return 'DateTime'
  }

  /** @override */
  static get description () {
    return 'DateTime custom scalar type'
  }

  /** @override */
  serialize ({
    value,
  }) {
    if (value instanceof Date) {
      return value.toISOString()
    }

    throw new Error('GraphQL Date Scalar serializer expected a `Date` object')
  }

  /** @override */
  parseValue ({
    value,
  }) {
    if (typeof value === 'string') {
      return new Date(value)
    }

    throw new Error('GraphQL Date Scalar parser expected a `string`')
  }

  /** @override */
  parseLiteral ({
    ast,
  }) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }

    return null
  }
}
