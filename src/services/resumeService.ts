import { NextApiRequest } from 'next'

import { getAxiosInstance } from '@/lib/api/axiosConfig.ts'
import { ApiErrorType } from '@/lib/api/constants'
import { ApiError } from '@/lib/api/errors'

export const parseResume = async (data:any, serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest,true)
    const response = await axios.post('/api/resume/parse', data);
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to parse resume', undefined, error)
  }
}
export const getUserResumes = async (token?:string) => {
  try {
    const axios = await getAxiosInstance(undefined,true,token)
    const response = await axios.get('/api/resume/all');
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(ApiErrorType.SERVER, 'Failed to get resumes', undefined, error)
  }
}
export const deleteUserResume = async (resumeId:number, serverRequest?: NextApiRequest) => {
  try {
    const axios = await getAxiosInstance(serverRequest,true);
    const response = await axios.delete(`/api/resume/${resumeId}`);
    return response.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }   
    throw new ApiError(ApiErrorType.SERVER, 'Failed to delete resume', undefined, error)
  }
} 