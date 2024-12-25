'use strict'

const TimestampSeedsSupplier = require('@openreachtech/renchan-sequelize/lib/tools/TimestampSeedsSupplier.cjs')

const {
  Encipher,
} = require('@openreachtech/renchan-tools')

const encipher = Encipher.create()

const TABLE_NAME = {
  ADMINS: 'admins',
  ADMIN_BASICS: 'admin_basics',
  ADMIN_SECRETS: 'admin_secrets',
  ADMIN_PASSWORD_HASHES: 'admin_password_hashes',
  ADMIN_ACCESS_TOKENS: 'admin_access_tokens',
}

const adminsSeeds = [
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

const adminsBasicsSeeds = [
  { id: 110001, admin_id: 100001, username: 'adminName01', saved_at: new Date('2024-01-01T00:00:01.001Z') },
  { id: 110002, admin_id: 100002, username: 'adminName02', saved_at: new Date('2024-01-02T00:00:02.002Z') },
  { id: 110003, admin_id: 100003, username: 'adminName03', saved_at: new Date('2024-01-03T00:00:03.003Z') },
  { id: 110004, admin_id: 100004, username: 'adminName04', saved_at: new Date('2024-01-04T00:00:04.004Z') },
  { id: 110005, admin_id: 100005, username: 'adminName05', saved_at: new Date('2024-01-05T00:00:05.005Z') },
  { id: 110006, admin_id: 100006, username: 'adminName06', saved_at: new Date('2024-01-06T00:00:06.006Z') },
  { id: 110007, admin_id: 100007, username: 'adminName07', saved_at: new Date('2024-01-07T00:00:07.007Z') },
  { id: 110008, admin_id: 100008, username: 'adminName08', saved_at: new Date('2024-01-08T00:00:08.008Z') },
  { id: 110009, admin_id: 100009, username: 'adminName09', saved_at: new Date('2024-01-09T00:00:09.009Z') },
  { id: 110010, admin_id: 100010, username: 'adminName10', saved_at: new Date('2024-01-10T00:00:10.010Z') },
  { id: 110011, admin_id: 100011, username: 'adminName11', saved_at: new Date('2024-01-11T00:00:11.011Z') },
  { id: 110012, admin_id: 100012, username: 'adminName12', saved_at: new Date('2024-01-12T00:00:12.012Z') },
  { id: 110013, admin_id: 100013, username: 'adminName13', saved_at: new Date('2024-01-13T00:00:13.013Z') },
  { id: 110014, admin_id: 100014, username: 'adminName14', saved_at: new Date('2024-01-14T00:00:14.014Z') },
  { id: 110015, admin_id: 100015, username: 'adminName15', saved_at: new Date('2024-01-15T00:00:15.015Z') },
  { id: 110016, admin_id: 100016, username: 'adminName16', saved_at: new Date('2024-01-16T00:00:16.016Z') },
  { id: 110017, admin_id: 100017, username: 'adminName17', saved_at: new Date('2024-01-17T00:00:17.017Z') },
  { id: 110018, admin_id: 100018, username: 'adminName18', saved_at: new Date('2024-01-18T00:00:18.018Z') },
  { id: 110019, admin_id: 100019, username: 'adminName19', saved_at: new Date('2024-01-19T00:00:19.019Z') },
  { id: 110020, admin_id: 100020, username: 'adminName20', saved_at: new Date('2024-01-20T00:00:20.020Z') },
  { id: 110021, admin_id: 100021, username: 'adminName21', saved_at: new Date('2024-01-21T00:00:21.021Z') },
  { id: 110022, admin_id: 100022, username: 'adminName22', saved_at: new Date('2024-01-22T00:00:22.022Z') },
  { id: 110023, admin_id: 100023, username: 'adminName23', saved_at: new Date('2024-01-23T00:00:23.023Z') },
  { id: 110024, admin_id: 100024, username: 'adminName24', saved_at: new Date('2024-01-24T00:00:24.024Z') },
  { id: 110025, admin_id: 100025, username: 'adminName25', saved_at: new Date('2024-01-25T00:00:25.025Z') },
  { id: 110026, admin_id: 100026, username: 'adminName26', saved_at: new Date('2024-01-26T00:00:26.026Z') },
  { id: 110027, admin_id: 100027, username: 'adminName27', saved_at: new Date('2024-01-27T00:00:27.027Z') },
  { id: 110028, admin_id: 100028, username: 'adminName28', saved_at: new Date('2024-01-28T00:00:28.028Z') },
  { id: 110029, admin_id: 100029, username: 'adminName29', saved_at: new Date('2024-01-29T00:00:29.029Z') },
  { id: 110030, admin_id: 100030, username: 'adminName30', saved_at: new Date('2024-01-30T00:00:30.030Z') },
]

/*
 * for email
 */
const adminSecretsSeeds = [
  { id: 120001, admin_id: 100001, saved_at: new Date('2024-01-01T00:00:01.001Z'), email: 'admin.100001@example.com' },
  { id: 120002, admin_id: 100002, saved_at: new Date('2024-01-02T00:00:02.002Z'), email: 'admin.100002@example.com' },
  { id: 120003, admin_id: 100003, saved_at: new Date('2024-01-03T00:00:03.003Z'), email: 'admin.100003@example.com' },
  { id: 120004, admin_id: 100004, saved_at: new Date('2024-01-04T00:00:04.004Z'), email: 'admin.100004@example.com' },
  { id: 120005, admin_id: 100005, saved_at: new Date('2024-01-05T00:00:05.005Z'), email: 'admin.100005@example.com' },
  { id: 120006, admin_id: 100006, saved_at: new Date('2024-01-06T00:00:06.006Z'), email: 'admin.100006@example.com' },
  { id: 120007, admin_id: 100007, saved_at: new Date('2024-01-07T00:00:07.007Z'), email: 'admin.100007@example.com' },
  { id: 120008, admin_id: 100008, saved_at: new Date('2024-01-08T00:00:08.008Z'), email: 'admin.100008@example.com' },
  { id: 120009, admin_id: 100009, saved_at: new Date('2024-01-09T00:00:09.009Z'), email: 'admin.100009@example.com' },
  { id: 120010, admin_id: 100010, saved_at: new Date('2024-01-10T00:00:10.010Z'), email: 'admin.100010@example.com' },
  { id: 120011, admin_id: 100011, saved_at: new Date('2024-01-11T00:00:11.011Z'), email: 'admin.100011@example.com' },
  { id: 120012, admin_id: 100012, saved_at: new Date('2024-01-12T00:00:12.012Z'), email: 'admin.100012@example.com' },
  { id: 120013, admin_id: 100013, saved_at: new Date('2024-01-13T00:00:13.013Z'), email: 'admin.100013@example.com' },
  { id: 120014, admin_id: 100014, saved_at: new Date('2024-01-14T00:00:14.014Z'), email: 'admin.100014@example.com' },
  { id: 120015, admin_id: 100015, saved_at: new Date('2024-01-15T00:00:15.015Z'), email: 'admin.100015@example.com' },
  { id: 120016, admin_id: 100016, saved_at: new Date('2024-01-16T00:00:16.016Z'), email: 'admin.100016@example.com' },
  { id: 120017, admin_id: 100017, saved_at: new Date('2024-01-17T00:00:17.017Z'), email: 'admin.100017@example.com' },
  { id: 120018, admin_id: 100018, saved_at: new Date('2024-01-18T00:00:18.018Z'), email: 'admin.100018@example.com' },
  { id: 120019, admin_id: 100019, saved_at: new Date('2024-01-19T00:00:19.019Z'), email: 'admin.100019@example.com' },
  { id: 120020, admin_id: 100020, saved_at: new Date('2024-01-20T00:00:20.020Z'), email: 'admin.100020@example.com' },
  { id: 120021, admin_id: 100021, saved_at: new Date('2024-01-21T00:00:21.021Z'), email: 'admin.100021@example.com' },
  { id: 120022, admin_id: 100022, saved_at: new Date('2024-01-22T00:00:22.022Z'), email: 'admin.100022@example.com' },
  { id: 120023, admin_id: 100023, saved_at: new Date('2024-01-23T00:00:23.023Z'), email: 'admin.100023@example.com' },
  { id: 120024, admin_id: 100024, saved_at: new Date('2024-01-24T00:00:24.024Z'), email: 'admin.100024@example.com' },
  { id: 120025, admin_id: 100025, saved_at: new Date('2024-01-25T00:00:25.025Z'), email: 'admin.100025@example.com' },
  { id: 120026, admin_id: 100026, saved_at: new Date('2024-01-26T00:00:26.026Z'), email: 'admin.100026@example.com' },
  { id: 120027, admin_id: 100027, saved_at: new Date('2024-01-27T00:00:27.027Z'), email: 'admin.100027@example.com' },
  { id: 120028, admin_id: 100028, saved_at: new Date('2024-01-28T00:00:28.028Z'), email: 'admin.100028@example.com' },
  { id: 120029, admin_id: 100029, saved_at: new Date('2024-01-29T00:00:29.029Z'), email: 'admin.100029@example.com' },
  { id: 120030, admin_id: 100030, saved_at: new Date('2024-01-30T00:00:30.030Z'), email: 'admin.100030@example.com' },
]

/*
 * for password hash
 */
const adminPasswordHashesSeeds = [
  { id: 130001, admin_id: 100001, raw_password: 'pAsswOrd$01', saved_at: new Date('2024-01-01T00:00:01.001Z') },
  { id: 130002, admin_id: 100002, raw_password: 'pAsswOrd$02', saved_at: new Date('2024-01-02T00:00:02.002Z') },
  { id: 130003, admin_id: 100003, raw_password: 'pAsswOrd$03', saved_at: new Date('2024-01-03T00:00:03.003Z') },
  { id: 130004, admin_id: 100004, raw_password: 'pAsswOrd$04', saved_at: new Date('2024-01-04T00:00:04.004Z') },
  { id: 130005, admin_id: 100005, raw_password: 'pAsswOrd$05', saved_at: new Date('2024-01-05T00:00:05.005Z') },
  { id: 130006, admin_id: 100006, raw_password: 'pAsswOrd$06', saved_at: new Date('2024-01-06T00:00:06.006Z') },
  { id: 130007, admin_id: 100007, raw_password: 'pAsswOrd$07', saved_at: new Date('2024-01-07T00:00:07.007Z') },
  { id: 130008, admin_id: 100008, raw_password: 'pAsswOrd$08', saved_at: new Date('2024-01-08T00:00:08.008Z') },
  { id: 130009, admin_id: 100009, raw_password: 'pAsswOrd$09', saved_at: new Date('2024-01-09T00:00:09.009Z') },
  { id: 130010, admin_id: 100010, raw_password: 'pAsswOrd$10', saved_at: new Date('2024-01-10T00:00:10.010Z') },
  { id: 130011, admin_id: 100011, raw_password: 'pAsswOrd$11', saved_at: new Date('2024-01-11T00:00:11.011Z') },
  { id: 130012, admin_id: 100012, raw_password: 'pAsswOrd$12', saved_at: new Date('2024-01-12T00:00:12.012Z') },
  { id: 130013, admin_id: 100013, raw_password: 'pAsswOrd$13', saved_at: new Date('2024-01-13T00:00:13.013Z') },
  { id: 130014, admin_id: 100014, raw_password: 'pAsswOrd$14', saved_at: new Date('2024-01-14T00:00:14.014Z') },
  { id: 130015, admin_id: 100015, raw_password: 'pAsswOrd$15', saved_at: new Date('2024-01-15T00:00:15.015Z') },
  { id: 130016, admin_id: 100016, raw_password: 'pAsswOrd$16', saved_at: new Date('2024-01-16T00:00:16.016Z') },
  { id: 130017, admin_id: 100017, raw_password: 'pAsswOrd$17', saved_at: new Date('2024-01-17T00:00:17.017Z') },
  { id: 130018, admin_id: 100018, raw_password: 'pAsswOrd$18', saved_at: new Date('2024-01-18T00:00:18.018Z') },
  { id: 130019, admin_id: 100019, raw_password: 'pAsswOrd$19', saved_at: new Date('2024-01-19T00:00:19.019Z') },
  { id: 130020, admin_id: 100020, raw_password: 'pAsswOrd$20', saved_at: new Date('2024-01-20T00:00:20.020Z') },
  { id: 130021, admin_id: 100021, raw_password: 'pAsswOrd$21', saved_at: new Date('2024-01-21T00:00:21.021Z') },
  { id: 130022, admin_id: 100022, raw_password: 'pAsswOrd$22', saved_at: new Date('2024-01-22T00:00:22.022Z') },
  { id: 130023, admin_id: 100023, raw_password: 'pAsswOrd$23', saved_at: new Date('2024-01-23T00:00:23.023Z') },
  { id: 130024, admin_id: 100024, raw_password: 'pAsswOrd$24', saved_at: new Date('2024-01-24T00:00:24.024Z') },
  { id: 130025, admin_id: 100025, raw_password: 'pAsswOrd$25', saved_at: new Date('2024-01-25T00:00:25.025Z') },
  { id: 130026, admin_id: 100026, raw_password: 'pAsswOrd$26', saved_at: new Date('2024-01-26T00:00:26.026Z') },
  { id: 130027, admin_id: 100027, raw_password: 'pAsswOrd$27', saved_at: new Date('2024-01-27T00:00:27.027Z') },
  { id: 130028, admin_id: 100028, raw_password: 'pAsswOrd$28', saved_at: new Date('2024-01-28T00:00:28.028Z') },
  { id: 130029, admin_id: 100029, raw_password: 'pAsswOrd$29', saved_at: new Date('2024-01-29T00:00:29.029Z') },
  { id: 130030, admin_id: 100030, raw_password: 'pAsswOrd$30', saved_at: new Date('2024-01-30T00:00:30.030Z') },
]

/**
 * Fulfill the password hash.
 *
 * @param {{
 *   id: number
 *   admin_id: number
 *   raw_password: string
 *   saved_at: Date
 * }} params - Parameters.
 * @returns {Promise<{
 *   id: number
 *   admin_id: number
 *   saved_at: Date
 *   password_hash: string
 * }>}
 */
async function fulfillPasswordHash ({
  id,
  admin_id,
  raw_password,
  saved_at,
}) {
  const password_hash = await encipher.hash(raw_password)

  return {
    id,
    admin_id,
    saved_at,
    password_hash,
  }
}

/*
 * for access token
 */
const adminAccessTokensSeeds = [
  // expired_at: 3000-01-01T00:00:00.000Z means it never expires
  { id: 140101, admin_id: 100001, access_token: 'access-token-01-01', generated_at: new Date('2024-03-01T00:00:01.001Z'), expired_at: new Date('3000-01-01T00:00:00.000Z') },

  // one expired, and one unlimited
  { id: 140201, admin_id: 100002, access_token: 'access-token-02-01', generated_at: new Date('2024-03-02T00:00:02.002Z'), expired_at: new Date('2024-03-03T02:02:02.002Z') },
  { id: 140202, admin_id: 100002, access_token: 'access-token-02-02', generated_at: new Date('2024-05-02T00:00:02.002Z'), expired_at: new Date('3000-01-02T00:00:00.000Z') },

  // two expired
  { id: 140301, admin_id: 100003, access_token: 'access-token-03-01', generated_at: new Date('2024-03-03T00:00:03.003Z'), expired_at: new Date('2024-03-04T03:03:03.003Z') },
  { id: 140302, admin_id: 100003, access_token: 'access-token-03-02', generated_at: new Date('2024-05-03T00:00:03.003Z'), expired_at: new Date('2024-05-04T03:03:03.003Z') },

  // expired_at: 3000-01-01T00:00:00.000Z means it never expires
  { id: 140104, admin_id: 100004, access_token: 'access-token-04-01', generated_at: new Date('2024-03-04T00:00:04.004Z'), expired_at: new Date('3000-01-04T00:00:00.000Z') },
  { id: 140105, admin_id: 100005, access_token: 'access-token-05-01', generated_at: new Date('2024-03-05T00:00:05.005Z'), expired_at: new Date('3000-01-05T00:00:00.000Z') },
  { id: 140106, admin_id: 100006, access_token: 'access-token-06-01', generated_at: new Date('2024-03-06T00:00:06.006Z'), expired_at: new Date('3000-01-06T00:00:00.000Z') },
  { id: 140107, admin_id: 100007, access_token: 'access-token-07-01', generated_at: new Date('2024-03-07T00:00:07.007Z'), expired_at: new Date('3000-01-07T00:00:00.000Z') },
  { id: 140108, admin_id: 100008, access_token: 'access-token-08-01', generated_at: new Date('2024-03-08T00:00:08.008Z'), expired_at: new Date('3000-01-08T00:00:00.000Z') },
  { id: 140109, admin_id: 100009, access_token: 'access-token-09-01', generated_at: new Date('2024-03-09T00:00:09.009Z'), expired_at: new Date('3000-01-09T00:00:00.000Z') },
  { id: 140110, admin_id: 100010, access_token: 'access-token-10-01', generated_at: new Date('2024-03-10T00:00:10.010Z'), expired_at: new Date('3000-01-10T00:00:00.000Z') },
  { id: 140111, admin_id: 100011, access_token: 'access-token-11-01', generated_at: new Date('2024-03-11T00:00:11.011Z'), expired_at: new Date('3000-01-11T00:00:00.000Z') },
  { id: 140112, admin_id: 100012, access_token: 'access-token-12-01', generated_at: new Date('2024-03-12T00:00:12.012Z'), expired_at: new Date('3000-01-12T00:00:00.000Z') },
  { id: 140113, admin_id: 100013, access_token: 'access-token-13-01', generated_at: new Date('2024-03-13T00:00:13.013Z'), expired_at: new Date('3000-01-13T00:00:00.000Z') },
  { id: 140114, admin_id: 100014, access_token: 'access-token-14-01', generated_at: new Date('2024-03-14T00:00:14.014Z'), expired_at: new Date('3000-01-14T00:00:00.000Z') },
  { id: 140115, admin_id: 100015, access_token: 'access-token-15-01', generated_at: new Date('2024-03-15T00:00:15.015Z'), expired_at: new Date('3000-01-15T00:00:00.000Z') },
  { id: 140116, admin_id: 100016, access_token: 'access-token-16-01', generated_at: new Date('2024-03-16T00:00:16.016Z'), expired_at: new Date('3000-01-16T00:00:00.000Z') },
  { id: 140117, admin_id: 100017, access_token: 'access-token-17-01', generated_at: new Date('2024-03-17T00:00:17.017Z'), expired_at: new Date('3000-01-17T00:00:00.000Z') },
  { id: 140118, admin_id: 100018, access_token: 'access-token-18-01', generated_at: new Date('2024-03-18T00:00:18.018Z'), expired_at: new Date('3000-01-18T00:00:00.000Z') },
  { id: 140119, admin_id: 100019, access_token: 'access-token-19-01', generated_at: new Date('2024-03-19T00:00:19.019Z'), expired_at: new Date('3000-01-19T00:00:00.000Z') },
  { id: 140120, admin_id: 100020, access_token: 'access-token-20-01', generated_at: new Date('2024-03-20T00:00:20.020Z'), expired_at: new Date('3000-01-20T00:00:00.000Z') },
  { id: 140121, admin_id: 100021, access_token: 'access-token-21-01', generated_at: new Date('2024-03-21T00:00:21.021Z'), expired_at: new Date('3000-01-21T00:00:00.000Z') },
  { id: 140122, admin_id: 100022, access_token: 'access-token-22-01', generated_at: new Date('2024-03-22T00:00:22.022Z'), expired_at: new Date('3000-01-22T00:00:00.000Z') },
  { id: 140123, admin_id: 100023, access_token: 'access-token-23-01', generated_at: new Date('2024-03-23T00:00:23.023Z'), expired_at: new Date('3000-01-23T00:00:00.000Z') },
  { id: 140124, admin_id: 100024, access_token: 'access-token-24-01', generated_at: new Date('2024-03-24T00:00:24.024Z'), expired_at: new Date('3000-01-24T00:00:00.000Z') },
  { id: 140125, admin_id: 100025, access_token: 'access-token-25-01', generated_at: new Date('2024-03-25T00:00:25.025Z'), expired_at: new Date('3000-01-25T00:00:00.000Z') },
  { id: 140126, admin_id: 100026, access_token: 'access-token-26-01', generated_at: new Date('2024-03-26T00:00:26.026Z'), expired_at: new Date('3000-01-26T00:00:00.000Z') },
  { id: 140127, admin_id: 100027, access_token: 'access-token-27-01', generated_at: new Date('2024-03-27T00:00:27.027Z'), expired_at: new Date('3000-01-27T00:00:00.000Z') },
  { id: 140128, admin_id: 100028, access_token: 'access-token-28-01', generated_at: new Date('2024-03-28T00:00:28.028Z'), expired_at: new Date('3000-01-28T00:00:00.000Z') },
  { id: 140129, admin_id: 100029, access_token: 'access-token-29-01', generated_at: new Date('2024-03-29T00:00:29.029Z'), expired_at: new Date('3000-01-29T00:00:00.000Z') },
  { id: 140130, admin_id: 100030, access_token: 'access-token-30-01', generated_at: new Date('2024-03-30T00:00:30.030Z'), expired_at: new Date('3000-01-30T00:00:00.000Z') },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fulfilledAdminPasswordHashes = await Promise.all(
      adminPasswordHashesSeeds.map(it => fulfillPasswordHash(it))
    )

    await queryInterface.bulkInsert(TABLE_NAME.ADMINS, TimestampSeedsSupplier.supplyAll(adminsSeeds), {})
    await queryInterface.bulkInsert(TABLE_NAME.ADMIN_BASICS, TimestampSeedsSupplier.supplyAll(adminsBasicsSeeds), {})
    await queryInterface.bulkInsert(TABLE_NAME.ADMIN_SECRETS, TimestampSeedsSupplier.supplyAll(adminSecretsSeeds), {})
    await queryInterface.bulkInsert(TABLE_NAME.ADMIN_PASSWORD_HASHES, TimestampSeedsSupplier.supplyAll(fulfilledAdminPasswordHashes), {})
    await queryInterface.bulkInsert(TABLE_NAME.ADMIN_ACCESS_TOKENS, TimestampSeedsSupplier.supplyAll(adminAccessTokensSeeds), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME.ADMIN_ACCESS_TOKENS, { id: adminAccessTokensSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.ADMIN_PASSWORD_HASHES, { id: adminPasswordHashesSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.ADMIN_SECRETS, { id: adminSecretsSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.ADMIN_BASICS, { id: adminsBasicsSeeds.map(it => it.id) })
    await queryInterface.bulkDelete(TABLE_NAME.ADMINS, { id: adminsSeeds.map(it => it.id) })
  },
}
