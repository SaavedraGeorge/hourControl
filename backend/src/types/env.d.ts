declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT?: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly JWT_SECRET: string;
    readonly DATABASE_URL: string;
    readonly CLIENT_URL?: string;
  }
}