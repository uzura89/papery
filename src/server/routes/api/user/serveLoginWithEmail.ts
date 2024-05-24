import { dbGetUserByEmail } from "../../../db/user/dbGetUserByEmail";
import { hashString } from "../../../modules/auth/crypto";
import { makeAccessToken } from "../../../modules/auth/jwt";

export async function serveLoginWithEmail(req: any, res: any) {
  const { email, password } = req.body;

  try {
    const user = await dbGetUserByEmail(req.mongoose, email);
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
      });
    }

    if (!user.activated) {
      return res.status(400).json({
        message: "User not activated. Please start over from the signup page.",
      });
    }

    if (user.password === "") {
      return res.status(400).json({
        message: "User signed up with Google. Please login with Google.",
      });
    }

    if (user.password !== hashString(password, user.salt)) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const accessToken = makeAccessToken({ userParmId: user.userParmId });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
