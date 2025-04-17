import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * SendChatMessage Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   SendChatMessageMutationPostWorkerVariables,
 *   GraphqlType.Context,
 *   SendChatMessageMutationPostWorkerOutput
 * >}
 */
export default class SendChatMessageMutationPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'sendChatMessage'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: SendChatMessageMutationPostWorkerVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: SendChatMessageMutationPostWorkerOutput | null
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
 *   email: string
 *   password: string
 * }} SendChatMessageMutationPostWorkerVariables
 */

/**
 * @typedef {{
 *   accessToken: string
 * }} SendChatMessageMutationPostWorkerOutput
 */
