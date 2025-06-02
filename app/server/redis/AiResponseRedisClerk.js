import BaseRedisClerk from '../../../lib/server/redis/BaseRedisClerk.js'

/**
 * Redis clerk for AI responses.
 *
 * @extends {BaseRedisClerk<string>}
 */
export default class AiResponseRedisClerk extends BaseRedisClerk {
  /** @override */
  static get db () {
    return 1
  }

  /**
   * Save AI message.
   *
   * @param {{
   *   messageId: string
   *   aiResponse: AiResponse
   * }} params - Parameters of this method.
   * @returns {Promise<void>}
   */
  async saveAiResponse ({
    messageId,
    aiResponse,
  }) {
    const value = JSON.stringify(aiResponse)

    await this.saveValue({
      key: messageId,
      value,
    })
  }

  /**
   * Get AI response.
   *
   * @param {{
   *   messageId: string
   * }} params - Parameters of this method.
   * @returns {Promise<AiResponse | null>} - AI response.
   */
  async loadAiResponse ({
    messageId,
  }) {
    const value = await this.loadValue({
      key: messageId,
    })

    if (!value) {
      return null
    }

    try {
      return /** @type {AiResponse} */ (
        JSON.parse(value)
      )
    } catch (error) {
      return null
    }
  }

  /**
   * Delete AI response.
   *
   * @param {{
   *   messageId: string
   * }} params - Parameters of this method.
   * @returns {Promise<number>}
   */
  async deleteAiResponse ({
    messageId,
  }) {
    return this.deleteValue({
      key: messageId,
    })
  }
}

/**
 * @typedef {{
 *   accumulatedResponse: string
 *   totalChunkNumber: number
 * }} AiResponse
 */
