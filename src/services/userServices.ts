import { NextApiRequest } from 'next'

import { getAxiosInstance } from '@/lib/api/axiosConfig.ts'
import { ApiErrorType } from '@/lib/api/constants'
import { ApiError } from '@/lib/api/errors'
import { signedUpUser } from '@/types/userType'

export const signUpUser = async (data: signedUpUser, serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest)
    const response = await axios.post('/api/auth/signup', data)
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to sign up user', undefined, error)
  }
}
//not used next auth takes care of login 
export const loginUser = async (data: any, serverRequest?: NextApiRequest) => {
    try {
        const axios = await getAxiosInstance(serverRequest)
        const response = await axios.post('/api/auth/login', data)
        return response.data
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }   
        throw new ApiError(ApiErrorType.SERVER, 'Failed to log in user', undefined, error)
    }
}