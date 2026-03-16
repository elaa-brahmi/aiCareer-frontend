import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { User } from "@/types/userType";
import { JWT } from "next-auth/jwt";

interface CustomUser extends User {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
       // console.log("Login response data:", data);

        if (!res.ok || !data) return null;
// Whatever you return here becomes `user` in the jwt callback
        return {
          ...data.user,
          accessToken: data.accessToken,
          expires: data.expires,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }): Promise<JWT & { user?: CustomUser; accessToken?: string }> {
      /**
         * CASE A: Credentials login
         * Runs on first login after authorize() returns a user
         */
      if (user && account?.provider === "credentials") {
        const customUser = user as unknown as CustomUser;
        token.accessToken = customUser.accessToken;
        token.user = customUser;
        return token as JWT & { user?: CustomUser; accessToken?: string };
      }

      /**
         * CASE B: OAuth login (Google / GitHub)
         * Runs on first sign-in with an external provider
         */
      if (account && profile && account.provider !== "credentials") {
        try {
          const oauthProfile = profile as any;
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: account.provider,
              providerId: oauthProfile.id || oauthProfile.sub,
              email: oauthProfile.email,
              name: oauthProfile.name,
              avatar_url: oauthProfile.image || oauthProfile.picture,
            }),
          });

          const data = await res.json();
          if (!res.ok || !data) throw new Error("Backend did not return valid JSON");

          token.accessToken = data.accessToken;
          token.user = data.user;
          return token as JWT & { user?: CustomUser; accessToken?: string };
        } catch (error) {
          console.error("Error sending to backend:", error);
          throw error;
        }
      }
       /**
       * CASE C: Returning user session
       * Happens on subsequent requests — just return the token
       */

      return token;
    },

    async session({ session, token }): Promise<Session> {
      const customToken = token as JWT & { user?: CustomUser; accessToken?: string };
      try {
        if (customToken?.user?._id) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${customToken.user._id}`,
            { headers: { Authorization: `Bearer ${customToken.accessToken}` } }
          );
          if (!res.ok) throw new Error("Failed to fetch updated user");
          const latestUser = await res.json();
          session.user = latestUser;
        } else {
          session.user = customToken.user as User;
        }
      } catch (error) {
        console.error("Error refreshing session user:", error);
        session.user = customToken.user as User;
      }
      session.accessToken = customToken.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
