/**
 * Schema Types
 */

export type SettingType = {
  theme: string;
  textSearchEnabled: boolean;
  emojiPalette: string;
};

export type SettingSchemaType = SettingType & {
  userParmId: string;
  created?: Date;
};
