import GraphqlPostWorkersLoader from './GraphqlPostWorkersLoader.js'

/**
 * Graphql post worker hash builder.
 */
export default class GraphqlPostWorkerHashBuilder {
  /**
   * Constructor.
   *
   * @param {GraphqlPostWorkerHashBuilderParams} params - Parameters of this constructor.
   */
  constructor ({
    postWorkers,
  }) {
    this.postWorkers = postWorkers
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GraphqlPostWorkerHashBuilder ? X : never} T, X
   * @param {GraphqlPostWorkerHashBuilderFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   */
  static create ({
    postWorkers,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        postWorkers,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof GraphqlPostWorkerHashBuilder ? X : never} T, X
   * @param {GraphqlPostWorkerHashBuilderAsyncFactoryParams} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   */
  static async createAsync ({
    engine,
  }) {
    const {
      postWorkersPath,
    } = engine.config

    const postWorkers = await this.loadPostWorkers({
      engine,
      poolPath: postWorkersPath,
    })

    return this.create({
      postWorkers,
    })
  }

  /**
   * Load post worker classes.
   *
   * @param {{
   *   engine: GraphqlType.ServerEngine
   *   poolPath: string | null
   * }} params - Parameters.
   * @returns {Promise<Array<GraphqlType.PostWorker>>} - Post worker classes.
   */
  static async loadPostWorkers ({
    engine,
    poolPath,
  }) {
    if (!poolPath) {
      return []
    }

    const loader = GraphqlPostWorkersLoader.create({
      poolPath,
    })

    const postWorkerCtors = await loader.loadPostWorkers()

    const postWorkers = await Promise.all(
      postWorkerCtors.map(
        it => it.createAsync({
          engine,
        }))
    )

    return postWorkers
  }

  /**
   * Build onResolved schema hash.
   *
   * @returns {Record<string, (parcel: GraphqlType.OnResolvedParcel) => Promise<void>>} - Post worker hash.
   * @public
   */
  buildOnResolvedSchemaHash () {
    return Object.fromEntries(
      this.postWorkers.map(it => [
        it.Ctor.schema,
        async parcel => {
          await it.onResolved(parcel)
        },
      ])
    )
  }
}

/**
 * @typedef {{
 *   postWorkers: Array<GraphqlType.PostWorker>
 * }} GraphqlPostWorkerHashBuilderParams
 */

/**
 * @typedef {GraphqlPostWorkerHashBuilderParams} GraphqlPostWorkerHashBuilderFactoryParams
 */

/**
 * @typedef {{
 *   engine: GraphqlType.ServerEngine
 * }} GraphqlPostWorkerHashBuilderAsyncFactoryParams
 */
