import BaseRestfulApiResponseFlusher from '../BaseRestfulApiResponseFlusher.js'

/**
 * JSON RESTful API response flusher.
 */
export default class JsonRestfulApiResponseFlusher extends BaseRestfulApiResponseFlusher {
  /** @override */
  static get contentType () {
    return 'application/json'
  }

  /** @override */
  flushResponseBody () {
    const json = this.generateJsonBody()

    this.expressResponse.json(json)
  }

  /**
   * Generate JSON body.
   *
   * @returns {{
   *   content: * | null
   *   error: RestfulApiType.Error | null
   * }} - An value hash of JSON body.
   */
  generateJsonBody () {
    return {
      content: this.renderResponse.content,
      error: this.renderResponse.error,
    }
  }
}
