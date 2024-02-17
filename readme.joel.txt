tuto: https://www.youtube.com/watch?v=vCOSTG10Y4o
next auth ref: https://authjs.dev/reference/nextjs

todo:
  - OK test admin with 3 data methods -> only db & api work (mock can't save because it's lambda)
  - OK protect api routes using the same session system (user for reading posts, admin for the rest)
  - upload to vercel
    + login with github must work --> must create a separate github OAuth
    + put token in authConfig
  - port to typescript
  - api throttle rates:
    + https://nextjs-rate-limit.vercel.app/
