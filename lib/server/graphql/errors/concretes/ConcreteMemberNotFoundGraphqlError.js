import RenchanGraphqlError from '../RenchanGraphqlError.js'

/**
 * Derived extended error.
 *
 * @extends {RenchanGraphqlError}
 */
export default class ConcreteMemberNotFoundGraphqlError extends RenchanGraphqlError {
  /** @override */
  static get errorCode () {
    return 'concrete-member-not-found'
  }
}
