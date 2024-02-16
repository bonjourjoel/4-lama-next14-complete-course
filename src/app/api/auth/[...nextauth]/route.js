/**
 * the endpoint [...nextauth] allows to spread all the endpoints directly from NextAuth library
 * we should use a folder and inside a file route.js/ts because we are using the app router and not the page router like in the doc at https://authjs.dev/getting-started/providers/oauth-tutorial#creating-the-server-config
 */

export { GET, POST } from "@/lib/auth/auth";
