'use strict'

const TimestampSeedsSupplier = require('@openreachtech/renchan-sequelize/lib/tools/TimestampSeedsSupplier.cjs')

const {
  Encipher,
} = require('@openreachtech/renchan-tools')

const encipher = Encipher.create()

const TABLE_NAME = {
  CUSTOMERS: 'customers',
  CUSTOMER_BASICS: 'customer_basics',
  CUSTOMER_SECRETS: 'customer_secrets',
  CUSTOMER_PASSWORD_HASHES: 'customer_password_hashes',
  CUSTOMER_ACCESS_TOKENS: 'customer_access_tokens',
}

const customersSeeds = [
  { id: 100001, registered_at: new Date('2024-01-01T00:00:01.001Z') },
  { id: 100002, registered_at: new Date('2024-01-02T00:00:02.002Z') },
  { id: 100003, registered_at: new Date('2024-01-03T00:00:03.003Z') },
  { id: 100004, registered_at: new Date('2024-01-04T00:00:04.004Z') },
  { id: 100005, registered_at: new Date('2024-01-05T00:00:05.005Z') },
  { id: 100006, registered_at: new Date('2024-01-06T00:00:06.006Z') },
  { id: 100007, registered_at: new Date('2024-01-07T00:00:07.007Z') },
  { id: 100008, registered_at: new Date('2024-01-08T00:00:08.008Z') },
  { id: 100009, registered_at: new Date('2024-01-09T00:00:09.009Z') },
  { id: 100010, registered_at: new Date('2024-01-10T00:00:10.010Z') },
  { id: 100011, registered_at: new Date('2024-01-11T00:00:11.011Z') },
  { id: 100012, registered_at: new Date('2024-01-12T00:00:12.012Z') },
  { id: 100013, registered_at: new Date('2024-01-13T00:00:13.013Z') },
  { id: 100014, registered_at: new Date('2024-01-14T00:00:14.014Z') },
  { id: 100015, registered_at: new Date('2024-01-15T00:00:15.015Z') },
  { id: 100016, registered_at: new Date('2024-01-16T00:00:16.016Z') },
  { id: 100017, registered_at: new Date('2024-01-17T00:00:17.017Z') },
  { id: 100018, registered_at: new Date('2024-01-18T00:00:18.018Z') },
  { id: 100019, registered_at: new Date('2024-01-19T00:00:19.019Z') },
  { id: 100020, registered_at: new Date('2024-01-20T00:00:20.020Z') },
  { id: 100021, registered_at: new Date('2024-01-21T00:00:21.021Z') },
  { id: 100022, registered_at: new Date('2024-01-22T00:00:22.022Z') },
  { id: 100023, registered_at: new Date('2024-01-23T00:00:23.023Z') },
  { id: 100024, registered_at: new Date('2024-01-24T00:00:24.024Z') },
  { id: 100025, registered_at: new Date('2024-01-25T00:00:25.025Z') },
  { id: 100026, registered_at: new Date('2024-01-26T00:00:26.026Z') },
  { id: 100027, registered_at: new Date('2024-01-27T00:00:27.027Z') },
  { id: 100028, registered_at: new Date('2024-01-28T00:00:28.028Z') },
  { id: 100029, registered_at: new Date('2024-01-29T00:00:29.029Z') },
  { id: 100030, registered_at: new Date('2024-01-30T00:00:30.030Z') },
]

