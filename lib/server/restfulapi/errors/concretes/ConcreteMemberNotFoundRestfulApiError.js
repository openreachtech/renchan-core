import RenchanRestfulApiError from '../RenchanRestfulApiError.js'

/**
 * Concrete member not found error.
 *
 * @extends {RenchanRestfulApiError}
 */
export default class ConcreteMemberNotFoundRestfulApiError extends RenchanRestfulApiError {
  /** @override */
  static get errorCode () {
    return 'concrete-member-not-found'
  }
}
