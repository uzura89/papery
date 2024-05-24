import * as dotenv from "dotenv";

dotenv.config({
  path: ".local.env",
});

export function getLocalEnv() {
  return {
    AES_SECRET: process.env.AES_SECRET as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    DB_URI: process.env.DB_URI as string,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
  };
}
//
