import BaseResolver from './BaseResolver.js'

/**
 * Base graphql resolver for Query.
 *
 * @abstract
 * @extends {BaseResolver}
 */
export default class BaseQueryResolver extends BaseResolver {
  /** @override */
  static get operation () {
    return 'Query'
  }
}
