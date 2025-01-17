import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseMutationResolver from '../../../../../../../lib/server/graphql/resolvers/BaseMutationResolver.js'

export default class UploadImageMutationResolver extends BaseMutationResolver {
  /** @override */
  static get schema () {
    return 'uploadImage'
  }

  /** @override */
  async resolve () {
    await sleep(300)

    return {
      filename: 'sample.png',
      mimetype: 'image/png',
      encoding: '7bit',
    }
  }
}