const customersBasicsSeeds = [
  { id: 110001, customer_id: 100001, username: 'customerName01', saved_at: new Date('2024-01-01T00:00:01.001Z') },
  { id: 110002, customer_id: 100002, username: 'customerName02', saved_at: new Date('2024-01-02T00:00:02.002Z') },
  { id: 110003, customer_id: 100003, username: 'customerName03', saved_at: new Date('2024-01-03T00:00:03.003Z') },
  { id: 110004, customer_id: 100004, username: 'customerName04', saved_at: new Date('2024-01-04T00:00:04.004Z') },
  { id: 110005, customer_id: 100005, username: 'customerName05', saved_at: new Date('2024-01-05T00:00:05.005Z') },
  { id: 110006, customer_id: 100006, username: 'customerName06', saved_at: new Date('2024-01-06T00:00:06.006Z') },
  { id: 110007, customer_id: 100007, username: 'customerName07', saved_at: new Date('2024-01-07T00:00:07.007Z') },
  { id: 110008, customer_id: 100008, username: 'customerName08', saved_at: new Date('2024-01-08T00:00:08.008Z') },
  { id: 110009, customer_id: 100009, username: 'customerName09', saved_at: new Date('2024-01-09T00:00:09.009Z') },
  { id: 110010, customer_id: 100010, username: 'customerName10', saved_at: new Date('2024-01-10T00:00:10.010Z') },
  { id: 110011, customer_id: 100011, username: 'customerName11', saved_at: new Date('2024-01-11T00:00:11.011Z') },
  { id: 110012, customer_id: 100012, username: 'customerName12', saved_at: new Date('2024-01-12T00:00:12.012Z') },
  { id: 110013, customer_id: 100013, username: 'customerName13', saved_at: new Date('2024-01-13T00:00:13.013Z') },
  { id: 110014, customer_id: 100014, username: 'customerName14', saved_at: new Date('2024-01-14T00:00:14.014Z') },
  { id: 110015, customer_id: 100015, username: 'customerName15', saved_at: new Date('2024-01-15T00:00:15.015Z') },
  { id: 110016, customer_id: 100016, username: 'customerName16', saved_at: new Date('2024-01-16T00:00:16.016Z') },
  { id: 110017, customer_id: 100017, username: 'customerName17', saved_at: new Date('2024-01-17T00:00:17.017Z') },
  { id: 110018, customer_id: 100018, username: 'customerName18', saved_at: new Date('2024-01-18T00:00:18.018Z') },
  { id: 110019, customer_id: 100019, username: 'customerName19', saved_at: new Date('2024-01-19T00:00:19.019Z') },
  { id: 110020, customer_id: 100020, username: 'customerName20', saved_at: new Date('2024-01-20T00:00:20.020Z') },
  { id: 110021, customer_id: 100021, username: 'customerName21', saved_at: new Date('2024-01-21T00:00:21.021Z') },
  { id: 110022, customer_id: 100022, username: 'customerName22', saved_at: new Date('2024-01-22T00:00:22.022Z') },
  { id: 110023, customer_id: 100023, username: 'customerName23', saved_at: new Date('2024-01-23T00:00:23.023Z') },
  { id: 110024, customer_id: 100024, username: 'customerName24', saved_at: new Date('2024-01-24T00:00:24.024Z') },
  { id: 110025, customer_id: 100025, username: 'customerName25', saved_at: new Date('2024-01-25T00:00:25.025Z') },
  { id: 110026, customer_id: 100026, username: 'customerName26', saved_at: new Date('2024-01-26T00:00:26.026Z') },
  { id: 110027, customer_id: 100027, username: 'customerName27', saved_at: new Date('2024-01-27T00:00:27.027Z') },
  { id: 110028, customer_id: 100028, username: 'customerName28', saved_at: new Date('2024-01-28T00:00:28.028Z') },
  { id: 110029, customer_id: 100029, username: 'customerName29', saved_at: new Date('2024-01-29T00:00:29.029Z') },
  { id: 110030, customer_id: 100030, username: 'customerName30', saved_at: new Date('2024-01-30T00:00:30.030Z') },
]

/*
 * for email
 */
