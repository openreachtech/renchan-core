import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

/**
 * Base class of GraphQL resolver mutation.
 *
 * @extends {BaseMutationResolver}
 */
export default class PostAppointmentMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'postAppointment'
  }

  /** @override */
  static get errorCodeHash () {
    return {
      ...super.errorCodeHash,
    }
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        clientCustomerId,
        appointedAt,
        place,
      },
    },
    context,
  }) {
    const isTypeDate = appointedAt instanceof Date

    return {
      appointment: {
        id: 60001,
        appointedAt,
        place: `is "appointedAt" type Date: ${isTypeDate}; ${appointedAt.toLocaleString()}`,
      },
    }
  }
}
