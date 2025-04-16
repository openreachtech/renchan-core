import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   StatisticsQueryPostWorkerVariables,
 *   GraphqlType.Context,
 *   StatisticsQueryPostWorkerOutput
 * >}
 */
export default class StatisticsQueryPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'customers'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: StatisticsQueryPostWorkerVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: StatisticsQueryPostWorkerOutput | null
   *     error: Error | null
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async onResolved ({
    variables,
    context,
    information,
    response: {
      output,
      error,
    },
  }) {
    // noop
  }
}

/**
 * @typedef {{
 *   period: 'daily' | 'weekly' | 'monthly'
 *   startedAt: Date
 *   endedAt: Date
 * }} StatisticsQueryPostWorkerVariables
 */

/**
 * @typedef {{
 *   values: Array<{
 *     id: number
 *     label: string
 *     value: number
 *   }>
 *   totalValue: number
 * }} StatisticsQueryPostWorkerOutput
 */
