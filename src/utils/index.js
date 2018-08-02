import { get } from 'lodash'
import { initSegment } from './analytics'
import { init as initErrorHandler } from './errorHandling'
import { currentUserProjectPermissions } from 'selectors'

export const initScripts = () => {
  initErrorHandler()
  initSegment()
}

export const databaseURLToProjectName = databaseURL =>
  databaseURL.replace('https://', '').replace('.firebaseio.com', '')

export const createPermissionChecker = (state, props) => permission => {
  const permissionsByType = currentUserProjectPermissions(state, props)
  return get(permissionsByType, permission) === true
}