const customerSecretsSeeds = [
  { id: 120001, customer_id: 100001, saved_at: new Date('2024-01-01T00:00:01.001Z'), email: 'customer.100001@example.com' },
  { id: 120002, customer_id: 100002, saved_at: new Date('2024-01-02T00:00:02.002Z'), email: 'customer.100002@example.com' },
  { id: 120003, customer_id: 100003, saved_at: new Date('2024-01-03T00:00:03.003Z'), email: 'customer.100003@example.com' },
  { id: 120004, customer_id: 100004, saved_at: new Date('2024-01-04T00:00:04.004Z'), email: 'customer.100004@example.com' },
  { id: 120005, customer_id: 100005, saved_at: new Date('2024-01-05T00:00:05.005Z'), email: 'customer.100005@example.com' },
  { id: 120006, customer_id: 100006, saved_at: new Date('2024-01-06T00:00:06.006Z'), email: 'customer.100006@example.com' },
  { id: 120007, customer_id: 100007, saved_at: new Date('2024-01-07T00:00:07.007Z'), email: 'customer.100007@example.com' },
  { id: 120008, customer_id: 100008, saved_at: new Date('2024-01-08T00:00:08.008Z'), email: 'customer.100008@example.com' },
  { id: 120009, customer_id: 100009, saved_at: new Date('2024-01-09T00:00:09.009Z'), email: 'customer.100009@example.com' },
  { id: 120010, customer_id: 100010, saved_at: new Date('2024-01-10T00:00:10.010Z'), email: 'customer.100010@example.com' },
  { id: 120011, customer_id: 100011, saved_at: new Date('2024-01-11T00:00:11.011Z'), email: 'customer.100011@example.com' },
  { id: 120012, customer_id: 100012, saved_at: new Date('2024-01-12T00:00:12.012Z'), email: 'customer.100012@example.com' },
  { id: 120013, customer_id: 100013, saved_at: new Date('2024-01-13T00:00:13.013Z'), email: 'customer.100013@example.com' },
  { id: 120014, customer_id: 100014, saved_at: new Date('2024-01-14T00:00:14.014Z'), email: 'customer.100014@example.com' },
  { id: 120015, customer_id: 100015, saved_at: new Date('2024-01-15T00:00:15.015Z'), email: 'customer.100015@example.com' },
  { id: 120016, customer_id: 100016, saved_at: new Date('2024-01-16T00:00:16.016Z'), email: 'customer.100016@example.com' },
  { id: 120017, customer_id: 100017, saved_at: new Date('2024-01-17T00:00:17.017Z'), email: 'customer.100017@example.com' },
  { id: 120018, customer_id: 100018, saved_at: new Date('2024-01-18T00:00:18.018Z'), email: 'customer.100018@example.com' },
  { id: 120019, customer_id: 100019, saved_at: new Date('2024-01-19T00:00:19.019Z'), email: 'customer.100019@example.com' },
  { id: 120020, customer_id: 100020, saved_at: new Date('2024-01-20T00:00:20.020Z'), email: 'customer.100020@example.com' },
  { id: 120021, customer_id: 100021, saved_at: new Date('2024-01-21T00:00:21.021Z'), email: 'customer.100021@example.com' },
  { id: 120022, customer_id: 100022, saved_at: new Date('2024-01-22T00:00:22.022Z'), email: 'customer.100022@example.com' },
  { id: 120023, customer_id: 100023, saved_at: new Date('2024-01-23T00:00:23.023Z'), email: 'customer.100023@example.com' },
  { id: 120024, customer_id: 100024, saved_at: new Date('2024-01-24T00:00:24.024Z'), email: 'customer.100024@example.com' },
  { id: 120025, customer_id: 100025, saved_at: new Date('2024-01-25T00:00:25.025Z'), email: 'customer.100025@example.com' },
  { id: 120026, customer_id: 100026, saved_at: new Date('2024-01-26T00:00:26.026Z'), email: 'customer.100026@example.com' },
  { id: 120027, customer_id: 100027, saved_at: new Date('2024-01-27T00:00:27.027Z'), email: 'customer.100027@example.com' },
  { id: 120028, customer_id: 100028, saved_at: new Date('2024-01-28T00:00:28.028Z'), email: 'customer.100028@example.com' },
  { id: 120029, customer_id: 100029, saved_at: new Date('2024-01-29T00:00:29.029Z'), email: 'customer.100029@example.com' },
  { id: 120030, customer_id: 100030, saved_at: new Date('2024-01-30T00:00:30.030Z'), email: 'customer.100030@example.com' },
]

/*
 * for password hash
 */
