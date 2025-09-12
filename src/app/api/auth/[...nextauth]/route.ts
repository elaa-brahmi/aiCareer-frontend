import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { User } from '@/types/userType'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()

        if (!res.ok || !data) {
          return null
        }
         // Whatever you return here becomes `user` in the jwt callback
        return {
          ...data.user,
          accessToken: data.token,
          expires: data.expires,
        }
      },
    }),

  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User).accessToken

        token.user = {
          ...(user as User),
        }
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user as User
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
