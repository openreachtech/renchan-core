/**
 * Stub of Express Request.
 */
export default class StubExpressRequest {
  /**
   * Constructor.
   *
   * @param {StubExpressRequestOptions} options - Options of this constructor.
   */
  constructor ({
    headers = {},
    query = {},
    body = {},
  } = {}) {
    this.headerHash = headers
    this.getQuery = query
    this.postBody = body
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof StubExpressRequest ? X : never} T, X
   * @param {StubExpressRequestOptions} [options] - Options of this constructor.
   * @returns {InstanceType<T>} - Instance of this class.
   * @this {T}
   */
  static create (options = {}) {
    return /** @type {InstanceType<T>} */ (
      new this(options)
    )
  }

  /**
   * Getter: query.
   *
   * @returns {object} - Object of query.
   */
  get query () {
    return this.getQuery
  }

  /**
   * Getter: body.
   *
   * @returns {object} - Object of body.
   */
  get body () {
    return this.postBody
  }

  /**
   * Accessor to `ExpressRequest#header()`.
   *
   * @param {string} key - Key of header.
   * @returns {string} - Value of header.
   */
  header (key) {
    return this.headerHash[key]
  }
}

/**
 * @typedef {{
 *   headers?: Record<*, *>
 *   query?: Record<*, *>
 *   body?: Record<*, *>
 * }} StubExpressRequestOptions
 */