const customerPasswordHashesSeeds = [
  { id: 130001, customer_id: 100001, raw_password: 'pAsswOrd$01', saved_at: new Date('2024-01-01T00:00:01.001Z') },
  { id: 130002, customer_id: 100002, raw_password: 'pAsswOrd$02', saved_at: new Date('2024-01-02T00:00:02.002Z') },
  { id: 130003, customer_id: 100003, raw_password: 'pAsswOrd$03', saved_at: new Date('2024-01-03T00:00:03.003Z') },
  { id: 130004, customer_id: 100004, raw_password: 'pAsswOrd$04', saved_at: new Date('2024-01-04T00:00:04.004Z') },
  { id: 130005, customer_id: 100005, raw_password: 'pAsswOrd$05', saved_at: new Date('2024-01-05T00:00:05.005Z') },
  { id: 130006, customer_id: 100006, raw_password: 'pAsswOrd$06', saved_at: new Date('2024-01-06T00:00:06.006Z') },
  { id: 130007, customer_id: 100007, raw_password: 'pAsswOrd$07', saved_at: new Date('2024-01-07T00:00:07.007Z') },
  { id: 130008, customer_id: 100008, raw_password: 'pAsswOrd$08', saved_at: new Date('2024-01-08T00:00:08.008Z') },
  { id: 130009, customer_id: 100009, raw_password: 'pAsswOrd$09', saved_at: new Date('2024-01-09T00:00:09.009Z') },
  { id: 130010, customer_id: 100010, raw_password: 'pAsswOrd$10', saved_at: new Date('2024-01-10T00:00:10.010Z') },
  { id: 130011, customer_id: 100011, raw_password: 'pAsswOrd$11', saved_at: new Date('2024-01-11T00:00:11.011Z') },
  { id: 130012, customer_id: 100012, raw_password: 'pAsswOrd$12', saved_at: new Date('2024-01-12T00:00:12.012Z') },
  { id: 130013, customer_id: 100013, raw_password: 'pAsswOrd$13', saved_at: new Date('2024-01-13T00:00:13.013Z') },
  { id: 130014, customer_id: 100014, raw_password: 'pAsswOrd$14', saved_at: new Date('2024-01-14T00:00:14.014Z') },
  { id: 130015, customer_id: 100015, raw_password: 'pAsswOrd$15', saved_at: new Date('2024-01-15T00:00:15.015Z') },
  { id: 130016, customer_id: 100016, raw_password: 'pAsswOrd$16', saved_at: new Date('2024-01-16T00:00:16.016Z') },
  { id: 130017, customer_id: 100017, raw_password: 'pAsswOrd$17', saved_at: new Date('2024-01-17T00:00:17.017Z') },
  { id: 130018, customer_id: 100018, raw_password: 'pAsswOrd$18', saved_at: new Date('2024-01-18T00:00:18.018Z') },
  { id: 130019, customer_id: 100019, raw_password: 'pAsswOrd$19', saved_at: new Date('2024-01-19T00:00:19.019Z') },
  { id: 130020, customer_id: 100020, raw_password: 'pAsswOrd$20', saved_at: new Date('2024-01-20T00:00:20.020Z') },
  { id: 130021, customer_id: 100021, raw_password: 'pAsswOrd$21', saved_at: new Date('2024-01-21T00:00:21.021Z') },
  { id: 130022, customer_id: 100022, raw_password: 'pAsswOrd$22', saved_at: new Date('2024-01-22T00:00:22.022Z') },
  { id: 130023, customer_id: 100023, raw_password: 'pAsswOrd$23', saved_at: new Date('2024-01-23T00:00:23.023Z') },
  { id: 130024, customer_id: 100024, raw_password: 'pAsswOrd$24', saved_at: new Date('2024-01-24T00:00:24.024Z') },
  { id: 130025, customer_id: 100025, raw_password: 'pAsswOrd$25', saved_at: new Date('2024-01-25T00:00:25.025Z') },
  { id: 130026, customer_id: 100026, raw_password: 'pAsswOrd$26', saved_at: new Date('2024-01-26T00:00:26.026Z') },
  { id: 130027, customer_id: 100027, raw_password: 'pAsswOrd$27', saved_at: new Date('2024-01-27T00:00:27.027Z') },
  { id: 130028, customer_id: 100028, raw_password: 'pAsswOrd$28', saved_at: new Date('2024-01-28T00:00:28.028Z') },
  { id: 130029, customer_id: 100029, raw_password: 'pAsswOrd$29', saved_at: new Date('2024-01-29T00:00:29.029Z') },
  { id: 130030, customer_id: 100030, raw_password: 'pAsswOrd$30', saved_at: new Date('2024-01-30T00:00:30.030Z') },
]

/**
 * Fulfill the password hash.
 *
 * @param {{
 *   id: number
 *   customer_id: number
 *   raw_password: string
 *   saved_at: Date
 * }} params - Parameters.
 * @returns {Promise<{
 *   id: number
 *   customer_id: number
 *   saved_at: Date
 *   password_hash: string
 * }>}
 */
async function fulfillPasswordHash ({
  id,
  customer_id,
  raw_password,
  saved_at,
}) {
  const password_hash = await encipher.hash(raw_password)

  return {
    id,
    customer_id,
    saved_at,
    password_hash,
  }
}

