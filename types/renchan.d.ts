import {
  Server,
} from 'http'

import RenchanEnv from '@openreachtech/renchan-env'

import './express.d.ts'
import './graphql.d.ts'
import './restfulapi.d.ts'

import { default as DeepBulkClassLoaderActual } from '../lib/tools/DeepBulkClassLoader'
import { default as RootPathActual } from '../lib/tools/RootPath'

/**
 * global types
 */
declare global {
  namespace renchan {
    type RenchanEnv = RenchanEnv.EnvironmentFacade.EnvironmentFacadeInterface

    type HttpServer = Server

    type UserEntity = object & {
      id: number
    }

    type DeepBulkClassLoader = DeepBulkClassLoaderActual
    type RootPath = RootPathActual
  }
}
