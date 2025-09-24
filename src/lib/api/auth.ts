import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { NextApiRequest } from 'next'
import { isServer } from './constants'

export const fetchToken = async (serverRequest?: NextApiRequest): Promise<string | null> => {
  if (isServer && serverRequest) {
    console.log("fetchToken");
    console.log("serverRequest headers:", serverRequest.headers);
    console.log("serverRequest cookie:", serverRequest.headers?.cookie);

    const sessionToken = await getToken({
      req: serverRequest,
      secret: process.env.NEXTAUTH_SECRET,
    })
    console.log('Server-side sessionToken:', sessionToken)
    return sessionToken ? String(sessionToken) : null
  }

  if (!isServer) {
    const session = await getSession()
    console.log('Client-side session:', session)
    return session?.accessToken ?? null
  }
  console.log('No session context available')
  return null
}
