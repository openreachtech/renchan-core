/**
 * GraphQL resolved parcel porter.
 */
export default class GraphqlResolvedParcelPorter {
  /**
   * Constructor.
   *
   * @param {GraphqlResolvedParcelPorterParams} params - Parameters of this constructor.
   */
  constructor ({
    parcelMap,
  }) {
    this.parcelMap = parcelMap
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlResolvedParcelPorter ? X : never} T, X
   * @param {GraphqlResolvedParcelPorterFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    parcelMap = this.createParcelMap(),
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        parcelMap,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @returns {WeakMap<ExpressType.Request, GraphqlType.OnResolvedParcel>}
   */
  static createParcelMap () {
    return new WeakMap()
  }

  /**
   * Save parcel.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   *   parcel: GraphqlType.OnResolvedParcel
   * }} params - Parameters of this method.
   * @returns {GraphqlResolvedParcelPorter} For method chaining.
   */
  saveParcel ({
    expressRequest,
    parcel,
  }) {
    this.parcelMap.set(
      expressRequest,
      parcel
    )

    return this
  }

  /**
   * Load parcel.
   *
   * @param {{
   *   expressRequest: ExpressType.Request
   * }} params - Parameters of this method.
   * @returns {GraphqlType.OnResolvedParcel | null} Parcel.
   */
  loadParcel ({
    expressRequest,
  }) {
    return this.parcelMap.get(expressRequest)
      ?? null
  }
}

/**
 * @typedef {{
 *   parcelMap: ResolvedParcelMap
 * }} GraphqlResolvedParcelPorterParams
 */

/**
 * @typedef {{
 *   parcelMap?: ResolvedParcelMap
 * }} GraphqlResolvedParcelPorterFactoryParams
 */

/**
 * @typedef {WeakMap<ExpressType.Request, GraphqlType.OnResolvedParcel>} ResolvedParcelMap
 */
