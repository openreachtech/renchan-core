import {
  setTimeout as sleep,
} from 'timers/promises'

import BaseQueryResolver from '../../../../../../../lib/server/graphql/resolvers/BaseQueryResolver.js'

export default class CompanySponsorsQueryResolver extends BaseQueryResolver {
  /** @override */
  static get schema () {
    return 'companySponsors'
  }

  /** @override */
  async resolve () {
    await sleep(750)

    const companySponsors = [
      {
        id: 2000,
        registeredAt: '2023-09-01T00:00:00.000Z',
        companyName: 'company name 2000',
        companyDescription: 'company description 2000',
        companySponsorHomepage: 'http://openreach.tech/company-sponsor-homepage/2000',
        companySponsorLogo: 'http://openreach.tech/company-sponsor-logo/2000.png',
      },
      {
        id: 2001,
        registeredAt: '2023-09-02T00:00:00.000Z',
        companyName: 'company name 2001',
        companyDescription: 'company description 2001',
        companySponsorHomepage: 'http://openreach.tech/company-sponsor-homepage/2001',
        companySponsorLogo: 'http://openreach.tech/company-sponsor-logo/2001.png',
      },
      {
        id: 2002,
        registeredAt: '2023-09-03T00:00:00.000Z',
        companyName: 'company name 2002',
        companyDescription: 'company description 2002',
        companySponsorHomepage: 'http://openreach.tech/company-sponsor-homepage/2002',
        companySponsorLogo: 'http://openreach.tech/company-sponsor-logo/2002.png',
      },
      {
        id: 2003,
        registeredAt: '2023-09-04T00:00:00.000Z',
        companyName: 'company name 2003',
        companyDescription: 'company description 2003',
        companySponsorHomepage: 'http://openreach.tech/company-sponsor-homepage/2003',
        companySponsorLogo: 'http://openreach.tech/company-sponsor-logo/2003.png',
      },
      {
        id: 2004,
        registeredAt: '2023-09-05T00:00:00.000Z',
        companyName: 'company name 2004',
        companyDescription: 'company description 2004',
        companySponsorHomepage: 'http://openreach.tech/company-sponsor-homepage/2004',
        companySponsorLogo: 'http://openreach.tech/company-sponsor-logo/2004.png',
      },

      {
        id: 2005,
        registeredAt: '2023-09-06T00:00:00.000Z',
        companyName: 'company name 2005',
        companyDescription: 'company description 2005',
        companySponsorHomepage: 'http://openreach.tech/company-sponsor-homepage/2005',
        companySponsorLogo: 'http://openreach.tech/company-sponsor-logo/2005.png',
      },
    ]

    return {
      companySponsors,
    }
  }
}
