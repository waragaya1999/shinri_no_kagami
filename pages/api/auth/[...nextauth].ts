import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "650306988072-1ch0eipcrf0vdhgn3s3rap7seov64d6r.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('サインイン');
      return true;
    },
  },
});