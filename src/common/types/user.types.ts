export type UserSchemaType = {
  userParmId: string;
  googleId: string;
  email: string;
  password: string;
  salt: string;
  activated: boolean;
  created?: Date;
};
