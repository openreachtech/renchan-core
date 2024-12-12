/*
 * Bootstrap file to activate Sequelize.
 */

import {
  SequelizeActivator,
} from '@openreachtech/renchan-sequelize'

import rootPath from '../../lib/globals/root-path.js'
import env from '../../lib/globals/env.js'

export default async () =>
  SequelizeActivator
    .createAsync({
      nodeEnv: env.NODE_ENV,
      configPath: rootPath.to('app/sequelize/config.cjs'),
      modelsPath: rootPath.to('app/sequelize/models/'),
    })
