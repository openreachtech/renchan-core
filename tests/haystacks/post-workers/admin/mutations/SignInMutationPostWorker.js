import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   SignInMutationPostWorkerVariables,
 *   GraphqlType.Context,
 *   SignInMutationPostWorkerOutput
 * >}
 */
export default class SignInMutationPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'signIn'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: SignInMutationPostWorkerVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: SignInMutationPostWorkerOutput | null
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
 * }} SignInMutationPostWorkerVariables
 */

/**
 * @typedef {{
 *   accessToken: string
 * }} SignInMutationPostWorkerOutput
 */
