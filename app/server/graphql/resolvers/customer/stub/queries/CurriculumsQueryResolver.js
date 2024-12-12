import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

export default class CurriculumsQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'curriculums'
  }

  /** @override */
  async resolve ({
    variables: {
      input: {
        pagination: {
          limit,
          offset,
          sort = {
            targetColumn: 'postedAt',
            orderBy: 'DESC',
          },
        },
      },
    },
    context,
  }) {
    await sleep(300)

    const haystacks = [
      {
        id: 2000,
        title: 'curriculum title 2000',
        description: 'curriculum description 2000',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2000.png',
        postedAt: '2023-09-01T00:00:00.000Z',
      },
      {
        id: 2001,
        title: 'curriculum title 2001',
        description: 'curriculum description 2001',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2001.png',
        postedAt: '2023-09-02T00:00:00.000Z',
      },
      {
        id: 2002,
        title: 'curriculum title 2002',
        description: 'curriculum description 2002',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2002.png',
        postedAt: '2023-09-03T00:00:00.000Z',
      },
      {
        id: 2003,
        title: 'curriculum title 2003',
        description: 'curriculum description 2003',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2003.png',
        postedAt: '2023-09-04T00:00:00.000Z',
      },
      {
        id: 2004,
        title: 'curriculum title 2004',
        description: 'curriculum description 2004',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2004.png',
        postedAt: '2023-09-05T00:00:00.000Z',
      },
      {
        id: 2005,
        title: 'curriculum title 2005',
        description: 'curriculum description 2005',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2005.png',
        postedAt: '2023-09-06T00:00:00.000Z',
      },
      {
        id: 2006,
        title: 'curriculum title 2006',
        description: 'curriculum description 2006',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2006.png',
        postedAt: '2023-09-07T00:00:00.000Z',
      },
      {
        id: 2007,
        title: 'curriculum title 2007',
        description: 'curriculum description 2007',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2007.png',
        postedAt: '2023-09-08T00:00:00.000Z',
      },
      {
        id: 2008,
        title: 'curriculum title 2008',
        description: 'curriculum description 2008',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2008.png',
        postedAt: '2023-09-09T00:00:00.000Z',
      },
      {
        id: 2009,
        title: 'curriculum title 2009',
        description: 'curriculum description 2009',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2009.png',
        postedAt: '2023-09-10T00:00:00.000Z',
      },
      {
        id: 2010,
        title: 'curriculum title 2010',
        description: 'curriculum description 2010',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2010.png',
        postedAt: '2023-09-11T00:00:00.000Z',
      },
      {
        id: 2011,
        title: 'curriculum title 2011',
        description: 'curriculum description 2011',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2011.png',
        postedAt: '2023-09-12T00:00:00.000Z',
      },
      {
        id: 2012,
        title: 'curriculum title 2012',
        description: 'curriculum description 2012',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2012.png',
        postedAt: '2023-09-13T00:00:00.000Z',
      },
      {
        id: 2013,
        title: 'curriculum title 2013',
        description: 'curriculum description 2013',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2013.png',
        postedAt: '2023-09-14T00:00:00.000Z',
      },
      {
        id: 2014,
        title: 'curriculum title 2014',
        description: 'curriculum description 2014',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2014.png',
        postedAt: '2023-09-15T00:00:00.000Z',
      },
      {
        id: 2015,
        title: 'curriculum title 2015',
        description: 'curriculum description 2015',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2015.png',
        postedAt: '2023-09-16T00:00:00.000Z',
      },
      {
        id: 2016,
        title: 'curriculum title 2016',
        description: 'curriculum description 2016',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2016.png',
        postedAt: '2023-09-17T00:00:00.000Z',
      },
      {
        id: 2017,
        title: 'curriculum title 2017',
        description: 'curriculum description 2017',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2017.png',
        postedAt: '2023-09-18T00:00:00.000Z',
      },
      {
        id: 2018,
        title: 'curriculum title 2018',
        description: 'curriculum description 2018',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2018.png',
        postedAt: '2023-09-19T00:00:00.000Z',
      },
      {
        id: 2019,
        title: 'curriculum title 2019',
        description: 'curriculum description 2019',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2019.png',
        postedAt: '2023-09-20T00:00:00.000Z',
      },
      {
        id: 2020,
        title: 'curriculum title 2020',
        description: 'curriculum description 2020',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2020.png',
        postedAt: '2023-09-21T00:00:00.000Z',
      },
      {
        id: 2021,
        title: 'curriculum title 2021',
        description: 'curriculum description 2021',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2021.png',
        postedAt: '2023-09-22T00:00:00.000Z',
      },
      {
        id: 2022,
        title: 'curriculum title 2022',
        description: 'curriculum description 2022',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2022.png',
        postedAt: '2023-09-23T00:00:00.000Z',
      },
      {
        id: 2023,
        title: 'curriculum title 2023',
        description: 'curriculum description 2023',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2023.png',
        postedAt: '2023-09-24T00:00:00.000Z',
      },
      {
        id: 2024,
        title: 'curriculum title 2024',
        description: 'curriculum description 2024',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2024.png',
        postedAt: '2023-09-25T00:00:00.000Z',
      },
      {
        id: 2025,
        title: 'curriculum title 2025',
        description: 'curriculum description 2025',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2025.png',
        postedAt: '2023-09-26T00:00:00.000Z',
      },
      {
        id: 2026,
        title: 'curriculum title 2026',
        description: 'curriculum description 2026',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2026.png',
        postedAt: '2023-09-27T00:00:00.000Z',
      },
      {
        id: 2027,
        title: 'curriculum title 2027',
        description: 'curriculum description 2027',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2027.png',
        postedAt: '2023-09-28T00:00:00.000Z',
      },
      {
        id: 2028,
        title: 'curriculum title 2028',
        description: 'curriculum description 2028',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2028.png',
        postedAt: '2023-09-29T00:00:00.000Z',
      },
      {
        id: 2029,
        title: 'curriculum title 2029',
        description: 'curriculum description 2029',
        thumbnailUrl: 'http://openreach.tech/curriculums/thumbnail-url/2029.png',
        postedAt: '2023-09-30T00:00:00.000Z',
      },
    ]

    return {
      curriculums: this.extractCurriculums({
        haystacks,
        pagination: {
          limit,
          offset,
          sort,
        },
      }),
      pagination: {
        limit: 10,
        offset: 0,
        totalRecords: 6,
        sort: {
          targetColumn: 'savedAt',
          orderBy: 'ASC',
        },
      },
    }
  }

  /**
   * Extracts the curriculums from the haystacks.
   *
   * @param {{
   *   haystacks: Array<CurriculumEntity>
   *   pagination: paginationType
   * }} params - Parameters.
   * @returns {Array<CurriculumEntity>} - The curriculums.
   */
  extractCurriculums ({
    haystacks,
    pagination: {
      limit,
      offset,
      sort: {
        targetColumn,
        orderBy,
      },
    },
  }) {
    const sortDirection = orderBy === 'ASC'

    const sortFunction = sortDirection
      ? (alpha, beta) => alpha[targetColumn].localeCompare(beta[targetColumn])
      : (alpha, beta) => beta[targetColumn].localeCompare(alpha[targetColumn])

    const sortedHaystacks = [...haystacks]
      .sort(sortFunction)

    return sortedHaystacks.splice(offset, limit)
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
