import BaseGraphqlPostWorker from '../../../../../lib/server/graphql/post-workers/BaseGraphqlPostWorker.js'

/**
 * SignIn Mutation Post Worker
 *
 * @extends {BaseGraphqlPostWorker<
 *   CurriculumsQueryPostWorkerVariables,
 *   GraphqlType.Context,
 *   CurriculumsQueryPostWorkerOutput
 * >}
 */
export default class CurriculumsQueryPostWorker extends BaseGraphqlPostWorker {
  /** @override */
  static get schema () {
    return 'curriculums'
  }

  /**
   * On resolved hook.
   *
   * @override
   * @param {{
   *   variables: CurriculumsQueryPostWorkerVariables
   *   context: GraphqlType.Context
   *   information: GraphqlType.ResolverInputInformation
   *   response: {
   *     output: CurriculumsQueryPostWorkerOutput | null
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
 * @typedef {{}} CurriculumsQueryPostWorkerVariables
 */

/**
 * @typedef {{
 *   curriculums: Array<{
 *     id: number
 *     title: string
 *     description: string
 *     thumbnailUrl: string
 *     postedAt: Date
 *   }>
 * }} CurriculumsQueryPostWorkerOutput
 */
