tuto: https://www.youtube.com/watch?v=vCOSTG10Y4o
next auth ref: https://authjs.dev/reference/nextjs

todo:
  - test admin with 3 data methods -> only db works (mock can't save because it's lambda, and api has _id field name issue because of mongoose)
  - protect api routes using the same session system (user for reading posts, admin for the rest)
  - api throttle rates
  - upload to vercel
    + login with github must work
    + put token in authConfig