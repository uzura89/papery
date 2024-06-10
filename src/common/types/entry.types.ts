export type EntryBaseType = {
  id: string;
  date: string;
  body: string;
  tags: string[];
  primaryEmoji: string;
  draft: boolean;
  pinned: boolean;
};

export type EntrySchemaType = EntryBaseType & {
  userParmId: string;
  decryptedBody: string | null;
  created?: Date;
};

export type EntryType = {
  id: string;
  date: string;
  body: string;
  draft: boolean;
  pinned: boolean;
  changedTS: number;
};

export type EntrySlimType = {
  id: string;
  date: string;
  body: string;
};
