import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

import paginationArticlesHash from '../../../../../../haystacks/paginationArticlesHash.js'

export default class PaginationArticlesQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'paginationArticles'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        category,
        pagination: {
          limit,
          offset,
          sort: {
            targetColumn = 'postedAt',
            orderBy = 'DESC',
          } = {},
        },
      },
    },
    context,
  }) {
    await sleep(300)

    const args = {
      category,
      pagination: {
        limit,
        offset,
        sort: {
          targetColumn,
          orderBy,
        },
      },
    }

    const articles = this.extractArticles(args)
    const totalRecords = this.resolveTotalRecords(args)

    return {
      articles,
      pagination: {
        limit,
        offset,
        sort: {
          targetColumn,
          orderBy,
        },
        totalRecords,
      },
    }
  }

  /**
   * Extract the articles.
   *
   * @param {{
   *   category: string
   *   pagination: paginationType
   * }} params - Parameters.
   * @returns {Array<ArticleEntity>} - The curriculums.
   */
  extractArticles ({
    category,
    pagination: {
      limit,
      offset,
      sort: {
        targetColumn,
        orderBy,
      },
    },
  }) {
    const key = this.resolveSortKey({
      targetColumn,
    })

    const sortDirection = orderBy === 'ASC'

    const sortFunction = sortDirection
      ? (alpha, beta) =>
        alpha[key]
          .toString()
          .localeCompare(beta[key])
      : (alpha, beta) =>
        beta[key]
          .toString()
          .localeCompare(alpha[key])

    if (category in paginationArticlesHash) {
      return paginationArticlesHash[category]
        .toSorted(sortFunction)
        .slice(offset, offset + limit)
    }

    const articles = this.generateNumberingArray({
      limit,
    })
      .map(it => it + offset)
      .map(it => ({
        id: 100000 + it,
        title: `Article #${it}`,
        description: `Description of Article #${it}`,
        postedAt: this.createOffsetDate(it),
      }))
      .toSorted(sortFunction)

    return articles
  }

  /**
   * Resolves the sort key.
   *
   * @param {{
   *   category: string
   *   pagination: paginationType
   * }} params - Parameters.
   * @returns {number} - The total records.
   */
  resolveTotalRecords ({
    category,
    pagination: {
      limit,
      offset,
      sort: {
        targetColumn,
        orderBy,
      },
    },
  }) {
    if (category in paginationArticlesHash) {
      return paginationArticlesHash[category].length
    }

    return Math.ceil(limit * 12.3)
  }

  /**
   * Resolves the sort key.
   *
   * @param {{
   *   targetColumn: string
   * }} params - Parameters.
   * @returns {string} - The sort key.
   */
  resolveSortKey ({
    targetColumn,
  }) {
    const availableColumns = [
      'id',
      'title',
      'description',
      'postedAt',
    ].includes(targetColumn)

    return availableColumns
      ? targetColumn
      : 'id'
  }

  /**
   * Generates a numbering array.
   *
   * @param {{
   *   limit: number
   * }} params - Parameters.
   * @returns {Array<number>} - The numbering array.
   */
  generateNumberingArray ({
    limit,
  }) {
    return [...Array(limit)]
      .map((_, index) => index + 1)
  }

  /**
   * Creates a date with an offset.
   *
   * @param {number} offset - The offset.
   * @returns {Date} - The offset date.
   */
  createOffsetDate (offset) {
    const date = new Date('2025-01-31T00:00:00.000Z')

    date.setDate(date.getDate() + offset)

    return date
  }
}

/**
 * @typedef {{
 *   id: number
 *   title: string
 *   description: string
 *   thumbnailUrl: string
 *   postedAt: string
 * }} CurriculumEntity
 */

/**
 * @typedef {{
 *   limit: number
 *   offset: number
 *   sort: {
 *     targetColumn: string
 *     orderBy: string
 *   }
 * }} paginationType
 */

/**
 * @typedef {{
 *   id: number
 *   title: string
 *   description: string
 *   postedAt: Date
 * }} ArticleEntity
 */
