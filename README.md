This is an example repo based on [Next.js](https://nextjs.org) to demonstrate difference in behaviour comparing native NextJS cookies
and iron-session.

## Getting Started

Dependencies are managed using pnpm, but feel free to use any other package manager you prefer.

```bash
pnpm dev
```



## Test Plan

### Native Cookies

- Open [http://localhost:3000](http://localhost:3000)
- Clear all cookies
- Navigate to `NextJS Cookie` via the top menu which will force the "login". Two cookies will be set, one using iron-session, one using native NextJS methods
- Wait 5 seconds
- Navigate to `NextJS Cookie` again via the top menu. You'll see that the changed value `CHANGED_VALUE` is displayed immediately on the page. Also, the cookie in the browser is updated immediately

### Iron Session

- Go back to home link
- Clear all cookies
- Navigate to `Iron-Session Cookie` via the top menu which will force the "login". Two cookies will be set, one using iron-session, one using native NextJS methods
- Wait 5 seconds
- Navigate to `Iron-Session Cookie` again via the top menu. Note that the value in the browser is changed, however the page still shows the old value. Only after reloading the page (or navigating to home and back) the updated value will be shown.
