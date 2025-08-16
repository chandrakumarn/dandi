import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createOrUpdateUser } from "../../../../lib/userManagement";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // This callback runs when a user signs in
      if (account?.provider === 'google') {
        try {
          // Create or update user in Supabase
          const userData = {
            email: user.email,
            name: user.name,
            image: user.image,
            sub: profile.sub // Google's unique user ID
          };
          
          const supabaseUser = await createOrUpdateUser(userData);
          
          // Add Supabase user ID to the NextAuth user object
          user.supabaseId = supabaseUser.id;
          
          console.log('User created/updated in Supabase:', supabaseUser);
          return true;
        } catch (error) {
          console.error('Error creating/updating user in Supabase:', error);
          // Still allow sign-in even if Supabase update fails
          return true;
        }
      }
      return true;
    },
    
    async jwt({ token, user, account }) {
      // This callback runs every time a JWT is created or updated
      if (account && user) {
        // First time signing in
        token.accessToken = account.access_token;
        token.userId = user.id;
        token.supabaseId = user.supabaseId;
      }
      return token;
    },
    
    async session({ session, token }) {
      // This callback runs every time a session is checked
      session.accessToken = token.accessToken;
      session.userId = token.userId;
      session.supabaseId = token.supabaseId;
      return session;
    },
  },
  pages: {
    signIn: "/", // Use our custom sign-in page
  },
});

export { handler as GET, handler as POST };
