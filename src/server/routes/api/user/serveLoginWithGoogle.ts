import { OAuth2Client } from "google-auth-library";

import { makeAccessToken } from "../../../modules/auth/jwt";
import { UserSchemaType } from "../../../../common/types";
import { CONS_GOOGLE_CLIENT_ID } from "../../../../common/constants";

import { dbGetUserByEmail } from "../../../db/user/dbGetUserByEmail";
import { dbCreateUserGoogle } from "../../../db/user/dbCreateUserGoogle";

const oAuth2Client = new OAuth2Client(
  CONS_GOOGLE_CLIENT_ID,
  process.env.GAPI_CLIENT_SECRET,
  "postmessage"
);

export async function serveLoginWithGoogle(req: any, res: any) {
  const { code } = req.body;

  try {
    const { email, googleId } = await getGoogleAccountInfo(code);

    const userParmId = await getOrCreateUser(req.mongoose, email, googleId);

    const accessToken = makeAccessToken({ userParmId });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

/**
 * getGoogleAccountInfo
 */

async function getGoogleAccountInfo(
  idToken: string
): Promise<{ email: string; googleId: string; picture: string; name: string }> {
  try {
    const { tokens } = await oAuth2Client.getToken(idToken);

    if (!tokens || !tokens.id_token) throw Error;

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GAPI_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.picture || !payload.name)
      throw Error;

    return {
      email: payload.email,
      googleId: payload.sub,
      picture: payload.picture,
      name: payload.name,
    };
  } catch (error) {
    throw Error;
  }
}

/**
 * getOrCreateUser
 */

async function getOrCreateUser(
  mongoose: any,
  email: string,
  googleId: string
): Promise<string> {
  try {
    const user: UserSchemaType = await dbGetUserByEmail(mongoose, email);

    let userParmId = "";

    if (user) {
      // return accessToken
      userParmId = user.userParmId;
    } else {
      // create user and return accessToken
      const user = await dbCreateUserGoogle(mongoose, {
        email,
        googleId,
      });
      userParmId = user.userParmId;
    }

    return userParmId;
  } catch (error) {
    throw Error;
  }
}
