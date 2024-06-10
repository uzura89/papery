/**
 * Schema Types
 */

export type SettingType = {
  theme: string;
  textSearchEnabled: boolean;
};

export type SettingSchemaType = SettingType & {
  userParmId: string;
  created?: Date;
};
