import BaseGraphqlPostWorker from '../../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

const Timber = console

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   CustomersQueryPostWorkerVariables,
 *   CustomersQueryPostWorkerContext,
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
   *   context: CustomersQueryPostWorkerContext
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
    Timber.log('I am the post worker of CustomersQuery', {
      companyName: variables[0].companyName,
      variables,
      output,
      error,
    })
  }
}

/**
 * @typedef {{}} CustomersQueryPostWorkerVariables
 */

/**
 * @typedef {import('../../../contexts/AdminGraphqlContext.js').default} CustomersQueryPostWorkerContext
 */

/**
 * @typedef {{
 *   customers: Array<{
 *     id: number
 *     name: string
 *     inviteCode: string
 *   }>
 * }} CustomersQueryPostWorkerOutput
 */
