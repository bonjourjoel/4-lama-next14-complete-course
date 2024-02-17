import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";
import { data } from "../data/data";

const loginInternal = async (credentials) => {
  try {
    const user = await data.findUserByUsername({
      username: credentials.username,
    });
    if (!user) {
      throw new Error("Wrong credentials!");
    }
    const isPasswordCorrect = await bcryptjs.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await loginInternal(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    async signIn({ user, account, profile }) {
      if (account.provider == "github") {
        try {
          // check if the 0Auth signed in user already has an account in OUR database
          const user = await data.findUserByEmail({ email: profile.email });
          // if not, create one
          if (!user) {
            await data.addUser({
              username: profile.login, // profile.xxx fields names changes depending on the provider
              email: profile.email,
              img: profile.avatar_url,
            });
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks, // keep authorized() from authconfig
  },
});
