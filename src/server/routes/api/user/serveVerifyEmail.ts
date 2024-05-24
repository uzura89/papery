import { dbGetVerificationCode } from "../../../db/onetime/dbGetVerificationCode";
import { dbActivateUser } from "../../../db/user/dbActivateUser";
import { dbGetUserByEmail } from "../../../db/user/dbGetUserByEmail";
import { makeAccessToken } from "../../../modules/auth/jwt";

export async function serveVerifyEmail(req: any, res: any) {
  const { email, code } = req.body;

  try {
    // check if user already exists
    const correctCode = await dbGetVerificationCode(req.mongoose, email);
    if (correctCode !== code) {
      return res.status(400).json({
        message: "Incorrect code",
      });
    }

    // proceed to login
    const user = await dbGetUserByEmail(req.mongoose, email);
    await dbActivateUser(req.mongoose, user.userParmId);
    const accessToken = makeAccessToken({ userParmId: user.userParmId });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
