'use strict'

const env = require('../../lib/globals/env.cjs')

module.exports = {
  development: {
    database: 'development',
    username: null,
    password: null,

    dialect: 'sqlite',
    storage: 'app/storage/development.sqlite3',

    logging: false,
  },
  live: {
    username: 'root',
    password: 'password',
    database: 'live',
    host: '127.0.0.1',

    dialect: 'mariadb',
    port: '3306',
  },
  staging: {
    database: 'staging_database',
    username: 'admin-staging',
    password: 'staging-password',

    dialect: 'mysql',
    host: 'http://staging.sample.openreach.tech',
    port: 3306,
  },
  production: {
    database: env.DATABASE_NAME,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,

    dialect: env.DATABASE_DIALECT,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
  },
}
