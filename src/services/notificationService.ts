import { NextApiRequest } from 'next'

import { getAxiosInstance } from '@/lib/api/axiosConfig.ts'
import { ApiErrorType } from '@/lib/api/constants'
import { ApiError } from '@/lib/api/errors'

export const getNotifications = async (serverRequest?: NextApiRequest) => {
  try {
    const axiosInstance = await getAxiosInstance(serverRequest, true)
    const response = await axiosInstance.get('/notification/all')
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      ApiErrorType.NETWORK,
      'Network error occurred while fetching notifications',
      undefined,
      error,
    )
  }
}

export const markNotificationAsRead = async (
  notificationId: string,
  serverRequest?: NextApiRequest,
) => {
  try {
    const axiosInstance = await getAxiosInstance(serverRequest, true)
    const response = await axiosInstance.post(`/notification/mark-as-read/${notificationId}`)
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      ApiErrorType.NETWORK,
      'Network error occurred while marking notification as read',
      undefined,
      error,
    )
  }
}