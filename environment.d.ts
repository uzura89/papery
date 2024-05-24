declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DB_URI: string;
      GAPI_CLIENT_SECRET: string;
      AES_SECRET: string;
      SENDGRID_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
