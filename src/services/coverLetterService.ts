import { NextApiRequest } from 'next'

import { getAxiosInstance } from '@/lib/api/axiosConfig.ts'
import { ApiErrorType } from '@/lib/api/constants'
import { ApiError } from '@/lib/api/errors'
import { fetchToken } from '@/lib/api/auth'

export const generateCoverLetter = async (data: any, serverRequest?: NextApiRequest) => {
  try {
    const token =  await fetchToken(serverRequest)
    //console.log('Token being sent to backend:', token) 
    const axios = await getAxiosInstance(serverRequest, true)
    const response = await axios.post('/api/coverLetter/generate', data,{
  headers: { 'Content-Type': 'application/json' } 
})
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to generate cover letters', undefined, error)
  }
}
export const getCoverLetters = async (token?:string) => {
  try {
    const axios = await getAxiosInstance(undefined, true,token)
    const response = await axios.get('/api/coverLetter/all')
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to fetch covre letters', undefined, error)
  }
}