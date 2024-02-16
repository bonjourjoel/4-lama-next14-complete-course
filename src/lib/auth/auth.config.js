// we separate the config in a separate file because middleware.js can NOT import nodejs libs like in auth.js

import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // update the jwt token to include all the fields we always need
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        // can add more fields....
      }
      return token;
    },

    // update the session to include all the fields we always need
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        // can add more fields....
      }
      return session;
    },

    // authorize the page or not, depending on auth, and if not allowed will redirect to login page defined above
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      let redirect = false;

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        redirect = true;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !user) {
        redirect = true;
      }

      if (redirect) {
        // the user is not logged in, redirect to the sign-in page, and set callbackUrl
        const signInPage = "/login";
        const signInUrl = new URL(signInPage, request.nextUrl.origin);
        signInUrl.searchParams.append("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      // OK
      return true;
    },
  },
};
