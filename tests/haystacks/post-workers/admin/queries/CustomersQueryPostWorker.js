import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   CustomersQueryPostWorkerVariables,
 *   GraphqlType.Context,
 *   CustomersQueryPostWorkerOutput
 * >}
 */
export default class CustomersQueryPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'customers'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: CustomersQueryPostWorkerVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: CustomersQueryPostWorkerOutput | null
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
 * @typedef {{}} CustomersQueryPostWorkerVariables
 */

/**
 * @typedef {Array<{
 *   id: number
 *   name: string
 *   inviteCode: string
 * }>} CustomersQueryPostWorkerOutput
 */
