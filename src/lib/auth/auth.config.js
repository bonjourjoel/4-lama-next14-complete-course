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
    // always authorize, but redirect to login page with callbackUrl set, in order to workaround a bug of next.js and always have the correct callbackUrl set in the ?callbackUrl=
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      let redirectToLogin = false;

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        redirectToLogin = true;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !user) {
        redirectToLogin = true;
      }

      if (redirectToLogin) {
        // the user is not logged in, redirect to the sign-in page, and set callbackUrl query param
        const signInPage = "/login";
        const signInUrl = new URL(signInPage, request.nextUrl.origin);
        signInUrl.searchParams.append("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      // always authorize, because we redirected to login page if not authorized
      return true;
    },
  },
};
