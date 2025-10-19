import { NextApiRequest } from 'next'

import { getAxiosInstance } from '@/lib/api/axiosConfig.ts'
import { ApiErrorType } from '@/lib/api/constants'
import { ApiError } from '@/lib/api/errors'

export const generatechatBotResponse = async (userInput:string, serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest,true);
    const response = await axios.post(`/api/chat/embed`, {msg:userInput} );
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }   
    throw new ApiError(ApiErrorType.SERVER, 'Failed to generate bot response', undefined, error)
  }
} 
export const getUserChatHistory = async ( serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest,true);
    const response = await axios.get(`/api/chat/all` );
    return response.data.history
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }   
    throw new ApiError(ApiErrorType.SERVER, 'Failed to get user history resume', undefined, error)
  }
} 
