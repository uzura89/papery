/**
 * Schema Types
 */

export type SettingType = {
  theme: string;
};

export type SettingSchemaType = SettingType & {
  userParmId: string;
  created?: Date;
};
