import jwt from "jsonwebtoken";

import { getLocalEnv } from "../env/getLocalEnv";

interface AccessTokenPayloadType {
  userParmId: string;
}

export const makeAccessToken = (payload: AccessTokenPayloadType) => {
  const jwtSecret = getLocalEnv().JWT_SECRET;

  return jwt.sign(payload, jwtSecret, {
    // expire in 14 days
    expiresIn: 60 * 60 * 24 * 14,
  });
};

export const decodeAccessToken = (token: string) => {
  try {
    const jwtSecret = getLocalEnv().JWT_SECRET;

    jwt.verify(token, jwtSecret);
    const payload = jwt.decode(token);

    return payload as AccessTokenPayloadType;
  } catch (e) {
    return {
      userParmId: "",
    };
  }
};
