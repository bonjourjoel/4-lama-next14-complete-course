import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "../utils";
import { User } from "../models";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider == "github") {
        connectToDb();
        try {
          // check if the 0Auth signed in user already has an account in OUR database
          const user = await User.findOne({ email: profile.email });
          // if not, create one
          if (!user) {
            const newUser = new User({
              username: profile.login, // profile.xxx fields names changes depending on the provider
              email: profile.email,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
});
