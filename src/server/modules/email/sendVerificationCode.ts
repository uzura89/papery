import sgMail from "@sendgrid/mail";

import {
  CONS_COMPANY_EMAIL_NOREPLY,
  CONS_COMPANY_NAME,
} from "../../../common/constants";
import { getLocalEnv } from "../env/getLocalEnv";

sgMail.setApiKey(getLocalEnv().SENDGRID_API_KEY);

export async function sendVerificationCode(email: string, code: string) {
  const msg = {
    to: email,
    from: `${CONS_COMPANY_NAME} <${CONS_COMPANY_EMAIL_NOREPLY}>`,
    subject: "Verification Code",
    text: `Your verification code is ${code}`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw error;
  }
}
