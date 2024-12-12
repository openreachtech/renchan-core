import {
  Kind,
} from 'graphql'

import BigNumber from 'bignumber.js'

import BaseScalar from '../BaseScalar.js'

/**
 * BigNumber custom scalar type.
 *
 * @extends {BaseScalar<BigNumber>}
 */
export default class BigNumberScalar extends BaseScalar {
  /** @override */
  static get scalarName () {
    return 'BigNumber'
  }

  /** @override */
  static get description () {
    return 'BigNumber custom scalar type'
  }

  /** @override */
  serialize ({
    value,
  }) {
    const normalizedBigNumber = new BigNumber(value)

    if (!normalizedBigNumber.isNaN()) {
      return normalizedBigNumber.toFixed()
    }

    throw new Error('GraphQL BigNumber Scalar serializer expected a `BigNumber` object')
  }

  /** @override */
  parseValue ({
    value,
  }) {
    const parsedBigNumber = new BigNumber(value)

    if (!parsedBigNumber.isNaN()) {
      return parsedBigNumber
    }

    throw new Error('GraphQL BigNumber Scalar parser expected a `string`')
  }

  /** @override */
  parseLiteral ({
    ast,
  }) {
    const isAcceptableKind = [
      Kind.STRING,
      Kind.INT,
      Kind.FLOAT,
    ]
      .includes(ast.kind)

    if (!isAcceptableKind) {
      return null
    }

    const normalizedBigNumber = new BigNumber(ast.value)

    if (!normalizedBigNumber.isNaN()) {
      return new BigNumber(ast.value)
    }

    return null
  }
}
