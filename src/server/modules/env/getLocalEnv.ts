import * as dotenv from "dotenv";

dotenv.config({
  path: ".local.env",
});

export function getLocalEnv() {
  return {
    APP_ENV: process.env.APP_ENV as string,
    APP_URL: process.env.APP_URL as string,
    AES_SECRET: process.env.AES_SECRET as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    DB_URI: process.env.DB_URI as string,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
    STRIPE_KEY_PUB: process.env.STRIPE_KEY_PUB as string,
    STRIPE_KEY_SEC: process.env.STRIPE_KEY_SEC as string,
    STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET as string,
  };
}
//
