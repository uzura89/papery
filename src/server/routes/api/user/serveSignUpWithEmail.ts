import { UserSchemaType } from "../../../../common/types";
import { dbSaveVerificationCode } from "../../../db/onetime/dbSaveOnetimeCode";
import { dbCreateUserEmail } from "../../../db/user/dbCreateUserEmail";
import { dbGetUserByEmail } from "../../../db/user/dbGetUserByEmail";
import { sendVerificationCode } from "../../../modules/email/sendVerificationCode";

export async function serveSignUpWithEmail(req: any, res: any) {
  const { email, password } = req.body;

  try {
    // If activated user already exists, return error
    const user: UserSchemaType = await dbGetUserByEmail(req.mongoose, email);

    if (user && user.googleId !== "") {
      return res.status(400).json({
        message: "User signed up with Google. Please login with Google.",
      });
    }

    if (user && user.activated) {
      return res.status(400).json({
        message: "User already exists. Please login.",
      });
    }

    // If user does not exist, create user
    if (!user) {
      await dbCreateUserEmail(req.mongoose, {
        email,
        password,
      });
    }

    // send onetime code to email
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000).toString();
    await dbSaveVerificationCode(req.mongoose, email, sixDigitCode);
    await sendVerificationCode(email, sixDigitCode);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
