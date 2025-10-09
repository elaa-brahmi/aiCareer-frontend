import axios, { AxiosInstance, AxiosError } from 'axios'
import { NextApiRequest } from 'next'

import { BASE_URL } from './constants'
import { ApiError } from './errors'
import { ApiErrorType } from './constants'
import { fetchToken } from './auth'

const instanceCache = new WeakMap<NextApiRequest | object, AxiosInstance>()

export const getAxiosInstance = async (
  serverRequest?: NextApiRequest,
  requireAuth = false,
  token?:string
): Promise<AxiosInstance> => {
  const cacheKey = serverRequest || {}

  if (instanceCache.has(cacheKey)) {
    return instanceCache.get(cacheKey)!
  }
 let authToken=null
  // Use the provided token if available, otherwise fetch it
  if(token){
    authToken = token
  }
  else{
    authToken = requireAuth ? await fetchToken(serverRequest) : null
  }
  console.log('auth token in axios config ',authToken)

  

  if (requireAuth && !authToken) {
    throw new ApiError(ApiErrorType.AUTH, 'Authentication required - no valid token found', 401)
  }

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  })

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const { response, request } = error

      if (response) {
        const { status, data } = response
        let errorType = ApiErrorType.SERVER
        let message = 'Server error occurred'

        if (status >= 400 && status < 500) {
          errorType = ApiErrorType.CLIENT
          message = 'Client error occurred'
          if ([401, 403].includes(status)) {
            errorType = ApiErrorType.AUTH
            message = 'Authentication failed'
          } else if (status === 422) {
            errorType = ApiErrorType.VALIDATION
            message = 'Validation failed'
          }
        }

        throw new ApiError(errorType, message, status, error, data)
      }

      if (request) {
        throw new ApiError(
          ApiErrorType.NETWORK,
          'Network error - no response received',
          undefined,
          error,
        )
      }

      throw new ApiError(ApiErrorType.CLIENT, 'Request setup error', undefined, error)
    },
  )

  instanceCache.set(cacheKey, instance)
  return instance
}