/*
 * for access token
 */
const customerAccessTokensSeeds = [
  // expired_at: 3000-01-01T00:00:00.000Z means it never expires
  { id: 140101, customer_id: 100001, access_token: 'access-token-01-01', generated_at: new Date('2024-03-01T00:00:01.001Z'), expired_at: new Date('3000-01-01T00:00:00.000Z') },

  // one expired, and one unlimited
  { id: 140201, customer_id: 100002, access_token: 'access-token-02-01', generated_at: new Date('2024-03-02T00:00:02.002Z'), expired_at: new Date('2024-03-03T02:02:02.002Z') },
  { id: 140202, customer_id: 100002, access_token: 'access-token-02-02', generated_at: new Date('2024-05-02T00:00:02.002Z'), expired_at: new Date('3000-01-02T00:00:00.000Z') },

  // two expired
  { id: 140301, customer_id: 100003, access_token: 'access-token-03-01', generated_at: new Date('2024-03-03T00:00:03.003Z'), expired_at: new Date('2024-03-04T03:03:03.003Z') },
  { id: 140302, customer_id: 100003, access_token: 'access-token-03-02', generated_at: new Date('2024-05-03T00:00:03.003Z'), expired_at: new Date('2024-05-04T03:03:03.003Z') },

  // expired_at: 3000-01-01T00:00:00.000Z means it never expires
  { id: 140401, customer_id: 100004, access_token: 'access-token-04-01', generated_at: new Date('2024-03-04T00:00:04.004Z'), expired_at: new Date('3000-01-04T00:00:00.000Z') },
  { id: 140501, customer_id: 100005, access_token: 'access-token-05-01', generated_at: new Date('2024-03-05T00:00:05.005Z'), expired_at: new Date('3000-01-05T00:00:00.000Z') },
  { id: 140601, customer_id: 100006, access_token: 'access-token-06-01', generated_at: new Date('2024-03-06T00:00:06.006Z'), expired_at: new Date('3000-01-06T00:00:00.000Z') },
  { id: 140701, customer_id: 100007, access_token: 'access-token-07-01', generated_at: new Date('2024-03-07T00:00:07.007Z'), expired_at: new Date('3000-01-07T00:00:00.000Z') },
  { id: 140801, customer_id: 100008, access_token: 'access-token-08-01', generated_at: new Date('2024-03-08T00:00:08.008Z'), expired_at: new Date('3000-01-08T00:00:00.000Z') },
  { id: 140901, customer_id: 100009, access_token: 'access-token-09-01', generated_at: new Date('2024-03-09T00:00:09.009Z'), expired_at: new Date('3000-01-09T00:00:00.000Z') },
  { id: 141001, customer_id: 100010, access_token: 'access-token-10-01', generated_at: new Date('2024-03-10T00:00:10.010Z'), expired_at: new Date('3000-01-10T00:00:00.000Z') },
  { id: 141101, customer_id: 100011, access_token: 'access-token-11-01', generated_at: new Date('2024-03-11T00:00:11.011Z'), expired_at: new Date('3000-01-11T00:00:00.000Z') },
  { id: 141201, customer_id: 100012, access_token: 'access-token-12-01', generated_at: new Date('2024-03-12T00:00:12.012Z'), expired_at: new Date('3000-01-12T00:00:00.000Z') },
  { id: 141301, customer_id: 100013, access_token: 'access-token-13-01', generated_at: new Date('2024-03-13T00:00:13.013Z'), expired_at: new Date('3000-01-13T00:00:00.000Z') },
  { id: 141401, customer_id: 100014, access_token: 'access-token-14-01', generated_at: new Date('2024-03-14T00:00:14.014Z'), expired_at: new Date('3000-01-14T00:00:00.000Z') },
  { id: 141501, customer_id: 100015, access_token: 'access-token-15-01', generated_at: new Date('2024-03-15T00:00:15.015Z'), expired_at: new Date('3000-01-15T00:00:00.000Z') },
  { id: 141601, customer_id: 100016, access_token: 'access-token-16-01', generated_at: new Date('2024-03-16T00:00:16.016Z'), expired_at: new Date('3000-01-16T00:00:00.000Z') },
  { id: 141701, customer_id: 100017, access_token: 'access-token-17-01', generated_at: new Date('2024-03-17T00:00:17.017Z'), expired_at: new Date('3000-01-17T00:00:00.000Z') },
  { id: 141801, customer_id: 100018, access_token: 'access-token-18-01', generated_at: new Date('2024-03-18T00:00:18.018Z'), expired_at: new Date('3000-01-18T00:00:00.000Z') },
  { id: 141901, customer_id: 100019, access_token: 'access-token-19-01', generated_at: new Date('2024-03-19T00:00:19.019Z'), expired_at: new Date('3000-01-19T00:00:00.000Z') },
  { id: 142001, customer_id: 100020, access_token: 'access-token-20-01', generated_at: new Date('2024-03-20T00:00:20.020Z'), expired_at: new Date('3000-01-20T00:00:00.000Z') },
  { id: 142101, customer_id: 100021, access_token: 'access-token-21-01', generated_at: new Date('2024-03-21T00:00:21.021Z'), expired_at: new Date('3000-01-21T00:00:00.000Z') },
  { id: 142201, customer_id: 100022, access_token: 'access-token-22-01', generated_at: new Date('2024-03-22T00:00:22.022Z'), expired_at: new Date('3000-01-22T00:00:00.000Z') },
  { id: 142301, customer_id: 100023, access_token: 'access-token-23-01', generated_at: new Date('2024-03-23T00:00:23.023Z'), expired_at: new Date('3000-01-23T00:00:00.000Z') },
  { id: 142401, customer_id: 100024, access_token: 'access-token-24-01', generated_at: new Date('2024-03-24T00:00:24.024Z'), expired_at: new Date('3000-01-24T00:00:00.000Z') },
  { id: 142501, customer_id: 100025, access_token: 'access-token-25-01', generated_at: new Date('2024-03-25T00:00:25.025Z'), expired_at: new Date('3000-01-25T00:00:00.000Z') },
  { id: 142601, customer_id: 100026, access_token: 'access-token-26-01', generated_at: new Date('2024-03-26T00:00:26.026Z'), expired_at: new Date('3000-01-26T00:00:00.000Z') },
  { id: 142701, customer_id: 100027, access_token: 'access-token-27-01', generated_at: new Date('2024-03-27T00:00:27.027Z'), expired_at: new Date('3000-01-27T00:00:00.000Z') },
  { id: 142801, customer_id: 100028, access_token: 'access-token-28-01', generated_at: new Date('2024-03-28T00:00:28.028Z'), expired_at: new Date('3000-01-28T00:00:00.000Z') },
  { id: 142901, customer_id: 100029, access_token: 'access-token-29-01', generated_at: new Date('2024-03-29T00:00:29.029Z'), expired_at: new Date('3000-01-29T00:00:00.000Z') },
  { id: 143001, customer_id: 100030, access_token: 'access-token-30-01', generated_at: new Date('2024-03-30T00:00:30.030Z'), expired_at: new Date('3000-01-30T00:00:00.000Z') },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fulfilledCustomerPasswordHashes = await Promise.all(
      customerPasswordHashesSeeds.map(it => fulfillPasswordHash(it))
    )

    await queryInterface.bulkInsert(TABLE_NAME.CUSTOMERS, TimestampSeedsSupplier.supplyAll(customersSeeds), {})
    await queryInterface.bulkInsert(TABLE_NAME.CUSTOMER_BASICS, TimestampSeedsSupplier.supplyAll(customersBasicsSeeds), {})
    await queryInterface.bulkInsert(TABLE_NAME.CUSTOMER_SECRETS, TimestampSeedsSupplier.supplyAll(customerSecretsSeeds), {})
    await queryInterface.bulkInsert(TABLE_NAME.CUSTOMER_PASSWORD_HASHES, TimestampSeedsSupplier.supplyAll(fulfilledCustomerPasswordHashes), {})
    await queryInterface.bulkInsert(TABLE_NAME.CUSTOMER_ACCESS_TOKENS, TimestampSeedsSupplier.supplyAll(customerAccessTokensSeeds), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME.CUSTOMER_ACCESS_TOKENS, { id: customerAccessTokensSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.CUSTOMER_PASSWORD_HASHES, { id: customerPasswordHashesSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.CUSTOMER_SECRETS, { id: customerSecretsSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.CUSTOMER_BASICS, { id: customersBasicsSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.CUSTOMERS, { id: customersSeeds.map(it => it.id) })
  },
}
