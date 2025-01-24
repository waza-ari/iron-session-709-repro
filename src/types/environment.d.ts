declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_URL: string;
      NEXT_PUBLIC_URL: string;
      AUTH_COOKIE_PASSWORD: string;
      AUTH_COOKIE_NAME: string;
    }
  }
}
export {};
