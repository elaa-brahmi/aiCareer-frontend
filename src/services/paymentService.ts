import { NextApiRequest } from 'next'

import { getAxiosInstance } from '@/lib/api/axiosConfig.ts'
import { ApiErrorType } from '@/lib/api/constants'
import { ApiError } from '@/lib/api/errors'

export const handleCheckoutSessionCompleted = async (data: any, serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest)
    const response = await axios.post('/api/v1/payment/checkout', data)
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to checkout user', undefined, error)
  }
}
export const handleSubscriptionDeleted = async (data: any, serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest)
    const response = await axios.post('/api/v1/payment/delete-subscription', data)
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to delete user subscription', undefined, error)
  }
}