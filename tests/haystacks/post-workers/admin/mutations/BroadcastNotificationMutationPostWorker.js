import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * BroadcastNotification Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   BroadcastNotificationMutationPostWorkerVariables,
 *   GraphqlType.Context,
 *   BroadcastNotificationMutationPostWorkerOutput
 * >}
 */
export default class BroadcastNotificationMutationPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'broadcastNotification'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: BroadcastNotificationMutationPostWorkerVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: BroadcastNotificationMutationPostWorkerOutput | null
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
 *   message: string
 *   segments: Array<string>
 * }} BroadcastNotificationMutationPostWorkerVariables
 */

/**
 * @typedef {{
 *   broadcastCount: number
 * }} BroadcastNotificationMutationPostWorkerOutput
 */
